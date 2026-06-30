import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the wizard mark floating (no box). The pixel-art mark already
 * carries the "WIZARD OPS" wordmark baked in, so by default we show the mark
 * alone — no redundant text. `wordmark` can re-enable the gradient text if a
 * caller ever wants it. Links home unless `asLink={false}`.
 */
export function Logo({
  className = "",
  imgClassName = "",
  wordmark = false,
  asLink = true,
}: {
  className?: string;
  imgClassName?: string;
  wordmark?: boolean;
  asLink?: boolean;
}) {
  const inner = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <img
        src={BRAND.logo}
        alt={wordmark ? "" : BRAND.name}
        aria-hidden={wordmark}
        className={cn(
          "h-12 w-auto object-contain drop-shadow-[0_3px_14px_rgba(124,58,237,0.35)] transition-transform duration-300 group-hover:scale-[1.05] sm:h-14",
          imgClassName,
        )}
        decoding="async"
        fetchPriority="high"
      />
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
