import { content } from "../data/content";
import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export default function Experience() {
  const items = content.experience;

  return (
    <Section id="experience" kicker="01 · Career" title="Experience">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.company} className="flex gap-5 sm:gap-7">
              {/* Timeline rail: node + connecting line */}
              <div className="flex flex-col items-center" aria-hidden>
                <span className="mt-3 h-3 w-3 shrink-0 rounded-full bg-accent ring-4 ring-bg" />
                {!isLast && <span className="my-1.5 w-px flex-1 bg-line" />}
              </div>

              {/* Content */}
              <div className={isLast ? "flex-1" : "flex-1 pb-12"}>
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl tracking-tightest text-ink sm:text-3xl">
                      {item.company}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      <MapPin size={13} className="text-accent" />
                      {item.location}
                    </span>
                  </div>

                  <div className="mt-5 space-y-5">
                    {item.roles.map((role) => (
                      <div key={role.title} className="border-l border-line pl-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="text-sm font-medium text-ink">{role.title}</span>
                          <span className="text-xs tabular-nums text-muted">{role.period}</span>
                        </div>
                        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                          {role.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
