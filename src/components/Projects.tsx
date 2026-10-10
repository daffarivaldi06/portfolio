import { content } from "../data/content";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { Stagger, StaggerItem, TiltCard } from "./motion";

export default function Projects() {
  return (
    <Section id="projects" kicker="02 · Selected work" title="Projects">
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
        {content.projects.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <TiltCard className="h-full rounded-lg">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_18px_40px_-24px_var(--color-accent)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tightest text-ink">
                    {project.title}
                  </h3>
                  {project.year && (
                    <span className="shrink-0 text-xs tabular-nums text-muted">
                      {project.year}
                    </span>
                  )}
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line bg-bg px-2.5 py-1 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Open project
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
