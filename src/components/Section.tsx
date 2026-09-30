import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  /** Optional trailing content on the heading row (e.g. a link). */
  aside?: ReactNode;
};

/**
 * Consistent section shell: numbered kicker, display-serif heading,
 * generous vertical rhythm, and a scroll-reveal on the heading block.
 */
export function Section({ id, kicker, title, children, aside }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {kicker}
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tightest text-ink md:text-5xl">
                {title}
              </h2>
            </div>
            {aside}
          </div>
        </Reveal>
        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
