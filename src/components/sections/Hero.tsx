import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Infinity as InfinityIcon,
  BadgeDollarSign,
  Palette,
  Languages,
  Sparkles,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";
import { fadeUp, staggerParent } from "@/lib/motion";
import { TiltCard } from "../TiltCard";
import { AmbientGlow } from "../AmbientGlow";

const bullets = [
  { icon: InfinityIcon, key: "hero.bullet.own" },
  { icon: BadgeDollarSign, key: "hero.bullet.infra" },
  { icon: Palette, key: "hero.bullet.brand" },
  { icon: Languages, key: "hero.bullet.bilingual" },
] as const;

export function Hero() {
  const { t } = useT();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <AmbientGlow />
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12">
        <motion.div variants={staggerParent(0.1, 0.04)} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md"
          >
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-violet animate-pulse" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-[40px] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[62px] lg:text-[72px]"
          >
            <span className="text-brand">{t("hero.title.a")}</span>
            <br />
            {t("hero.title.b")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_36px_-10px_rgba(124,58,237,0.75)] transition hover:translate-y-[-1px]"
            >
              {t("hero.cta.demo")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/"
              hash="prix"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition hover:border-foreground"
            >
              {t("hero.cta.pricing")}
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground"
          >
            {bullets.map(({ icon: Icon, key }) => (
              <li key={key} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-violet" />
                {t(key as Parameters<typeof t>[0])}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual — tilted glass "product" card anchored by the pixel logo. */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          <TiltCard
            className="glass glass-edge glass-hover rounded-3xl p-6 sm:p-8"
            max={reduce ? 0 : 10}
          >
            <div className="depth-pop-sm flex items-center justify-between gap-4">
              <img
                src={BRAND.logo}
                alt={t("hero.logo.alt")}
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 sm:h-24 sm:w-24"
                decoding="async"
                fetchPriority="high"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan">
                <Sparkles className="h-3.5 w-3.5" /> v1
              </span>
            </div>

            <div className="depth-pop-sm mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              <span className="text-brand">Wizard</span> Ops
            </div>

            <dl className="depth-pop-sm mt-6 grid grid-cols-2 gap-3">
              {[
                { v: `$${BRAND.priceLow.toLocaleString("en-CA")}+`, k: t("price.card.range") },
                { v: "$0–10", k: t("hero.stat.infra") },
                { v: "FR / EN", k: t("hero.bullet.bilingual") },
                { v: "< 2 yr", k: t("roi.breakeven") },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-background/40 p-3.5 backdrop-blur"
                >
                  <dd className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl">
                    {s.v}
                  </dd>
                  <dt className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {s.k}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="depth-pop-sm mt-5 flex items-center gap-2 rounded-xl border border-violet/25 bg-violet/8 px-4 py-3 text-sm font-semibold text-foreground">
              <InfinityIcon className="h-4 w-4 text-violet" />
              {t("hero.bullet.own")}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
