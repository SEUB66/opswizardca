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
} from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";

const items: { icon: typeof Wrench; key: TKey }[] = [
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

export function SectorMarquee() {
  const { t } = useT();
  const row = [...items, ...items];
  return (
    <section className="relative z-10 border-y border-border bg-card/30 py-7 backdrop-blur-sm">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {t("marquee.lead")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track gap-4 px-2">
          {row.map(({ icon: Icon, key }, i) => (
            <span
              key={`${key}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-semibold text-foreground/80"
            >
              <Icon className="h-4 w-4 text-violet" strokeWidth={2} />
              {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
