import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <button
      onClick={toggle}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-violet hover:text-violet"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
