import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language for Wizard Ops — one easing curve + a few reusable
 * variants so every section animates with the same confident, on-brand feel.
 */
export const ease = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.7, ease };

/** Fade + rise — the default entrance for headings, copy and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Subtle fade — for secondary content that shouldn't draw the eye. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};

/** Parent that staggers its children's entrance. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Standard viewport trigger for scroll-reveal sections. */
export const inView = { once: true, margin: "-80px" } as const;
