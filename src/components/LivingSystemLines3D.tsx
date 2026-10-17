import { useEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motionConfig } from "./motion";

const cfg = motionConfig.hero3d;

/**
 * Same map as the SVG (viewBox 600×400) so the crossfade lines up;
 * the third value adds a little depth for the sway to reveal.
 */
const NODES: [number, number, number][] = [
  [20, 230, 0.15],
  [130, 230, -0.25],
  [210, 155, 0.4],
  [330, 155, -0.1],
  [410, 220, 0.3],
  [560, 220, -0.35],
  [205, 300, 0.55],
  [340, 300, 0.1],
  [260, 90, -0.45],
  [375, 90, 0.2],
  [445, 130, -0.3],
  [535, 130, 0.45],
  [455, 335, -0.2],
  [545, 335, 0.35],
  [475, 175, 0.6],
  [555, 175, -0.1],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [1, 6], [6, 7], [7, 4],
  [2, 8], [8, 9], [9, 10], [10, 11],
  [7, 12], [12, 13],
  [4, 14], [14, 15],
];

/** Pulses travel these node routes; times in seconds, like the SVG pulses. */
const PULSES = [
  { route: [0, 1, 2, 3, 4, 5], duration: 9, delay: 0, rest: 2 },
  { route: [1, 6, 7, 4], duration: 11, delay: 2, rest: 3 },
  { route: [2, 8, 9, 10, 11], duration: 10, delay: 5, rest: 4 },
];

/** Fraction of a pulse's trip spent fading in (and out again). */
const PULSE_FADE = 0.08;

/** SVG units → world units: 100 px = 1, origin at the viewBox centre, y up. */
const toWorld = ([x, y, z]: [number, number, number]) =>
  new THREE.Vector3((x - 300) / 100, (200 - y) / 100, z);

const POINTS = NODES.map(toWorld);

type Route = { points: THREE.Vector3[]; cumulative: number[]; length: number };

function buildRoute(route: number[]): Route {
  const points = route.map((index) => POINTS[index]);
  const cumulative = [0];
  for (let i = 1; i < points.length; i++) {
    cumulative.push(cumulative[i - 1] + points[i].distanceTo(points[i - 1]));
  }
  return { points, cumulative, length: cumulative[cumulative.length - 1] };
}

/** Position at `progress` (0–1) along the route, by distance travelled. */
function pointOnRoute({ points, cumulative, length }: Route, progress: number, out: THREE.Vector3) {
  const distance = progress * length;
  let i = 1;
  while (i < cumulative.length - 1 && cumulative[i] < distance) i++;
  const span = cumulative[i] - cumulative[i - 1];
  return out.lerpVectors(points[i - 1], points[i], span > 0 ? (distance - cumulative[i - 1]) / span : 0);
}

function readAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#d4a15c";
}

