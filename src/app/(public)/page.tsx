'use client';

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, Code2, Palette, Megaphone, Video, Sparkles, 
  Package, PenTool, BookOpen, Map, ShoppingBag, TrendingUp,
  Zap, ChevronRight, Globe, Fingerprint, Layers
} from "lucide-react";
import Image from "next/image";
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

const services = [
  { 
    id: "BND",
    title: "Branding & Strategy",
    desc: "Sistemas de identidad que capturan la esencia de marcas audaces. Manuales de marca de lujo y posicionamiento estratégico.",
    icon: Palette,
    size: "large"
  },
  { 
    id: "WEB",
    title: "Web Boutique",
    desc: "Experiencias digitales a medida. Desde landings inmersivas hasta ecosistemas e-commerce de alto rendimiento.",
    icon: Code2,
    size: "medium"
  },
  { 
    id: "AI",
    title: "AI Integration",
    desc: "Automatización inteligente y agentes autónomos diseñados para escalar la operatividad de negocios modernos.",
    icon: Sparkles,
    size: "small"
  },
  { 
    id: "MKT",
    title: "Digital Growth",
    desc: "Estrategias de contenido y pauta que no solo buscan clicks, sino construir un legado digital sostenible.",
    icon: TrendingUp,
    size: "medium"
  },
  { 
    id: "PHV",
    title: "Media Production",
    desc: "Captura de producto y video corporativo con estética cinematográfica. Contenido que respira calidad.",
    icon: Video,
    size: "large"
  },
  { 
    id: "3D",
    title: "Animación & 3D",
    desc: "Modelado y renders hiperrealistas. Llevamos el diseño a la tercera dimensión con precisión absoluta.",
    icon: Package,
    size: "small"
  }
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background selection:bg-accent selection:text-white relative">
      
      {/* ── Hero Section ── */}
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

      {/* ── Marquee Style text ── */}
      <div className="py-12 border-y border-border overflow-hidden whitespace-nowrap bg-surface">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex gap-20 items-center">
              <span className="text-4xl font-black uppercase tracking-tighter opacity-20">Branding Boutique</span>
              <span className="text-4xl font-black uppercase tracking-tighter text-accent italic">Diseño de Autor</span>
              <span className="text-4xl font-black uppercase tracking-tighter opacity-20">Fullstack Dev</span>
              <span className="text-4xl font-black uppercase tracking-tighter opacity-20">AI Integration</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Services Staggered Grid ── */}
      <section className="py-40 bg-background">
        <div className="max-w-[1600px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 block">
              Capabilities
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Crafting<br />
              <span className="text-outline">Excellence.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {services.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE }}
                viewport={{ once: true }}
                className={`
                  relative group bg-surface rounded-[3rem] p-12 overflow-hidden
                  ${s.size === 'large' ? 'md:col-span-8' : s.size === 'medium' ? 'md:col-span-6' : 'md:col-span-4'}
                  hover:bg-foreground transition-colors duration-700
                `}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="mb-20">
                    <div className="h-14 w-14 rounded-2xl bg-white border border-border flex items-center justify-center mb-10 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                      <s.icon className="h-6 w-6 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-white transition-colors mb-6">
                      {s.title}
                    </h3>
                    <p className="text-lg text-secondary font-medium group-hover:text-white/60 transition-colors max-w-sm">
                      {s.desc}
                    </p>
                  </div>
                  
                  <Link 
                    href="/quote"
                    className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-foreground group-hover:text-white group-hover:gap-6 transition-all"
                  >
                    Ver Detalles <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                </div>

                {/* Decorative Background Icon */}
                <s.icon className="absolute right-[-10%] bottom-[-10%] h-64 w-64 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
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

      {/* ── Trust Section ── */}
      <section className="py-40 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-20">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">
                Global Impact
              </p>
              <p className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                Diseñando para los<br />
                líderes del mañana.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40">
               <div className="h-20 w-40 flex items-center justify-center border border-black/10 rounded-2xl">
                 <Globe className="h-8 w-8" />
               </div>
               <div className="h-20 w-40 flex items-center justify-center border border-black/10 rounded-2xl">
                 <Fingerprint className="h-8 w-8" />
               </div>
               <div className="h-20 w-40 flex items-center justify-center border border-black/10 rounded-2xl">
                 <Layers className="h-8 w-8" />
               </div>
               <div className="h-20 w-40 flex items-center justify-center border border-black/10 rounded-2xl">
                 <Zap className="h-8 w-8" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
