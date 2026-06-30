import { Link } from "@tanstack/react-router";
import { Check, X, ArrowRight } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { BRAND, formatPrice } from "@/lib/brand";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";
import { ROICalculator } from "./ROICalculator";

const inclusions: TKey[] = [
  "price.incl.1",
  "price.incl.2",
  "price.incl.3",
  "price.incl.4",
  "price.incl.5",
  "price.incl.6",
  "price.incl.7",
  "price.incl.8",
];

const compareRows: { label: TKey; saas: TKey; ours: TKey }[] = [
  { label: "cmp.row.cost", saas: "cmp.row.cost.saas", ours: "cmp.row.cost.ours" },
  { label: "cmp.row.own", saas: "cmp.row.own.saas", ours: "cmp.row.own.ours" },
  { label: "cmp.row.brand", saas: "cmp.row.brand.saas", ours: "cmp.row.brand.ours" },
  { label: "cmp.row.integ", saas: "cmp.row.integ.saas", ours: "cmp.row.integ.ours" },
  { label: "cmp.row.price", saas: "cmp.row.price.saas", ours: "cmp.row.price.ours" },
];

export function Pricing() {
  const { t, lang } = useT();
  return (
    <section id="prix" className="relative isolate overflow-hidden py-20 sm:py-28">
      <AmbientGlow />
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("price.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("price.title.a")} <span className="text-brand">{t("price.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("price.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* Price card */}
          <Reveal className="glass glass-edge relative overflow-hidden rounded-3xl p-7 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet">
              {t("price.card.badge")}
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
              {t("price.card.name")}
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-4xl font-black tracking-tight text-brand sm:text-5xl">
                {formatPrice(BRAND.priceLow, lang)}–{formatPrice(BRAND.priceHigh, lang)}
              </span>
              <span className="mb-1.5 text-sm font-semibold text-muted-foreground">
                {t("price.card.range")}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t("price.card.infra")}</p>

            <Link
              to="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_36px_-10px_rgba(124,58,237,0.75)] transition hover:translate-y-[-1px]"
            >
              {t("price.card.cta")} <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-7 font-display text-xs font-black uppercase tracking-[0.15em] text-foreground">
              {t("price.incl.title")}
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {inclusions.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ROI calculator */}
          <Reveal delay={0.08}>
            <ROICalculator />
          </Reveal>
        </div>

        {/* Comparison table */}
        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
          <div className="grid grid-cols-3 border-b border-border bg-background/30 text-sm font-display font-black uppercase tracking-wide">
            <div className="p-4 text-muted-foreground">{t("cmp.title")}</div>
            <div className="flex items-center gap-2 p-4 text-destructive">
              <X className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              {t("cmp.col.saas")}
            </div>
            <div className="flex items-center gap-2 bg-violet/8 p-4 text-brand">
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              {t("cmp.col.ours")}
            </div>
          </div>
          {compareRows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-background/20" : ""}`}
            >
              <div className="border-t border-border p-4 font-semibold text-foreground">
                {t(r.label)}
              </div>
              <div className="flex items-center gap-2 border-t border-border p-4 text-muted-foreground">
                <X className="h-3.5 w-3.5 shrink-0 text-destructive/70" strokeWidth={2.5} />
                {t(r.saas)}
              </div>
              <div className="flex items-center gap-2 border-t border-border bg-violet/[0.06] p-4 text-foreground/90">
                <Check className="h-3.5 w-3.5 shrink-0 text-cyan" strokeWidth={2.5} />
                {t(r.ours)}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
