/**
 * Single place to tune every animation on the site.
 * Durations/delays are in seconds, distances in px.
 * Raise durations to slow things down; lower distances/scales to calm them.
 */

/** Soft "expo-out" curve used across the site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const motionConfig = {
  /** Scroll-reveal (FadeInSection / Reveal). */
  reveal: {
    duration: 0.65,
    distance: 20,
    /** Negative margin = element must be this far inside the viewport first. */
    viewportMargin: "-80px 0px",
  },

  /** Staggered groups (Stagger / StaggerItem). */
  stagger: {
    /** Gap between consecutive children. */
    interval: 0.06,
    duration: 0.5,
    distance: 14,
    /** Children start at this scale (1 = no scale). */
    scaleFrom: 1,
    /** Skill badges: faster cadence, slight pop. */
    badgeInterval: 0.03,
    badgeScaleFrom: 0.9,
  },

  /** Experience timeline. */
  timeline: {
    dotDuration: 0.5,
    /** How long the connecting rail takes to grow downward. */
    railDuration: 0.9,
  },

  /**
   * Hero intro timeline (all delays measured from page load).
   * The background drift speed lives in index.css (`.hero-glow-drift`).
   */
  hero: {
    metaDelay: 0.05,
    /** Name: revealed word by word. */
    nameDelay: 0.15,
    wordInterval: 0.09,
    wordDuration: 0.9,
    /** Blur (px) the name words sharpen from — desktop only, 0 disables. */
    nameBlur: 10,
    /** "Full-Stack Developer": revealed letter by letter. */
    titleDelay: 0.5,
    letterInterval: 0.022,
    letterDuration: 0.5,
    /** How far words/letters rise from (px). */
    textDistance: 18,
    introDelay: 0.75,
    ctaDelay: 0.9,
    /** Background grid fade-in and system-line drawing. */
    gridDuration: 1.6,
    linesDelay: 0.4,
    linesDuration: 1.6,
  },

  /**
   * 3D system network in the hero (desktop pointers only; phones, tablets
   * and reduced-motion get the SVG). Angles in radians, speeds per second.
   */
  hero3d: {
    /** Device pixel ratio cap — the main GPU cost lever. */
    maxDpr: 1.5,
    /** Slow sway around the vertical axis: amplitude and angular speed. */
    swayAmplitude: 0.32,
    swaySpeed: 0.05,
    /** How far the network leans toward the cursor. 0 disables parallax. */
    parallaxTilt: 0.1,
    parallaxShift: 0.12,
    /** Higher = parallax catches up with the cursor faster. */
    parallaxDamping: 2.2,
    lineOpacity: 0.32,
    nodeOpacity: 0.55,
    /** Node / pulse diameter in CSS px. */
    nodeSize: 4.5,
    pulseSize: 5.5,
    pulseOpacity: 0.5,
    /** Crossfade from the SVG once the SVG's own line drawing has finished. */
    crossfadeDuration: 0.9,
  },

  /** Project cards (TiltCard). Tilt + glow run on desktop pointers only. */
  tilt: {
    /** Maximum rotation toward the cursor, in degrees. 0 disables tilt. */
    maxDeg: 6,
    hoverScale: 1.015,
    /** Touch devices: press-down scale instead of tilt. */
    tapScale: 0.98,
    perspective: 900,
    /** Radius (px) and strength (% of accent colour) of the cursor glow. */
    glowSize: 260,
    glowStrength: 14,
    spring: { stiffness: 220, damping: 22, mass: 0.6 },
  },

  /** Navbar. */
  nav: {
    /** Scroll distance (px) before the blurred background fades in. */
    scrollThreshold: 24,
    introDuration: 0.6,
    menuDuration: 0.28,
  },

  /** Scroll progress bar under the navbar. Higher stiffness = snappier. */
  progress: {
    stiffness: 180,
    damping: 30,
  },
} as const;
