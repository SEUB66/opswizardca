import {
  Trees,
  DoorOpen,
  Wrench,
  Bug,
  PaintRoller,
  Snowflake,
  SprayCan,
  Zap,
  Wind,
  HardHat,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";

const trades: { icon: LucideIcon; key: TKey }[] = [
  { icon: Trees, key: "sec.landscaping" },
  { icon: DoorOpen, key: "sec.garage" },
  { icon: Wrench, key: "sec.plumbing" },
  { icon: Bug, key: "sec.pest" },
  { icon: PaintRoller, key: "sec.painting" },
  { icon: Snowflake, key: "sec.snow" },
  { icon: SprayCan, key: "sec.windows" },
  { icon: Zap, key: "sec.electric" },
  { icon: Wind, key: "sec.hvac" },
  { icon: HardHat, key: "sec.roofing" },
];

export function Sectors() {
  const { t } = useT();
  return (
    <section id="secteurs" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("sec.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("sec.title.a")} <span className="text-brand">{t("sec.title.b")}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("sec.lead")}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((s, i) => (
            <Reveal
              key={s.key}
              delay={(i % 4) * 0.05}
              className="card-hover group flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-background/50 text-violet transition group-hover:bg-violet group-hover:text-violet-foreground">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-foreground">
                {t(s.key)}
              </span>
            </Reveal>
          ))}
          <Reveal
            delay={0.1}
            className="flex items-center gap-3 rounded-xl border border-dashed border-violet/40 bg-violet/5 p-4"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-white">
              <Plus className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-sm font-bold tracking-tight text-brand">
              {t("sec.more")}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
