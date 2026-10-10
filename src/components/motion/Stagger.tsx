import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, motionConfig } from "./motionConfig";

const containers = { div: motion.div, ul: motion.ul, ol: motion.ol };
const items = { div: motion.div, li: motion.li };

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof containers;
  /** Delay before the first child, in seconds. */
  delay?: number;
  /** Gap between children, in seconds. */
  interval?: number;
};

/**
 * Parent of a staggered group: reveals its StaggerItem children one after
 * another, once, when the group scrolls into view.
 */
export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  interval = motionConfig.stagger.interval,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const Tag = containers[as];

  const variants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: interval } },
  };

  return (
    <Tag
      className={className}
      variants={variants}
      // Reduced motion: start (and stay) in the visible state.
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: motionConfig.reveal.viewportMargin }}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof items;
  /** Travel distance in px. */
  distance?: number;
  /** Starting scale (1 = none). */
  scaleFrom?: number;
};

/** One child of a Stagger group. Must be rendered inside <Stagger>. */
export function StaggerItem({
  children,
  className,
  as = "div",
  distance = motionConfig.stagger.distance,
  scaleFrom = motionConfig.stagger.scaleFrom,
}: StaggerItemProps) {
  const Tag = items[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: distance, scale: scaleFrom },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: motionConfig.stagger.duration, ease: EASE_OUT },
    },
  };

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
