import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { content } from "../data/content";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { EASE_OUT, motionConfig } from "./motion";
import ScrollProgress from "./ScrollProgress";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => window.scrollY > motionConfig.nav.scrollThreshold,
  );

  // Fade the blurred background in once the page leaves the very top.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > motionConfig.nav.scrollThreshold);
  });

  const identity = content.identity;

  const socials = [
    { label: "GitHub", href: identity.github, Icon: Github },
    { label: "LinkedIn", href: identity.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${identity.email}`, Icon: Mail },
  ];

  // Close the mobile menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const socialLinks = (
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
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionConfig.nav.introDuration, ease: EASE_OUT }}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "nav-scrolled" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-lg tracking-tightest text-ink"
        >
          {identity.name}
        </a>

        {/* Desktop: inline links + socials */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {content.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-line" aria-hidden />
          {socialLinks}
        </div>

        {/* Mobile: hamburger toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drop-down panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionConfig.nav.menuDuration, ease: EASE_OUT }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto max-w-5xl space-y-1 px-6 py-4">
              {content.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mx-auto max-w-5xl px-6 pb-5">{socialLinks}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
    </motion.header>
  );
}
