import { Github, Linkedin, Mail } from "lucide-react";
import { content } from "../data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export default function Contact() {
  const identity = content.identity;

  const domain = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "");

  const links = [
    {
      label: "Email",
      href: `mailto:${identity.email}`,
      value: identity.email,
      Icon: Mail,
    },
    {
      label: "GitHub",
      href: identity.github,
      value: domain(identity.github),
      Icon: Github,
    },
    {
      label: "LinkedIn",
      href: identity.linkedin,
      value: domain(identity.linkedin),
      Icon: Linkedin,
    },
  ];

  return (
    <Section id="contact" kicker="04 · Contact" title="Get in touch">
      <div className="grid gap-5 sm:grid-cols-3">
        {links.map(({ label, href, value, Icon }, index) => {
          const external = !href.startsWith("mailto:");
          return (
            <Reveal key={label} delay={0.05 * (index + 1)} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
              >
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {label}
                </span>
                <span className="mt-1 break-all text-sm font-medium text-ink">
                  {value}
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
