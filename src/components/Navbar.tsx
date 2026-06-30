import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useT, type TKey } from "@/lib/i18n";

const anchorLinks: { hash: string; key: TKey }[] = [
  { hash: "produit", key: "nav.product" },
  { hash: "prix", key: "nav.pricing" },
  { hash: "secteurs", key: "nav.sectors" },
  { hash: "stack", key: "nav.stack" },
  { hash: "faq", key: "nav.faq" },
];

const pageLinks: { to: string; key: TKey }[] = [
  { to: "/manifeste", key: "nav.manifesto" },
  { to: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/72 backdrop-blur-2xl backdrop-saturate-150"
          : "bg-gradient-to-b from-background/40 to-background/0 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1560px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {anchorLinks.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold text-foreground/72 transition hover:bg-card/60 hover:text-foreground"
            >
              {t(l.key)}
            </Link>
          ))}
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold text-foreground/72 transition hover:bg-card/60 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Link
            to="/contact"
            className="hidden h-10 items-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-white shadow-[0_8px_28px_-8px_rgba(124,58,237,0.7)] transition hover:translate-y-[-1px] sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2.3} />
            {t("nav.demo")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("nav.menu")}
            aria-expanded={open}
            className="glass glass-edge grid h-10 w-10 place-items-center rounded-xl text-foreground transition hover:text-violet lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={2.4} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-y border-border bg-background/96 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto grid max-w-[1560px] gap-1.5 px-5 pb-6 pt-3 sm:px-8">
              {anchorLinks.map((l) => (
                <Link
                  key={l.hash}
                  to="/"
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-violet"
                >
                  {t(l.key)}
                </Link>
              ))}
              {pageLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-violet"
                >
                  {t(l.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-bold text-white"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={2.3} /> {t("nav.demo")}
              </Link>
              <div className="mt-1 flex items-center gap-2 sm:hidden">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
