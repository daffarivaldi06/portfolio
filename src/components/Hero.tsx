import { content } from "../data/content";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Reveal } from "./Reveal";
import LivingSystemLines from "./LivingSystemLines";

export default function Hero() {
  const identity = content.identity;

  const socials = [
    { label: "GitHub", href: identity.github, Icon: Github },
    { label: "LinkedIn", href: identity.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${identity.email}`, Icon: Mail },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <LivingSystemLines />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-24 sm:pt-32">
        <Reveal y={12}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <MapPin size={16} className="text-accent" />
            {identity.location}
            <span aria-hidden>·</span>
            {identity.origin}
          </p>
        </Reveal>

        <Reveal delay={0.07} y={12}>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tightest text-ink sm:text-7xl">
            {identity.name}
          </h1>
        </Reveal>

        <Reveal delay={0.14} y={12}>
          <p className="mt-6 max-w-xl text-2xl font-medium leading-snug text-accent sm:text-3xl">
            {identity.positioning}
          </p>
        </Reveal>

        <Reveal delay={0.21} y={12}>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {identity.intro}
          </p>
        </Reveal>

        <Reveal delay={0.28} y={12}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View projects
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              Get in touch
            </a>

            <span className="h-4 w-px bg-line" aria-hidden />

            <ul className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => {
                const external = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      aria-label={label}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
