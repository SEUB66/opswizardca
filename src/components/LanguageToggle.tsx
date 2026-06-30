import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang, t } = useT();
  const next = lang === "fr" ? "en" : "fr";
  return (
    <button
      onClick={() => setLang(next)}
      aria-label={t("lang.toggle")}
      title={t("lang.toggle")}
      className="relative grid h-10 w-12 place-items-center overflow-hidden rounded-full border border-border bg-card text-xs font-bold tracking-wider transition hover:border-violet/60 hover:text-violet"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lang}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-0.5"
        >
          <span className={lang === "en" ? "text-foreground" : "text-muted-foreground/60"}>EN</span>
          <span className="text-muted-foreground/40">/</span>
          <span className={lang === "fr" ? "text-foreground" : "text-muted-foreground/60"}>FR</span>
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
