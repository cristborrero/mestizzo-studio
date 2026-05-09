"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Palette, Code2, Sparkles, TrendingUp, Video, Package } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICIOS = [
  {
    slug: "branding",
    num: "01",
    icon: Palette,
    title: "Branding & Strategy",
    tagline: "Identidad que no se olvida.",
    desc: "Sistemas de identidad visual que capturan la esencia de marcas audaces. Estrategia de posicionamiento, manuales de marca y naming para empresas que quieren liderar su categoría.",
    entregables: ["Identidad visual completa", "Manual de marca", "Naming & tagline", "Posicionamiento estratégico", "Brandbook editorial"],
  },
  {
    slug: "web",
    num: "02",
    icon: Code2,
    title: "Web Boutique",
    tagline: "Presencia digital de autor.",
    desc: "Experiencias digitales a medida. Desde landing pages inmersivas hasta ecosistemas e-commerce de alto rendimiento. Diseño y desarrollo en una sola firma.",
    entregables: ["Diseño UX/UI a medida", "Desarrollo Next.js / React", "E-commerce integrado", "Optimización de performance", "CMS editable"],
  },
  {
    slug: "ai",
    num: "03",
    icon: Sparkles,
    title: "AI Integration",
    tagline: "Inteligencia que escala tu negocio.",
    desc: "Automatización inteligente y agentes autónomos diseñados para amplificar la operatividad de negocios modernos sin perder la voz de marca.",
    entregables: ["Agentes autónomos a medida", "Automatización de flujos", "Chatbots de marca", "Integración con CRM/ERP", "Consultoría de stack AI"],
  },
  {
    slug: "growth",
    num: "04",
    icon: TrendingUp,
    title: "Digital Growth",
    tagline: "Crecimiento con criterio.",
    desc: "Estrategias de contenido y pauta que construyen un legado digital sostenible. No perseguimos métricas vacías — construimos audiencias reales.",
    entregables: ["Estrategia de contenidos", "Gestión de pauta digital", "SEO técnico y editorial", "Auditoría de presencia", "Reporting mensual"],
  },
  {
    slug: "media",
    num: "05",
    icon: Video,
    title: "Media Production",
    tagline: "Contenido que respira calidad.",
    desc: "Captura de producto, video corporativo y showreels con estética cinematográfica. Producción que transforma lo que una marca hace en lo que quiere proyectar.",
    entregables: ["Video corporativo", "Fotografía de producto", "Showreel & motion branding", "Reels para redes sociales", "Dirección de arte"],
  },
  {
    slug: "animacion",
    num: "06",
    icon: Package,
    title: "Animación & 3D",
    tagline: "El diseño en tercera dimensión.",
    desc: "Modelado y renders hiperrealistas. Motion graphics y animaciones de marca que llevan el diseño a un nivel que las fotos no pueden alcanzar.",
    entregables: ["Renders de producto 3D", "Animación de marca", "Motion graphics", "Intro & outros de video", "Visualizaciones arquitectónicas"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ServiciosContent() {
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
            03 — Servicios
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6 max-w-4xl">
            Capacidades de autor<br />
            <span className="font-medium">para marcas con criterio.</span>
          </h1>
          <p className="text-secondary text-lg font-light max-w-lg leading-relaxed">
            Seis disciplinas. Una firma. Trabajamos end-to-end o en la pieza que tu marca más necesita ahora.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y divide-border"
        >
          {SERVICIOS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                variants={itemVariants}
                className="group py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 hover:bg-surface transition-colors duration-300 -mx-6 px-6 md:-mx-12 md:px-12"
              >
                <div className="md:col-span-5 flex gap-6">
                  <div className="flex flex-col gap-4 shrink-0 pt-1">
                    <span className="text-[10px] font-black text-accent">{s.num}</span>
                    <div className="p-3 bg-surface group-hover:bg-background rounded-xl transition-colors duration-300">
                      <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium mb-1">{s.title}</h2>
                    <p className="text-accent text-[10px] font-black uppercase tracking-[0.25em] mb-4">{s.tagline}</p>
                    <p className="text-secondary font-light leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-4">Entregables</p>
                  <ul className="space-y-2">
                    {s.entregables.map((e) => (
                      <li key={e} className="flex items-center gap-3 text-sm text-foreground font-light">
                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3 flex flex-col justify-end gap-4">
                  <Link
                    href="/quote"
                    className="group/btn inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] bg-accent text-white px-5 py-3 rounded-full hover:bg-foreground transition-colors duration-300 w-fit"
                  >
                    Cotizá este servicio
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group/btn inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-secondary hover:text-foreground transition-colors duration-300"
                  >
                    Consultar alcance
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">
              ¿No encontrás lo que buscás?
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              Hablemos y lo<br />
              <span className="font-medium">diseñamos juntos.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-colors duration-300 shrink-0"
          >
            Contactar
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
