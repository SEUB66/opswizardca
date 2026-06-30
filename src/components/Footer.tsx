import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { useT, type TKey } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";
import { cta } from "./cta";

const productLinks: { hash: string; key: TKey }[] = [
  { hash: "produit", key: "nav.product" },
  { hash: "prix", key: "nav.pricing" },
  { hash: "secteurs", key: "nav.sectors" },
  { hash: "stack", key: "nav.stack" },
  { hash: "faq", key: "nav.faq" },
];

const companyLinks: { to: string; key: TKey }[] = [
  { to: "/manifeste", key: "nav.manifesto" },
  { to: "/contact", key: "nav.contact" },
];

function Bubbles() {
  // Deterministic (no Math.random in render) so SSR and client agree.
  const bubbles = useMemo(
    () =>
      [
        { l: 6, s: 46, d: 16, delay: 0 },
        { l: 22, s: 26, d: 13, delay: 3 },
        { l: 40, s: 64, d: 20, delay: 6 },
        { l: 58, s: 32, d: 15, delay: 1.5 },
        { l: 74, s: 52, d: 18, delay: 4.5 },
        { l: 88, s: 30, d: 14, delay: 8 },
      ] as const,
    [],
  );
  return (
    <div className="footer-bubbles" aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.l}%`,
            width: `${b.s}px`,
            height: `${b.s}px`,
            animationDuration: `${b.d}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const { t } = useT();
  const year = 2026;

  return (
    <footer
      className="relative z-10 overflow-hidden border-t border-border"
      style={{ backgroundColor: "var(--footer-bg)" }}
    >
      <Bubbles />
      <div className="relative z-10 mx-auto max-w-[1560px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("ft.tagline")}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <span className="live-dot grid h-1.5 w-1.5 place-items-center rounded-full bg-cyan" />
              {t("ft.lineage")}
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-black uppercase tracking-[0.18em] text-foreground">
              {t("ft.product")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.hash} className="footer-link">
                  <Link
                    to="/"
                    hash={l.hash}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    <span className="footer-link-underline">{t(l.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-black uppercase tracking-[0.18em] text-foreground">
              {t("ft.company")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.to} className="footer-link">
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    <span className="footer-link-underline">{t(l.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-black uppercase tracking-[0.18em] text-foreground">
              {t("nav.contact")}
            </p>
            <a
              href="mailto:hello@wizardops.ca"
              className="footer-link mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-violet" />
              <span className="footer-link-underline">hello@wizardops.ca</span>
            </a>
            <div className="mt-5">
              <Link to="/contact" className={cta("primary", "sm")}>
                {t("nav.demo")} <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {BRAND.name}. {t("ft.rights")}
          </p>
          <p className="font-display font-semibold tracking-wide">{t("ft.built")}</p>
        </div>
      </div>
    </footer>
  );
}
