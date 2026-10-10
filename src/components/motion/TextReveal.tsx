import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT } from "./motionConfig";

type TextRevealProps = {
  text: string;
  /** Animate each word, or each letter (words still never break mid-line). */
  by: "word" | "letter";
  /** Delay before the first unit, in seconds. */
  delay?: number;
  /** Gap between units, in seconds. */
  interval: number;
  duration: number;
  /** Rise distance in px. */
  distance: number;
  /** Blur (px) each unit sharpens from; 0 for none. */
  blur?: number;
};

/**
 * Intro text animation that plays once on mount. Screen readers get the
 * plain string; the split spans are aria-hidden. Units are inline-blocks
 * that occupy their final space from the first paint, so no layout shift.
 */
export function TextReveal({
  text,
  by,
  delay = 0,
  interval,
  duration,
  distance,
  blur = 0,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{text}</>;

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: interval } },
  };

  const unit: Variants = {
    hidden: { opacity: 0, y: distance, ...(blur ? { filter: `blur(${blur}px)` } : {}) },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration, ease: EASE_OUT },
    },
  };

  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden variants={container} initial="hidden" animate="visible">
        {words.map((word, w) => (
          <span key={w}>
            {by === "word" ? (
              <motion.span className="inline-block" variants={unit}>
                {word}
              </motion.span>
            ) : (
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, c) => (
                  <motion.span key={c} className="inline-block" variants={unit}>
                    {char}
                  </motion.span>
                ))}
              </span>
            )}
            {/* Real text space between words so wrapping behaves normally. */}
            {w < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </>
  );
}
