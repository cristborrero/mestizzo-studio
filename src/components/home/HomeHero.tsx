'use client';

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FluidCanvas from "@/components/ui/FluidCanvas";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomeHero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 pb-8 overflow-hidden bg-background">
      <FluidCanvas />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1600px] mx-auto pt-32 pointer-events-none"
      >
        <motion.div variants={fadeUp} className="mb-12">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">
            Est. 2026 — Bogotá, Colombia
          </span>
        </motion.div>

        <motion.h1 
          variants={fadeUp}
          className="text-[clamp(4rem,18vw,14rem)] font-black leading-[0.8] uppercase tracking-[-0.06em] mb-16 text-foreground select-none pointer-events-auto"
        >
          Digital<br />
          <span className="text-accent">Atelier.</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-border pt-12 pb-8">
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-xl md:text-2xl font-medium leading-snug text-secondary"
          >
            Transformamos la visión de marcas boutique en legados digitales a través del diseño de autor y tecnología de vanguardia.
          </motion.p>
          
          <motion.div variants={fadeUp} className="pointer-events-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-foreground text-background px-10 py-6 rounded-full hover:bg-accent transition-all duration-500"
            >
              Iniciar Proyecto
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
