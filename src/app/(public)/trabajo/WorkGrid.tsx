"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS = ["Todo", "Branding", "Web", "AI", "Media", "Animación"];

const CASES = [
  {
    slug: "identidad-norte",
    client: "Norte Colectivo",
    sector: "Cultura & Entretenimiento",
    location: "Bogotá",
    capabilities: ["Branding"],
    headline: "Una identidad que redefine la escena cultural bogotana.",
    year: "2025",
    size: "large",
    placeholder: "#1a1a1a",
  },
  {
    slug: "ecommerce-palma",
    client: "Palma Studio",
    sector: "Moda & Lifestyle",
    location: "Madrid",
    capabilities: ["Web", "Branding"],
    headline: "E-commerce de autor para una marca de moda independiente.",
    year: "2025",
    size: "medium",
    placeholder: "#111111",
  },
  {
    slug: "ai-operaciones-vertex",
    client: "Vertex Group",
    sector: "Real Estate",
    location: "Miami",
    capabilities: ["AI"],
    headline: "Automatización inteligente para escalar sin perder la voz de marca.",
    year: "2026",
    size: "medium",
    placeholder: "#0d0d0d",
  },
  {
    slug: "web-boutique-sirka",
    client: "Sirka",
    sector: "Gastronomía Premium",
    location: "Barcelona",
    capabilities: ["Web"],
    headline: "Presencia digital que comunica exclusividad antes del primer bocado.",
    year: "2026",
    size: "large",
    placeholder: "#161616",
  },
  {
    slug: "film-atlas",
    client: "Atlas Films",
    sector: "Producción Audiovisual",
    location: "Atlanta",
    capabilities: ["Media"],
    headline: "Showreel y motion branding para una productora de nueva generación.",
    year: "2025",
    size: "small",
    placeholder: "#0a0a0a",
  },
  {
    slug: "3d-producto-manuk",
    client: "Manuk",
    sector: "Cosmética & Bienestar",
    location: "Bogotá",
    capabilities: ["Animación"],
    headline: "Renders hiperrealistas que convirtieron el packaging en obra.",
    year: "2026",
    size: "small",
    placeholder: "#131313",
  },
];

type Case = (typeof CASES)[number];

const colSpanMap: Record<string, string> = {
  large: "md:col-span-8",
  medium: "md:col-span-6",
  small: "md:col-span-4",
};

function CaseCard({ case_: c, index }: { case_: Case; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
      className={`${colSpanMap[c.size] ?? "md:col-span-4"} group`}
    >
      <Link href={`/trabajo/${c.slug}`} className="block">
        <div
          className="relative w-full mb-5 overflow-hidden rounded-2xl"
          style={{ aspectRatio: c.size === "large" ? "16/9" : "4/3", background: c.placeholder }}
        >
          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              Ver caso <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            {c.capabilities.map((cap) => (
              <span
                key={cap}
                className="bg-white/10 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-1.5">
              {c.client} — {c.location} · {c.year}
            </p>
            <h3 className="text-foreground font-light leading-snug group-hover:text-accent transition-colors duration-300">
              {c.headline}
            </h3>
          </div>
          <ArrowUpRight className="h-4 w-4 text-secondary group-hover:text-accent shrink-0 mt-1 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState("Todo");

  const filtered =
    activeFilter === "Todo"
      ? CASES
      : CASES.filter((c) => c.capabilities.includes(activeFilter));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap gap-3 mb-16"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border transition-all duration-300 ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-secondary border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {filtered.map((c, i) => (
          <CaseCard key={c.slug} case_={c} index={i} />
        ))}
      </motion.div>
    </>
  );
}
