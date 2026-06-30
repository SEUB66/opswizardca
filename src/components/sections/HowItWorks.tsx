import {
  Rocket,
  PencilRuler,
  Globe2,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";

const steps: { icon: LucideIcon; t: TKey; d: TKey; n: string }[] = [
  { icon: Rocket, t: "how.s1.t", d: "how.s1.d", n: "1" },
  { icon: PencilRuler, t: "how.s2.t", d: "how.s2.d", n: "2" },
  { icon: Globe2, t: "how.s3.t", d: "how.s3.d", n: "3" },
  { icon: InfinityIcon, t: "how.s4.t", d: "how.s4.d", n: "4" },
];

export function HowItWorks() {
  const { t } = useT();
  return (
    <section className="relative isolate overflow-hidden border-y border-border py-20 sm:py-28">
      <div aria-hidden className="grid-paper absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("how.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("how.title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.t}
              delay={i * 0.07}
              className="relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-lg font-black text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.7)]">
                  {s.n}
                </span>
                <s.icon className="h-5 w-5 text-cyan" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">
                {t(s.t)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.d)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
