import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { motionConfig } from "./motionConfig";
import { useCanHover } from "./useMediaQuery";

const { tilt } = motionConfig;

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Hover wrapper for cards: a light 3D tilt toward the cursor plus a soft
 * accent glow that follows it. Pointer tracking goes through motion values,
 * so moving the mouse never re-renders React. On touch devices it falls back
 * to a press-down scale; under reduced motion it is inert.
 */
export function TiltCard({ children, className }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const canHover = useCanHover();
  const interactive = canHover && !reduceMotion;

  const rect = useRef<DOMRect | null>(null);
  // Pointer position within the card, 0..1 on each axis (0.5 = centre).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt.maxDeg, tilt.maxDeg]), tilt.spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt.maxDeg, -tilt.maxDeg]), tilt.spring);

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(${tilt.glowSize}px circle at ${glowX} ${glowY}, color-mix(in srgb, var(--color-accent) ${tilt.glowStrength}%, transparent), transparent 70%)`;

  if (!interactive) {
    return (
      <motion.div
        className={className}
        whileTap={reduceMotion ? undefined : { scale: tilt.tapScale }}
      >
        {children}
      </motion.div>
    );
  }

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    rect.current = event.currentTarget.getBoundingClientRect();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const r = rect.current ?? event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - r.left) / r.width);
    py.set((event.clientY - r.top) / r.height);
  };

  const onPointerLeave = () => {
    rect.current = null;
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={`group/tilt relative ${className ?? ""}`}
      style={{ rotateX, rotateY, transformPerspective: tilt.perspective }}
      whileHover={{ scale: tilt.hoverScale }}
      transition={{ type: "spring", ...tilt.spring }}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: glow }}
      />
    </motion.div>
  );
}
