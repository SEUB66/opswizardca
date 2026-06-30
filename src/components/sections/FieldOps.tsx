import {
  Truck,
  Fuel,
  Clock,
  WifiOff,
  ClipboardCheck,
  FileText,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { AmbientGlow } from "../AmbientGlow";

const ops: { icon: LucideIcon; t: TKey; d: TKey }[] = [
  { icon: ClipboardCheck, t: "ops.round.t", d: "ops.round.d" },
  { icon: Fuel, t: "ops.fuel.t", d: "ops.fuel.d" },
  { icon: Clock, t: "ops.punch.t", d: "ops.punch.d" },
  { icon: FileText, t: "ops.maint.t", d: "ops.maint.d" },
  { icon: Camera, t: "ops.photos.t", d: "ops.photos.d" },
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

        {/* Branded fleet showcase — the real wrapped vans */}
        <Reveal className="glass glass-edge relative mt-12 overflow-hidden rounded-3xl p-5 ring-2 ring-violet/45 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/img/fleet-van-ford.png"
              alt="Ford cargo van wrapped in Wizard Ops branding"
              className="w-full rounded-xl bg-[#26262b] object-cover ring-1 ring-white/10"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/img/fleet-van-dodge.png"
              alt="Dodge minivan wrapped in Wizard Ops branding"
              className="w-full rounded-xl bg-[#26262b] object-cover ring-1 ring-white/10"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <Truck className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {t("ops.fleet.t")}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t("ops.fleet.d")}
                </p>
              </div>
            </div>
            <span className="w-fit shrink-0 rounded-md bg-violet/15 px-3 py-1.5 font-display text-[0.62rem] font-black uppercase tracking-[0.16em] text-violet ring-1 ring-violet/30">
              {t("ops.included")}
            </span>
          </div>
        </Reveal>

        {/* The rest of the crew tooling */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {ops.map((o, i) => (
            <Reveal
              key={o.t}
              delay={(i % 3) * 0.06}
              className="glass glass-edge glass-hover group relative flex flex-col overflow-hidden rounded-2xl p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-background/40 text-violet transition group-hover:border-violet group-hover:bg-violet group-hover:text-white">
                <o.icon className="h-6 w-6" strokeWidth={2} />
              </span>
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
