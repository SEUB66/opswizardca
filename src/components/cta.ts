import { cn } from "@/lib/utils";

/**
 * One shared CTA look across the whole site — sharp (rounded-lg, not a pill),
 * uppercase Space Grotesk with tracking, a brand gradient + top sheen and a
 * colored glow on hover. Built as a class helper so every <Link>/<a>/<button>
 * keeps its own type-safe props while sharing one designed style.
 */
type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-display font-bold uppercase tracking-[0.12em] transition duration-200 will-change-transform disabled:cursor-not-allowed disabled:opacity-70";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-brand text-white ring-1 ring-inset ring-white/20 shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7),inset_0_1px_0_rgba(255,255,255,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-10px_rgba(124,58,237,0.9),inset_0_1px_0_rgba(255,255,255,0.32)]",
  secondary:
    "border border-border bg-card/60 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-violet hover:text-violet",
  light:
    "bg-white text-[#4C1D95] ring-1 ring-inset ring-black/5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] hover:-translate-y-0.5",
  ghost:
    "border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/20",
};

const SIZE: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.7rem]",
  md: "px-6 py-3.5 text-[0.78rem]",
  lg: "px-8 py-4 text-[0.84rem]",
};

export function cta(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  return cn(BASE, VARIANT[variant], SIZE[size], extra);
}
