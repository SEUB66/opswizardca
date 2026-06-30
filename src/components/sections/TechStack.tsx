import {
  Zap,
  Layers,
  Globe2,
  Database,
  Send,
  Gauge,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";

const stack: { icon: LucideIcon; t: TKey; d: TKey; tag: string }[] = [
  { icon: Zap, t: "stack.bun.t", d: "stack.bun.d", tag: "Runtime" },
  { icon: Layers, t: "stack.tanstack.t", d: "stack.tanstack.d", tag: "Framework" },
  { icon: Globe2, t: "stack.vercel.t", d: "stack.vercel.d", tag: "Edge" },
  { icon: Database, t: "stack.supabase.t", d: "stack.supabase.d", tag: "Data" },
  { icon: Send, t: "stack.resend.t", d: "stack.resend.d", tag: "Email" },
];

const advantages: { icon: LucideIcon; t: TKey; d: TKey }[] = [
  { icon: Gauge, t: "stack.adv.1.t", d: "stack.adv.1.d" },
  { icon: Smartphone, t: "stack.adv.2.t", d: "stack.adv.2.d" },
  { icon: Wrench, t: "stack.adv.3.t", d: "stack.adv.3.d" },
];

export function TechStack() {
  const { t } = useT();
  return (
    <section
      id="stack"
      className="relative isolate overflow-hidden border-y border-border py-20 sm:py-28"
    >
      <AmbientGlow />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("stack.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("stack.title.a")} <span className="text-brand">{t("stack.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("stack.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stack.map((s, i) => (
            <Reveal
              key={s.t}
              delay={(i % 5) * 0.05}
              className="glass glass-edge group rounded-2xl p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-background/40 text-cyan transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-cyan-foreground">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="mt-4 text-[0.65rem] font-black uppercase tracking-[0.18em] text-muted-foreground/70">
                {s.tag}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
                {t(s.t)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.d)}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Reveal>
            <p className="font-display text-lg font-bold tracking-tight text-foreground">
              {t("stack.adv.title")}
            </p>
          </Reveal>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {advantages.map((a, i) => (
              <Reveal
                key={a.t}
                delay={i * 0.06}
                className="flex gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <a.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold tracking-tight text-foreground">
                    {t(a.t)}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(a.d)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
