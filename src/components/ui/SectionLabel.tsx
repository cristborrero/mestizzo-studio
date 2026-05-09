"use client";

import { motion, useReducedMotion } from "framer-motion";
import { slideInLeft, viewportOnce } from "@/lib/motion";

type SectionLabelProps = {
  label:    string;
  number?:  string;
  variant?: "numbered" | "simple";
};

export default function SectionLabel({
  label,
  number,
  variant = "simple",
}: SectionLabelProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.p
      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-secondary"
      variants={slideInLeft}
      initial={shouldReduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <span className="text-accent">·</span>
      {variant === "numbered" && number && (
        <>
          <span>{number.padStart(2, "0")}</span>
          <span className="text-border">—</span>
        </>
      )}
      <span>{label}</span>
    </motion.p>
  );
}
