import { Link } from "@tanstack/react-router";
import { CalendarCheck, ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../Reveal";

export function FinalCTA() {
  const { t } = useT();
  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="relative overflow-hidden rounded-3xl border border-violet/25 p-10 sm:p-16">
          {/* Brand banner backdrop (dark hex + spotlight) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: "url('/img/wizardops-banner-dark.jpg')",
              // Dark fallback so the white copy stays readable if the image fails.
              backgroundColor: "#1b1226",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(110deg, rgba(20,16,30,0.86) 0%, rgba(20,16,30,0.62) 48%, rgba(20,16,30,0.40) 100%)",
            }}
          />
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
              {t("cta.title.a")}{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, var(--violet-glow) 0%, var(--cyan-glow) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("cta.title.b")}
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("cta.lead")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#2A1147] shadow-lg transition hover:translate-y-[-1px]"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={2.3} />
                {t("cta.button")}
              </Link>
              <Link
                to="/manifeste"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                {t("cta.secondary")}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
