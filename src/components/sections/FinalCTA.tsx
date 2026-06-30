import { Link } from "@tanstack/react-router";
import { CalendarCheck, ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../Reveal";

export function FinalCTA() {
  const { t } = useT();
  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="relative overflow-hidden rounded-[2rem] p-10 ring-1 ring-white/15 sm:p-16">
          {/* Pure-CSS brand backdrop — deep violet gradient, no baked text. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, #4C1D95 0%, #6D28D9 42%, #5B21B6 72%, #3B1574 100%)",
            }}
          />
          {/* hex dot texture */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* roaming spotlight glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-20 -z-10 h-80 w-80 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }}
          />

          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t("cta.title.a")}{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(110deg, #E9D5FF 0%, #67E8F9 100%)",
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
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[0.95rem] font-bold text-[#4C1D95] shadow-lg transition hover:-translate-y-0.5"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2.3} />
                {t("cta.button")}
              </Link>
              <Link
                to="/manifeste"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-[0.95rem] font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {t("cta.secondary")}
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.3} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
