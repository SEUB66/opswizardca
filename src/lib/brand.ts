/**
 * Single source of truth for the product brand.
 *
 * The wordmark and domain both read "Wizard Ops" / wizardops.ca (matching the
 * pixel-art logo). To rebrand (e.g. flip to "Ops Wizard"), change it here once —
 * every page title, nav, footer and email reads from this object.
 */
export const BRAND = {
  /** Display name shown in the nav, headings, page titles and emails. */
  name: "Wizard Ops",
  /** Canonical site origin (no trailing slash). */
  url: "https://wizardops.ca",
  domain: "wizardops.ca",
  /** Logo mark — the pixel-art wizard window, tightly cropped (transparent). */
  logo: "/img/wizardops-mark.png",
  /** Wide hex-grid + spotlight banner (dark) used for social / OG. */
  ogImage: "/img/wizardops-banner-dark.jpg",
  /** One-time licence price range (CAD). */
  priceLow: 3500,
  priceHigh: 5000,
  /** Lineage: the heavy industrial ERP this agile sibling is adjacent to. */
  sibling: "Ops Companion",
} as const;

/** Pretty CAD formatting, e.g. 4500 -> "4 500 $" (fr) / "$4,500" (en). */
export function formatPrice(n: number, lang: "fr" | "en"): string {
  // Manual ASCII grouping (avoids the narrow/non-breaking spaces toLocaleString
  // would insert for fr-CA, which are flagged as irregular whitespace).
  const sep = lang === "fr" ? " " : ",";
  const grouped = Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return lang === "fr" ? `${grouped} $` : `$${grouped}`;
}
