import { 
  Code2, Palette, Sparkles, 
  Package, Video, TrendingUp,
  Globe, Fingerprint, Layers, Zap
} from "lucide-react";
import HomeHero from "@/components/home/HomeHero";
import Marquee from "@/components/home/Marquee";
import ServiceCard from "@/components/home/ServiceCard";
import PhilosophySection from "@/components/home/PhilosophySection";

const services = [
  { 
    id: "BND",
    title: "Branding & Strategy",
    desc: "Sistemas de identidad que capturan la esencia de marcas audaces. Manuales de marca de lujo y posicionamiento estratégico.",
    icon: "Palette",
    size: "large"
  },
  { 
    id: "WEB",
    title: "Web Boutique",
    desc: "Experiencias digitales a medida. Desde landings inmersivas hasta ecosistemas e-commerce de alto rendimiento.",
    icon: "Code2",
    size: "medium"
  },
  { 
    id: "AI",
    title: "AI Integration",
    desc: "Automatización inteligente y agentes autónomos diseñados para escalar la operatividad de negocios modernos.",
    icon: "Sparkles",
    size: "small"
  },
  { 
    id: "MKT",
    title: "Digital Growth",
    desc: "Estrategias de contenido y pauta que no solo buscan clicks, sino construir un legado digital sostenible.",
    icon: "TrendingUp",
    size: "medium"
  },
  { 
    id: "PHV",
    title: "Media Production",
    desc: "Captura de producto y video corporativo con estética cinematográfica. Contenido que respira calidad.",
    icon: "Video",
    size: "large"
  },
  { 
    id: "3D",
    title: "Animación & 3D",
    desc: "Modelado y renders hiperrealistas. Llevamos el diseño a la tercera dimensión con precisión absoluta.",
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
              Capabilities
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Crafting<br />
              <span className="text-outline">Excellence.</span>
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

      {/* ── Trust Section (Static Server Side) ── */}
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
