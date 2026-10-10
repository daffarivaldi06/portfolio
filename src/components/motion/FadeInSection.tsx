import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, motionConfig } from "./motionConfig";

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Side the content enters from. */
  direction?: FadeDirection;
  /** Travel distance in px. */
  distance?: number;
  duration?: number;
};

function offset(direction: FadeDirection, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * Fades + slides its content in once, the first time it enters the viewport.
 * Under prefers-reduced-motion it renders plain markup, so nothing is ever hidden.
 * Only transform/opacity animate, so it never causes layout shift.
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = motionConfig.reveal.distance,
  duration = motionConfig.reveal.duration,
}: FadeInSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: motionConfig.reveal.viewportMargin }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
