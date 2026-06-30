import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Quote } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useT, type TKey } from "@/lib/i18n";
import { cta } from "@/components/cta";

export const Route = createFileRoute("/manifeste")({
  component: ManifestoPage,
});

const paragraphs: TKey[] = ["man.p1", "man.p2", "man.p3"];

function ManifestoPage() {
  const { t } = useT();
  return (
    <SiteLayout>
      <article className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
        <AmbientGlow />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
              {t("man.kicker")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.0] tracking-[-0.035em] text-foreground sm:text-6xl">
              {t("man.title.a")} <span className="text-brand">{t("man.title.b")}</span>
            </h1>
          </Reveal>

          <div className="mt-10 space-y-6">
            {paragraphs.map((k, i) => (
              <Reveal key={k} delay={i * 0.05}>
                <p className="text-base leading-[1.75] text-foreground/85 sm:text-lg">{t(k)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="my-12">
            <blockquote className="glass glass-edge relative rounded-2xl p-8 sm:p-10">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-violet/20" />
              <p className="font-display text-2xl font-bold leading-snug tracking-tight text-brand sm:text-3xl">
                {t("man.pull")}
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <p className="text-base leading-[1.7] text-muted-foreground">{t("man.sib")}</p>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <p className="font-display text-sm font-bold tracking-tight text-foreground">
              {t("man.author")}
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <Link to="/contact" className={cta("primary", "lg")}>
              <CalendarCheck className="h-4 w-4" strokeWidth={2.3} />
              {t("man.cta")}
            </Link>
          </Reveal>
        </div>
      </article>
    </SiteLayout>
  );
}
