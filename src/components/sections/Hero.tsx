import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Infinity as InfinityIcon,
  BadgeDollarSign,
  Cloud,
  Languages,
  Timer,
  Sparkles,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { BRAND, formatPrice } from "@/lib/brand";
import { fadeUp, staggerParent } from "@/lib/motion";
import { AmbientGlow } from "../AmbientGlow";

const bullets = [
  { icon: InfinityIcon, key: "hero.bullet.own" },
  { icon: BadgeDollarSign, key: "hero.bullet.infra" },
  { icon: Languages, key: "hero.bullet.bilingual" },
] as const;

export function Hero() {
  const { t, lang } = useT();

  // Value items shown inside the purple brand card (no slogan → no repeat of
  // the headline). Each row is a frosted chip so it reads on any purple.
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

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-muted-foreground"
          >
            {bullets.map(({ icon: Icon, key }) => (
              <li key={key} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-violet" />
                {t(key)}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — the purple brand card (logo + value items, no slogan) */}
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
          <article
            className="relative overflow-hidden rounded-[1.75rem] p-7 ring-1 ring-white/15 shadow-[0_44px_90px_-30px_rgba(76,29,149,0.7)] sm:p-9"
            style={{
              // Tuned to the brand purple banner. Swap this for the slogan-free
              // purple PNG when ready: backgroundImage: "url('/img/wizardops-hero-card.png')".
              background:
                "linear-gradient(158deg, #A78BFA 0%, #8B6FE6 44%, #6D4FD8 78%, #5A3CC4 100%)",
            }}
          >
            {/* hex texture + top sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.22), transparent)",
              }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND.logo}
                  alt={t("hero.logo.alt")}
                  className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/25 shadow-lg sm:h-[4.5rem] sm:w-[4.5rem]"
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="font-display text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-3xl">
                  Wizard Ops
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> v1
              </span>
            </div>

            <ul className="relative mt-7 space-y-2.5">
              {cardItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-white/12 px-4 py-3 text-[0.95rem] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-white" strokeWidth={2.1} />
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="relative mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#2A1147]/40 px-4 py-3.5 ring-1 ring-white/20 backdrop-blur-sm">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Timer className="h-4 w-4 text-cyan-glow" strokeWidth={2.2} />
                {t("roi.breakeven")}
              </span>
              <span className="font-display text-lg font-black tracking-tight text-white">
                &lt; 2 {t("roi.months")}
              </span>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
