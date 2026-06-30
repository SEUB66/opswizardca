import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";

const HEADER_OFFSET = -104;

let lenis: Lenis | null = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Lenis inertial smooth scrolling + glide-to-section on hash navigation.
 * Fully disabled for prefers-reduced-motion (native scroll, CSS offset).
 */
export function SmoothScroll() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    const id = requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET });
      } else {
        target.scrollIntoView({ block: "start" });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [hash]);

  return null;
}
