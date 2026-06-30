import { useState } from "react";
import { TrendingDown, Timer, PiggyBank } from "lucide-react";
import { useT } from "@/lib/i18n";
import { BRAND, formatPrice } from "@/lib/brand";

/** Representative one-time licence used for the payback math (mid of the range). */
const LICENCE = Math.round((BRAND.priceLow + BRAND.priceHigh) / 2);

export function ROICalculator() {
  const { t, lang } = useT();
  const [monthly, setMonthly] = useState(200);

  const yearly = monthly * 12;
  const breakeven = monthly > 0 ? Math.ceil(LICENCE / monthly) : Infinity;
  const fiveYear = monthly * 60 - LICENCE;

  return (
    <div className="glass glass-edge rounded-2xl p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {t("roi.title")}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{t("roi.lead")}</p>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-3">
          <label htmlFor="roi-monthly" className="text-sm font-semibold text-foreground">
            {t("roi.monthly")}
          </label>
          <span className="font-display text-2xl font-black tracking-tight text-brand">
            {formatPrice(monthly, lang)}
          </span>
        </div>
        <input
          id="roi-monthly"
          type="range"
          min={50}
          max={600}
          step={10}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-violet"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] font-medium text-muted-foreground">
          <span>{formatPrice(50, lang)}</span>
          <span>{formatPrice(600, lang)}/mo</span>
        </div>
      </div>

      <dl className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat
          icon={<TrendingDown className="h-4 w-4 text-destructive" />}
          value={formatPrice(yearly, lang)}
          label={t("roi.yearly")}
        />
        <Stat
          icon={<Timer className="h-4 w-4 text-cyan" />}
          value={`${breakeven === Infinity ? "—" : breakeven} ${t("roi.months")}`}
          label={t("roi.breakeven")}
          highlight
        />
        <Stat
          icon={<PiggyBank className="h-4 w-4 text-violet" />}
          value={formatPrice(Math.max(0, fiveYear), lang)}
          label={t("roi.fiveyear")}
        />
      </dl>

      <p className="mt-5 flex items-center gap-2 rounded-xl border border-cyan/25 bg-cyan/8 px-4 py-3 text-sm text-foreground/85">
        {t("roi.foot")}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {t("roi.licence")}:{" "}
        <strong className="text-foreground">{formatPrice(LICENCE, lang)}</strong>
      </p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
  highlight = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-cyan/40 bg-cyan/8" : "border-border bg-background/40"
      }`}
    >
      <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-xl font-black tracking-tight text-foreground">{value}</p>
    </div>
  );
}
