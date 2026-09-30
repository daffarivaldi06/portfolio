import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Extra bottom margin the element enters from (px). */
  y?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-reveal wrapper: fades + translates the content in once it
 * enters the viewport. Renders plain markup under prefers-reduced-motion,
 * and content is never hidden (opacity animates on enter, not on leave).
 */
export function Reveal({ children, delay = 0, className, y = 20 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
