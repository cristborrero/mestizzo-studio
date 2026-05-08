'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PhilosophySection() {
  return (
    <section className="py-60 bg-foreground text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,15,71,0.2),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter mb-20">
            No somos<br />
            volumen.<br />
            Somos <span className="text-accent italic">legado.</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium text-white/60 mb-20">
            En MESTIZZO Studio, cada proyecto es una pieza única de artesanía digital. Limitamos nuestros clientes para garantizar una ejecución impecable y resultados de clase mundial.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-accent text-white px-12 py-7 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-2xl shadow-accent/20"
          >
            Comenzar un Proyecto
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
