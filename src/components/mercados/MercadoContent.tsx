"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export interface MercadoData {
  num: string;
  slug: string;
  ciudad: string;
  pais: string;
  headline: string;
  sub: string;
  contexto: string[];
  servicios: { title: string; desc: string }[];
  clientes: string[];
}

export default function MercadoContent({ mercado }: { mercado: MercadoData }) {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-24"
        >
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-5">
            {mercado.num} — {mercado.ciudad} · {mercado.pais}
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] max-w-4xl mb-6">
            {mercado.headline.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="font-medium">{mercado.headline.split(" ").slice(-2).join(" ")}</span>
          </h1>
          <p className="text-secondary text-lg font-light max-w-lg leading-relaxed">
            {mercado.sub}
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 pb-32 border-b border-border"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-8">
              Contexto
            </p>
            <div className="space-y-6 text-lg font-light text-foreground leading-relaxed">
              {mercado.contexto.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="bg-surface rounded-3xl p-10 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Mercado</p>
                <p className="text-2xl font-light">{mercado.ciudad}</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">País</p>
                <p className="text-foreground font-light">{mercado.pais}</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Idioma de trabajo</p>
                <p className="text-foreground font-light">
                  {mercado.slug === "miami" || mercado.slug === "atlanta" ? "Español · English" : "Español"}
                </p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Modelo</p>
                <p className="text-foreground font-light">Remoto · Proyectos selectos</p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mb-32 pb-32 border-b border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-12"
          >
            Lo que hacemos aquí
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {mercado.servicios.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-surface rounded-3xl p-10 hover:bg-foreground transition-colors duration-500"
              >
                <p className="text-[10px] font-black text-accent mb-6">0{i + 1}</p>
                <h3 className="text-xl font-medium mb-3 group-hover:text-white transition-colors duration-500">
                  {s.title}
                </h3>
                <p className="text-secondary group-hover:text-white/60 font-light leading-relaxed transition-colors duration-500">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {mercado.clientes.length > 0 && (
          <section className="mb-32 pb-32 border-b border-border">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-12"
            >
              Marcas de este mercado
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border"
            >
              {mercado.clientes.map((client) => (
                <motion.div
                  key={client}
                  variants={itemVariants}
                  className="bg-background py-10 px-8 flex items-center justify-center"
                >
                  <span className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-300 text-center">
                    {client}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-light leading-[1.1] mb-4">
              Tu marca en {mercado.ciudad}.<br />
              <span className="font-medium">Nivel siguiente.</span>
            </h2>
            <p className="text-secondary font-light max-w-sm leading-relaxed">
              Trabajamos con un número reducido de marcas por ciclo. Si tu proyecto tiene criterio, hablemos.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform shrink-0"
          >
            Iniciá tu proyecto
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
