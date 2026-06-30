import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inView } from "@/lib/motion";

/** Fade-and-rise on first scroll into view, using the shared motion language. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