/** The theme's accent colour, re-read whenever the `.dark` class flips. */
function useAccentColor() {
  const [color, setColor] = useState(readAccent);

  useEffect(() => {
    const observer = new MutationObserver(() => setColor(readAccent()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return color;
}

/** Cursor position across the viewport, -1…1 with y up. Kept in a ref: no re-renders. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

/** False while the hero is scrolled away or the tab is hidden, so the render loop can stop. */
function useIsActive(ref: RefObject<HTMLElement>) {
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return onScreen && pageVisible;
}

/** Frames the 6×4 map like the SVG's preserveAspectRatio="meet", with room for the sway. */
function FitCamera() {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const aspect = useThree((state) => state.size.width / state.size.height);

  useEffect(() => {
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const margin = 1.1;
    camera.position.z = Math.max(2 / tan, 3 / (tan * aspect)) * margin;
    camera.updateProjectionMatrix();
  }, [camera, aspect]);

  return null;
}

type NetworkProps = {
  color: string;
  pointer: MutableRefObject<{ x: number; y: number }>;
  onReady: () => void;
};

function Network({ color, pointer, onReady }: NetworkProps) {
  const sway = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pulseGeometry = useRef<THREE.BufferGeometry>(null);
  const elapsed = useRef(0);
  const announced = useRef(false);

  const { linePositions, nodePositions, routes, pulsePositions, pulseColors } = useMemo(() => {
    const linePositions = new Float32Array(EDGES.flatMap(([a, b]) => [...POINTS[a].toArray(), ...POINTS[b].toArray()]));
    const nodePositions = new Float32Array(POINTS.flatMap((point) => point.toArray()));
    // White RGBA per pulse: the material supplies the accent, alpha fades each pulse on its own.
    const pulseColors = new Float32Array(PULSES.length * 4).fill(1);
    for (let i = 0; i < PULSES.length; i++) pulseColors[i * 4 + 3] = 0;
    return {
      linePositions,
      nodePositions,
      routes: PULSES.map((pulse) => buildRoute(pulse.route)),
      pulsePositions: new Float32Array(PULSES.length * 3),
      pulseColors,
    };
  }, []);

  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, rawDelta) => {
    if (!announced.current) {
      announced.current = true;
      onReady();
    }

    // Large gaps (resuming after the loop was paused) would make everything jump.
    const delta = Math.min(rawDelta, 0.1);
    elapsed.current += delta;
    const t = elapsed.current;

    if (sway.current) sway.current.rotation.y = Math.sin(t * cfg.swaySpeed) * cfg.swayAmplitude;

    const group = parallax.current;
    if (group) {
      const { x, y } = pointer.current;
      const { damp } = THREE.MathUtils;
      const k = cfg.parallaxDamping;
      group.rotation.y = damp(group.rotation.y, x * cfg.parallaxTilt, k, delta);
      group.rotation.x = damp(group.rotation.x, -y * cfg.parallaxTilt, k, delta);
      group.position.x = damp(group.position.x, x * cfg.parallaxShift, k, delta);
      group.position.y = damp(group.position.y, y * cfg.parallaxShift, k, delta);
    }

    PULSES.forEach((pulse, i) => {
      const local = t - pulse.delay;
      const phase = local < 0 ? -1 : local % (pulse.duration + pulse.rest);
      let alpha = 0;
      if (phase >= 0 && phase <= pulse.duration) {
        const progress = phase / pulse.duration;
        pointOnRoute(routes[i], progress, scratch).toArray(pulsePositions, i * 3);
        alpha = Math.min(1, progress / PULSE_FADE, (1 - progress) / PULSE_FADE);
      }
      pulseColors[i * 4 + 3] = alpha;
    });

    const geometry = pulseGeometry.current;
    if (geometry) {
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={parallax}>
      <group ref={sway}>
        {/* Every edge in one LineSegments: one draw call, built once. */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={cfg.lineOpacity} depthWrite={false} />
        </lineSegments>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <PointMaterial
            color={color}
            size={cfg.nodeSize}
            sizeAttenuation={false}
            transparent
            opacity={cfg.nodeOpacity}
            depthWrite={false}
          />
        </points>

        <points frustumCulled={false}>
          <bufferGeometry ref={pulseGeometry}>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[pulseColors, 4]} />
          </bufferGeometry>
          <PointMaterial
            color={color}
            vertexColors
            size={cfg.pulseSize}
            sizeAttenuation={false}
            transparent
            opacity={cfg.pulseOpacity}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

type LivingSystemLines3DProps = {
  /** Drives the crossfade in from the SVG. */
  shown: boolean;
  /** Called once the first frame is about to render. */
  onReady: () => void;
  /** WebGL context lost: the caller swaps back to the SVG. */
  onError: () => void;
};

/** WebGL version of LivingSystemLines: slow sway, cursor parallax, a few pulses. */
export default function LivingSystemLines3D({ shown, onReady, onError }: LivingSystemLines3DProps) {
  const container = useRef<HTMLDivElement>(null);
  const active = useIsActive(container);
  const color = useAccentColor();
  const pointer = usePointer();

  return (
    <div ref={container} aria-hidden="true" className="living-system-lines">
      <div
        className="h-full w-full"
        style={{ opacity: shown ? 1 : 0, transition: `opacity ${cfg.crossfadeDuration}s ease` }}
      >
        <Canvas
          dpr={[1, cfg.maxDpr]}
          flat
          frameloop={active ? "always" : "never"}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          camera={{ fov: 35, near: 0.1, far: 50, position: [0, 0, 7] }}
          onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", onError)}
        >
          <FitCamera />
          <Network color={color} pointer={pointer} onReady={onReady} />
        </Canvas>
      </div>
    </div>
  );
}
