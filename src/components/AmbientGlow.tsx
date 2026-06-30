/**
 * Ambient color field — soft violet + cyan orbs that sit behind a section's
 * glass cards so the frost has hues to refract. A vertical fade mask keeps the
 * glow off the section edges so stacked sections never show a hard color seam.
 *
 * Drop as the first child of a `relative isolate` section; cards render above.
 */
export function AmbientGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] ${className}`}
    >
      <span className="glow-orb left-[-12%] top-[26%] h-72 w-72 bg-[#A855F7]/40 sm:h-96 sm:w-96" />
      <span className="glow-orb right-[-14%] bottom-[22%] h-72 w-72 bg-[#22D3EE]/30 sm:h-[24rem] sm:w-[24rem]" />
    </div>
  );
}
