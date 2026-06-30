import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the pixel-art wizard mark in a rounded chip (so its dark
 * backdrop reads as an app icon on either theme) next to a violet→cyan
 * gradient wordmark. Links home unless `asLink={false}`.
 */
export function Logo({
  className = "",
  imgClassName = "",
  wordmark = true,
  asLink = true,
}: {
  className?: string;
  imgClassName?: string;
  wordmark?: boolean;
  asLink?: boolean;
}) {
  const inner = (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span className="relative grid place-items-center overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_10px_28px_-10px_rgba(124,58,237,0.65)]">
        <img
          src={BRAND.logo}
          alt={wordmark ? "" : BRAND.name}
          aria-hidden={wordmark}
          className={cn(
            "h-12 w-12 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14",
            imgClassName,
          )}
          decoding="async"
          fetchPriority="high"
        />
      </span>
      {wordmark && (
        <span className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em] sm:text-2xl">
          <span className="text-brand">Wizard</span>
          <span className="text-foreground"> Ops</span>
        </span>
      )}
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link to="/" aria-label={BRAND.name} className="min-w-0">
      {inner}
    </Link>
  );
}
