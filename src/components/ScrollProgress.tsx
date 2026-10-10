import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { motionConfig } from "./motion";

/** Thin accent bar showing page scroll progress. Sits on the navbar's bottom edge. */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, motionConfig.progress);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
    />
  );
}
