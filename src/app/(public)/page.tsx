import {
  Code2, Palette, Sparkles,
  Package, Video, TrendingUp,
} from "lucide-react";
import HomeHero from "@/components/home/HomeHero";
import Marquee from "@/components/home/Marquee";
import ServiceCard from "@/components/home/ServiceCard";
import PhilosophySection from "@/components/home/PhilosophySection";

const services = [
  {
    id: "BND",
    title: "Branding & Strategy",
    desc: "Para marcas que necesitan identidad, no solo un logo. Un sistema que dirige decisiones durante años.",
    icon: "Palette",
    size: "large"
  },
  {
    id: "WEB",
    title: "Web Boutique",
    desc: "Tu sitio no debería parecerse al de nadie más. Experiencias web a medida que convierten visitantes en clientes.",
    icon: "Code2",
    size: "medium"
  },
  {
    id: "AI",
    title: "AI Integration",
    desc: "Automatización que trabaja mientras vos dormís. Agentes autónomos diseñados para escalar sin escalar el equipo.",
    icon: "Sparkles",
    size: "small"
  },
  {
    id: "MKT",
    title: "Digital Growth",
    desc: "Contenido y pauta con criterio editorial. No buscamos clicks — construimos audiencias que compran.",
    icon: "TrendingUp",
    size: "medium"
  },
  {
    id: "PHV",
    title: "Media Production",
    desc: "Foto y video con estética cinematográfica. Porque el primer segundo de atención define todo lo demás.",
    icon: "Video",
    size: "large"
  },
  {
    id: "3D",
    title: "Animación & 3D",
    desc: "Renders hiperrealistas y motion que hace que la gente pare de scrollear.",
    icon: "Package",
    size: "small"
  }
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background selection:bg-accent selection:text-white relative">
      
      {/* ── Hero Section (Client Island) ── */}
      <HomeHero />

      {/* ── Marquee Style text (Client Island) ── */}
      <Marquee />

      {/* ── Services Staggered Grid ── */}
      <section className="py-40 bg-background">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-32">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 block">
              Capacidades
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Seis maneras de<br />
              <span className="text-outline">construir algo que dure.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {services.map((s, idx) => (
              <ServiceCard 
                key={s.id}
                id={s.id}
                title={s.title}
                desc={s.desc}
                icon={s.icon}
                size={s.size}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Section (Client Island) ── */}
      <PhilosophySection />

      {/* ── CTA Final ── */}
      <section className="py-40 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-8">
            Siguiente paso
          </p>
          <p className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">
            ¿Tu marca está lista<br />
            para perdurar?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-4 bg-foreground text-background px-12 py-7 rounded-full text-sm font-black uppercase tracking-widest hover:bg-accent transition-all duration-500"
          >
            Iniciá tu proyecto
          </a>
        </div>
      </section>
    </div>
  );
}
