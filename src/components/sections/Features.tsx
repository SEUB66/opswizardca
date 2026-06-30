import { Globe, Wand2, Truck, ReceiptText, Palette, Users, type LucideIcon } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";

const features: { icon: LucideIcon; t: TKey; d: TKey; n: string }[] = [
  { icon: Globe, t: "feat.site.t", d: "feat.site.d", n: "01" },
  { icon: Wand2, t: "feat.quote.t", d: "feat.quote.d", n: "02" },
  { icon: Truck, t: "feat.dispatch.t", d: "feat.dispatch.d", n: "03" },
  { icon: ReceiptText, t: "feat.invoice.t", d: "feat.invoice.d", n: "04" },
  { icon: Palette, t: "feat.whitelabel.t", d: "feat.whitelabel.d", n: "05" },
  { icon: Users, t: "feat.pages.t", d: "feat.pages.d", n: "06" },
];

export function Features() {
  const { t } = useT();
  return (
    <section id="produit" className="relative isolate overflow-hidden py-20 sm:py-28">
      <AmbientGlow />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("feat.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("feat.title.a")} <span className="text-brand">{t("feat.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("feat.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.t}
              delay={(i % 3) * 0.06}
              className="glass glass-edge glass-hover group relative flex flex-col overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-background/40 text-violet transition group-hover:border-violet group-hover:bg-violet group-hover:text-violet-foreground">
                  <f.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className="font-display text-sm font-black tracking-widest text-muted-foreground/50">
                  {f.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
                {t(f.t)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(f.d)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
