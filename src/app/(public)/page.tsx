import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HomeHero from "@/components/home/HomeHero";
import Marquee from "@/components/home/Marquee";
import ServiceCard from "@/components/home/ServiceCard";
import PhilosophySection from "@/components/home/PhilosophySection";

export const metadata: Metadata = {
  title: { absolute: "Digital Atelier para Marcas Premium — MESTIZZO Studio" },
  description: "Agencia de diseño digital boutique especializada en branding, web y AI para founders que construyen para perdurar. Colombia, España y EEUU.",
  openGraph: {
    title: "Digital Atelier para Marcas Premium — MESTIZZO Studio",
    description: "Agencia de diseño digital boutique especializada en branding, web y AI para founders que construyen para perdurar.",
    url: "https://mestizzo-studio.vercel.app",
    siteName: "MESTIZZO Studio",
    type: "website",
  },
};

const services = [
  {
    id: "BND",
    title: "Branding & Strategy",
    desc: "Para marcas que necesitan identidad, no solo un logo. Sistemas visuales con criterio editorial que sobreviven a las tendencias.",
    icon: "Palette",
    size: "large"
  },
  {
    id: "WEB",
    title: "Web Boutique",
    desc: "Sitios web que se sienten como experiencias de lujo. Cada interacción, considerada. Cada detalle, intencional.",
    icon: "Code2",
    size: "medium"
  },
  {
    id: "AI",
    title: "AI Integration",
    desc: "Automatización que amplifica tu equipo sin reemplazar tu voz. Sistemas inteligentes entrenados en tu identidad de marca.",
    icon: "Sparkles",
    size: "small"
  },
  {
    id: "MKT",
    title: "Digital Growth",
    desc: "Estrategias que construyen presencia real, no vanidad de métricas. Contenido y pauta para marcas que juegan a largo plazo.",
    icon: "TrendingUp",
    size: "medium"
  },
  {
    id: "PHV",
    title: "Media Production",
    desc: "Producción audiovisual con estética de dirección de arte. Contenido que se siente como editorial, no como publicidad.",
    icon: "Video",
    size: "large"
  },
  {
    id: "3D",
    title: "Animación & 3D",
    desc: "Dimensión visual que hace imposible mirar para otro lado. Renders, motion y 3D para marcas que exigen lo mejor.",
    icon: "Package",
    size: "small"
  }
] as const;

const featuredWork = [
  {
    slug: "identidad-norte",
    client: "Norte Colectivo",
    capability: "Branding",
    tagline: "Una identidad que redefine la escena cultural bogotana.",
    placeholder: "#1a1a1a",
    location: "Bogotá",
  },
  {
    slug: "ecommerce-palma",
    client: "Palma Studio",
    capability: "Web + Branding",
    tagline: "E-commerce de autor para una marca de moda independiente.",
    placeholder: "#111111",
    location: "Madrid",
  },
  {
    slug: "3d-producto-manuk",
    client: "Manuk",
    capability: "Animación & 3D",
    tagline: "Renders hiperrealistas que convirtieron el packaging en obra.",
    placeholder: "#131313",
    location: "Bogotá",
  },
];

const testimonials = [
  {
    quote: "MESTIZZO no solo diseñó nuestra marca — entendió lo que queríamos ser antes de que nosotros pudiéramos articularlo. El resultado superó todo lo que habíamos imaginado.",
    author: "María C.",
    role: "Fundadora, Norte Colectivo",
    market: "Colombia",
  },
  {
    quote: "Buscábamos una agencia que entendiera el lujo sin caer en los clichés del sector. MESTIZZO lo entendió desde el primer brief. Nuestros clientes nos preguntan constantemente por la web.",
    author: "Álvaro M.",
    role: "Director Creativo, Palma Studio",
    market: "España",
  },
  {
    quote: "Working with MESTIZZO was the first time an agency understood that we needed Latin American creative intelligence, not a generic digital solution. The results speak for themselves.",
    author: "James R.",
    role: "CEO, Vertex Group",
    market: "Miami, FL",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background selection:bg-accent selection:text-white relative">

      {/* Hero */}
      <HomeHero />

      {/* Marquee */}
      <Marquee />

      {/* Work Preview */}
      <section className="py-40 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 block">
                Trabajo Selecto
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Proyectos que<br />
                <span className="text-outline">dejan marca.</span>
              </h2>
            </div>
            <Link
              href="/trabajo"
              className="hidden md:inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors shrink-0"
            >
              Ver todo el trabajo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWork.map((item) => (
              <Link
                key={item.slug}
                href={`/trabajo/${item.slug}`}
                className="group block"
              >
                <div
                  className="w-full rounded-2xl mb-6 overflow-hidden"
                  style={{ aspectRatio: "4/3", background: item.placeholder }}
                >
                  <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center gap-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] px-5 py-3 rounded-full backdrop-blur-sm">
                      Ver caso <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-2">
                  {item.client} · {item.location}
                </p>
                <h3 className="text-lg font-light text-foreground leading-snug group-hover:text-accent transition-colors">
                  {item.tagline}
                </h3>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary mt-2 block">
                  {item.capability}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              href="/trabajo"
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors"
            >
              Ver todo el trabajo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 block">
              Lo que hacemos
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

      {/* Philosophy */}
      <PhilosophySection />

      {/* Testimonials */}
      <section className="py-40 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 block">
              Quienes confían en nosotros
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Lo que dicen<br />
              <span className="text-outline">nuestros clientes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <blockquote
                key={idx}
                className="border border-border rounded-3xl p-10 flex flex-col justify-between gap-12 hover:border-accent/40 transition-colors duration-500"
              >
                <p className="text-lg font-light text-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="text-sm font-black text-foreground">{t.author}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mt-1">{t.role}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mt-3">{t.market}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-8 block">
            Espacio limitado
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
            Tenemos espacio para<br />
            <span className="text-outline">un proyecto nuevo.</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-secondary mb-16 max-w-xl mx-auto">
            Puede ser el tuyo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>
    </div>
  );
}
