import { X, Check, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";

export function ProblemSaaS() {
  const { t } = useT();
  const saasRows = ["prob.saas.site", "prob.saas.crm", "prob.saas.invoice"] as const;
  const ourRows = ["prob.ours.point1", "prob.ours.point2", "prob.ours.point3"] as const;

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <AmbientGlow />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("prob.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("prob.title.a")} <span className="text-brand">{t("prob.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("prob.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* SaaS stack — the trap */}
          <Reveal className="relative overflow-hidden rounded-2xl border border-destructive/25 bg-card/40 p-7 backdrop-blur-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-destructive">
              {t("prob.saas.label")}
            </span>
            <ul className="mt-5 space-y-3">
              {saasRows.map((k) => (
                <li key={k} className="flex items-center gap-3 text-sm text-foreground/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/12 text-destructive">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-display text-2xl font-black tracking-tight text-destructive">
                {t("prob.saas.total")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t("prob.saas.note")}</p>
            </div>
          </Reveal>

          {/* The kit — the asset */}
          <Reveal
            delay={0.08}
            className="glass glass-edge relative overflow-hidden rounded-2xl p-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet">
              {t("prob.ours.label")}
            </span>
            <ul className="mt-5 space-y-3">
              {ourRows.map((k) => (
                <li key={k} className="flex items-center gap-3 text-sm text-foreground/90">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <p className="inline-flex items-center gap-2 font-display text-2xl font-black tracking-tight text-brand">
                {t("prob.ours.total")} <ArrowRight className="h-5 w-5 text-cyan" />
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
