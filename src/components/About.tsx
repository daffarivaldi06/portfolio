import { content } from "../data/content";
import { Reveal } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tightest text-ink sm:text-5xl">
            About
          </h2>
        </Reveal>

        <div className="mt-8 space-y-5">
          {content.about.map((paragraph, index) => (
            <Reveal key={index} delay={0.05 * (index + 1)}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
