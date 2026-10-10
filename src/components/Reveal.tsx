import type { ReactNode } from "react";
import { FadeInSection } from "./motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Distance (px) the element rises from. */
  y?: number;
};

/** Backwards-compatible alias for an upward FadeInSection. */
export function Reveal({ children, delay, className, y }: RevealProps) {
  return (
    <FadeInSection delay={delay} className={className} distance={y}>
      {children}
    </FadeInSection>
  );
}
