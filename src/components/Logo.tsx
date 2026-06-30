import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the wizard mark floating (no box) next to a violet→cyan
 * wordmark. The mark is shown via object-contain so a transparent PNG sits
 * cleanly on either theme. Links home unless `asLink={false}`.
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
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <img
        src={BRAND.logo}
        alt={wordmark ? "" : BRAND.name}
        aria-hidden={wordmark}
        className={cn(
          "h-14 w-auto object-contain drop-shadow-[0_4px_16px_rgba(124,58,237,0.45)] transition-transform duration-300 group-hover:scale-[1.06] sm:h-16",
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
