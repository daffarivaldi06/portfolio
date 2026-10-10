import { content } from "../data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Stagger, StaggerItem, motionConfig } from "./motion";

export default function Skills() {
  const groups = content.skills;

  return (
    <Section id="skills" kicker="03 · Toolkit" title="Skills">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {groups.map((group, index) => (
          <div key={group.label}>
            <Reveal delay={0.05 * (index + 1)}>
              <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {group.label}
              </h3>
            </Reveal>
            <Stagger
              as="ul"
              className="mt-4 flex flex-wrap gap-1.5"
              delay={0.05 * (index + 1) + 0.1}
              interval={motionConfig.stagger.badgeInterval}
            >
              {group.items.map((item) => (
                <StaggerItem
                  key={item}
                  as="li"
                  distance={8}
                  scaleFrom={motionConfig.stagger.badgeScaleFrom}
                >
                  {/* Hover lives on an inner span so it never fights the entrance transform. */}
                  <span className="block rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </Section>
  );
}
