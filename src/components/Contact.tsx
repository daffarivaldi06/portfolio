import { Github, Linkedin, Mail } from "lucide-react";
import { content } from "../data/content";
import { Section } from "./Section";
import { Stagger, StaggerItem } from "./motion";

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
      <Stagger className="grid gap-5 sm:grid-cols-3" delay={0.05}>
        {links.map(({ label, href, value, Icon }) => {
          const external = !href.startsWith("mailto:");
          return (
            <StaggerItem key={label} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
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
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
