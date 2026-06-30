import { Truck, Fuel, Clock, WifiOff, type LucideIcon } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";

const ops: { icon: LucideIcon; t: TKey; d: TKey; highlight?: boolean }[] = [
  { icon: Truck, t: "ops.fleet.t", d: "ops.fleet.d", highlight: true },
  { icon: Fuel, t: "ops.fuel.t", d: "ops.fuel.d" },
  { icon: Clock, t: "ops.punch.t", d: "ops.punch.d" },
  { icon: WifiOff, t: "ops.offline.t", d: "ops.offline.d" },
];

export function FieldOps() {
  const { t } = useT();
  return (
    <section id="operations" className="relative isolate overflow-hidden py-20 sm:py-28">
      <AmbientGlow />
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("ops.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("ops.title.a")} <span className="text-brand">{t("ops.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("ops.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ops.map((o, i) => (
            <Reveal
              key={o.t}
              delay={(i % 4) * 0.06}
              className={`glass glass-edge glass-hover group relative flex flex-col overflow-hidden rounded-2xl p-6 ${
                o.highlight ? "ring-2 ring-violet/45" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-background/40 text-violet transition group-hover:border-violet group-hover:bg-violet group-hover:text-white">
                  <o.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                {o.highlight && (
                  <span className="rounded-md bg-violet/15 px-2.5 py-1 font-display text-[0.6rem] font-black uppercase tracking-[0.16em] text-violet ring-1 ring-violet/30">
                    {t("ops.included")}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-foreground">
                {t(o.t)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(o.d)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
