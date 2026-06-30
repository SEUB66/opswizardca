import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Infinity as InfinityIcon,
  BadgeDollarSign,
  Cloud,
  Languages,
  Timer,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { BRAND, formatPrice } from "@/lib/brand";
import { fadeUp, staggerParent } from "@/lib/motion";
import { cta } from "../cta";
import { AmbientGlow } from "../AmbientGlow";

export function Hero() {
  const { t, lang } = useT();

  // 2×2 symmetric stat grid laid over the open purple space (the image already
  // carries the logo bottom-right, so no logo/slogan repeat here).
  const tiles = [
    { icon: InfinityIcon, value: "∞", label: t("hero.tile.life") },
    {
      icon: BadgeDollarSign,
      value: `${formatPrice(BRAND.priceLow, lang)}+`,
      label: t("hero.tile.once"),
    },
    { icon: Cloud, value: lang === "fr" ? "0–10 $" : "$0–10", label: t("hero.tile.permonth") },
    { icon: Languages, value: "FR / EN", label: t("hero.tile.bilingual") },
  ];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-28 lg:pt-28"
    >
      <AmbientGlow />
      <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 sm:px-8 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-12">
        {/* Left — message */}
        <motion.div variants={staggerParent(0.1, 0.04)} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md"
          >
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-violet animate-pulse" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[clamp(2.7rem,6.2vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-foreground"
          >
            <span className="text-brand">{t("hero.title.a")}</span>
            <br />
            {t("hero.title.b")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link to="/contact" className={cta("primary", "lg")}>
              {t("hero.cta.demo")}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/" hash="prix" className={cta("secondary", "lg")}>
              {t("hero.cta.pricing")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — the purple brand card: 2×2 stat grid + image logo bottom-right */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
            style={{ background: "radial-gradient(60% 60% at 70% 30%, #A855F7, transparent 70%)" }}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 shadow-[0_44px_90px_-30px_rgba(76,29,149,0.7)]">
            <img
              src="/img/wizardops-hero-purple.png"
              alt={t("hero.logo.alt")}
              className="block aspect-square w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 flex flex-col p-5 sm:p-7">
              {/* eyebrow */}
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-[#1E0E3A]/50 px-3 py-1 font-display text-[0.62rem] font-black uppercase tracking-[0.2em] text-white ring-1 ring-white/15 backdrop-blur-md">
                  {t("hero.kit")}
                </span>
                <span className="rounded-md bg-[#1E0E3A]/50 px-2.5 py-1 font-display text-[0.62rem] font-black uppercase tracking-[0.2em] text-cyan-glow ring-1 ring-white/15 backdrop-blur-md">
                  v1
                </span>
              </div>

              {/* 2×2 symmetric stat grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5">
                {tiles.map((tile) => (
                  <div
                    key={tile.label}
                    className="rounded-xl bg-[#1E0E3A]/45 p-3.5 ring-1 ring-white/15 backdrop-blur-md"
                  >
                    <tile.icon className="h-5 w-5 text-cyan-glow" strokeWidth={2.1} />
                    <div className="mt-2 font-display text-xl font-black leading-none tracking-tight text-white sm:text-2xl">
                      {tile.value}
                    </div>
                    <div className="mt-1 text-[0.62rem] font-semibold uppercase tracking-wide text-white/70">
                      {tile.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* bottom-left pill balances the image's bottom-right logo */}
              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 rounded-md bg-[#1E0E3A]/55 px-3.5 py-2 font-display text-[0.7rem] font-bold uppercase tracking-wide text-white ring-1 ring-white/15 backdrop-blur-md">
                  <Timer className="h-4 w-4 text-cyan-glow" strokeWidth={2.3} />
                  {t("roi.breakeven")} · &lt; 2 {t("roi.months")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
