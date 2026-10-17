import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import LivingSystemLines from "./LivingSystemLines";
import { motionConfig, useMediaQuery } from "./motion";

// three.js lives in its own chunk, fetched only when the 3D version will actually run.
const LivingSystemLines3D = lazy(() => import("./LivingSystemLines3D"));

const { linesDelay, linesDuration } = motionConfig.hero;
const { crossfadeDuration } = motionConfig.hero3d;

let webglSupported: boolean | undefined;

function supportsWebGL() {
  if (webglSupported === undefined) {
    try {
      const gl = document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl");
      webglSupported = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

/** Chunk failed to load or the renderer threw: render nothing and let the SVG come back. */
class WebGLBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Hero background network. Desktop pointers get the WebGL version; phones,
 * tablets, reduced motion and browsers without WebGL keep the SVG.
 * The SVG always plays its line-drawing intro first, then crossfades to 3D.
 */
export default function HeroNetwork() {
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px) and (hover: hover) and (pointer: fine)");
  const [failed, setFailed] = useState(false);
  const use3D = desktop && !reduceMotion && !failed && supportsWebGL();

  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [svgRetired, setSvgRetired] = useState(false);
  const show3D = use3D && ready && introDone;

  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), (linesDelay + linesDuration) * 1000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!use3D) setReady(false);
  }, [use3D]);

  // Unmount the SVG once it has faded out; bring it straight back if 3D goes away.
  useEffect(() => {
    if (!show3D) {
      setSvgRetired(false);
      return;
    }
    const id = window.setTimeout(() => setSvgRetired(true), crossfadeDuration * 1000);
    return () => window.clearTimeout(id);
  }, [show3D]);

  return (
    <>
      {!svgRetired && (
        <div style={{ opacity: show3D ? 0 : 1, transition: `opacity ${crossfadeDuration}s ease` }}>
          <LivingSystemLines />
        </div>
      )}
      {use3D && (
        <WebGLBoundary onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <LivingSystemLines3D shown={show3D} onReady={() => setReady(true)} onError={() => setFailed(true)} />
          </Suspense>
        </WebGLBoundary>
      )}
    </>
  );
}
