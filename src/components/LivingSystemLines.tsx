import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** A sparse decorative system map. Only the two pulse dots animate. */
export default function LivingSystemLines() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const showPulses = !reduceMotion && visible;

  return (
    <div aria-hidden="true" className="living-system-lines">
      <motion.svg
        aria-hidden="true"
        focusable="false"
        className="h-full w-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.38 }}
      >
      <g fill="none" stroke="var(--color-muted)" strokeWidth="0.8" opacity="0.24">
        <path d="M20 230 H130 L210 155 H330 L410 220 H560" />
        <g className="living-system-detail">
          <path d="M130 230 L205 300 H340 L410 220" />
          <path d="M210 155 L260 90 H375 L445 130 H535" />
          <path d="M340 300 L455 335 H545" />
          <path d="M410 220 L475 175 H555" />
        </g>
      </g>

      <g fill="var(--color-accent)" opacity="0.45">
        <circle cx="20" cy="230" r="2" />
        <circle cx="130" cy="230" r="2.4" />
        <circle cx="210" cy="155" r="2.4" />
        <circle cx="330" cy="155" r="2.4" />
        <circle cx="410" cy="220" r="2.4" />
        <circle cx="560" cy="220" r="2" />
        <g className="living-system-detail">
          <circle cx="205" cy="300" r="2" />
          <circle cx="340" cy="300" r="2" />
          <circle cx="260" cy="90" r="2" />
          <circle cx="375" cy="90" r="2" />
          <circle cx="445" cy="130" r="2" />
          <circle cx="535" cy="130" r="2" />
          <circle cx="455" cy="335" r="2" />
          <circle cx="545" cy="335" r="2" />
          <circle cx="475" cy="175" r="2" />
          <circle cx="555" cy="175" r="2" />
        </g>
      </g>

      {showPulses && (
        <>
          <motion.circle
            r="3"
            fill="var(--color-accent)"
            initial={{ cx: 20, cy: 230, opacity: 0 }}
            animate={{
              cx: [20, 130, 210, 330, 410, 560],
              cy: [230, 230, 155, 155, 220, 220],
              opacity: [0, 0.48, 0.48, 0.48, 0.48, 0],
            }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle
            className="living-system-detail"
            r="2.5"
            fill="var(--color-accent)"
            initial={{ cx: 130, cy: 230, opacity: 0 }}
            animate={{
              cx: [130, 205, 340, 410],
              cy: [230, 300, 300, 220],
              opacity: [0, 0.32, 0.32, 0],
            }}
            transition={{ duration: 11, delay: 2, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
          />
        </>
      )}
      </motion.svg>
    </div>
  );
}
