import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { AmbientGlow } from "@/components/AmbientGlow";
import { SystemGuide } from "@/components/SystemGuide";
import { useT } from "@/lib/i18n";
import { cta } from "@/components/cta";

export const Route = createFileRoute("/guide")({
  component: GuidePage,
});

function GuidePage() {
  const { t } = useT();
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <AmbientGlow />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
              {t("guide.kicker")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl">
              {t("guide.title.a")} <span className="text-brand">{t("guide.title.b")}</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("guide.lead")}
            </p>
            <div className="mt-7">
              <Link to="/contact" className={cta("primary", "md")}>
                <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
                {t("guide.cta")}
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <SystemGuide />
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
