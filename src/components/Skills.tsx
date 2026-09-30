import { content } from "../data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export default function Skills() {
  const groups = content.skills;

  return (
    <Section id="skills" kicker="03 · Toolkit" title="Skills">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={0.05 * (index + 1)}>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
