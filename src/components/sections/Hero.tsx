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
import { AmbientGlow } from "../AmbientGlow";

export function Hero() {
  const { t, lang } = useT();

  // Value items overlaid on the open purple space of the brand card (the image
  // already carries the logo bottom-right, so no logo/slogan repeat here).
  const cardItems = [
    { icon: InfinityIcon, label: t("hero.bullet.own") },
    {
      icon: BadgeDollarSign,
      label: `${formatPrice(BRAND.priceLow, lang)}–${formatPrice(BRAND.priceHigh, lang)} · ${t("price.card.range")}`,
    },
    { icon: Cloud, label: t("hero.bullet.infra") },
    { icon: Languages, label: t("hero.bullet.bilingual") },
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
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md"
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
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[0.95rem] font-bold text-white shadow-[0_14px_40px_-10px_rgba(124,58,237,0.8)] transition hover:translate-y-[-2px]"
            >
              {t("hero.cta.demo")}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/"
              hash="prix"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-7 py-4 text-[0.95rem] font-semibold text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:border-foreground"
            >
              {t("hero.cta.pricing")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — the purple brand card (your image; value items over open space) */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          {/* soft violet bloom behind the card */}
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
            {/* value chips floated over the open (top/left) purple space */}
            <div className="absolute inset-0 flex flex-col p-5 sm:p-7">
              <ul className="grid max-w-[78%] gap-2.5">
                {cardItems.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-[#1E0E3A]/45 px-4 py-3 text-[0.95rem] font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur-md"
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-cyan-glow" strokeWidth={2.1} />
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1E0E3A]/55 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
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
