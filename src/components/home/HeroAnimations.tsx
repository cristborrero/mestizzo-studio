"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, ease, duration } from "@/lib/motion";

export default function HeroAnimations() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial={shouldReduce ? "visible" : "hidden"}
      animate="visible"
      className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-border pt-12 pb-8"
    >
      <motion.p
        variants={fadeUp}
        className="max-w-xl text-xl md:text-2xl font-light leading-snug text-secondary"
      >
        Creamos identidades digitales con criterio de autor.<br />
        Para founders que construyen para perdurar.
      </motion.p>

      <motion.div variants={fadeUp} className="pointer-events-auto flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-foreground text-background px-10 py-6 rounded-full hover:bg-accent transition-all duration-500"
        >
          Iniciá tu proyecto
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
        <Link
          href="/trabajo"
          className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest border border-border text-secondary px-10 py-6 rounded-full hover:border-foreground hover:text-foreground transition-all duration-300"
        >
          Ver nuestro trabajo
        </Link>
      </motion.div>
    </motion.div>
  );
}
