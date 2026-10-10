import { content } from "../data/content";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import LivingSystemLines from "./LivingSystemLines";
import { EASE_OUT, TextReveal, motionConfig, useCanHover } from "./motion";

const hero = motionConfig.hero;

export default function Hero() {
  const identity = content.identity;
  const reduceMotion = useReducedMotion();
  // Blurring large text is costly; keep it to desktop pointers only.
  const canHover = useCanHover();

  const socials = [
    { label: "GitHub", href: identity.github, Icon: Github },
    { label: "LinkedIn", href: identity.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${identity.email}`, Icon: Mail },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow hero-glow-drift pointer-events-none absolute -inset-[15%]" />
      <motion.div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: hero.gridDuration, ease: EASE_OUT }}
      />
      <LivingSystemLines />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-24 sm:pt-32">
        <Reveal delay={hero.metaDelay} y={12}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <MapPin size={16} className="text-accent" />
            {identity.location}
            <span aria-hidden>·</span>
            {identity.origin}
          </p>
        </Reveal>

        <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tightest text-ink sm:text-7xl">
          <TextReveal
            text={identity.name}
            by="word"
            delay={hero.nameDelay}
            interval={hero.wordInterval}
            duration={hero.wordDuration}
            distance={hero.textDistance}
            blur={canHover ? hero.nameBlur : 0}
          />
        </h1>

        <p className="mt-6 max-w-xl text-2xl font-medium leading-snug text-accent sm:text-3xl">
          <TextReveal
            text={identity.positioning}
            by="letter"
            delay={hero.titleDelay}
            interval={hero.letterInterval}
            duration={hero.letterDuration}
            distance={hero.textDistance * 0.6}
          />
        </p>

        <Reveal delay={hero.introDelay} y={12}>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {identity.intro}
          </p>
        </Reveal>

        <Reveal delay={hero.ctaDelay} y={12}>
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
