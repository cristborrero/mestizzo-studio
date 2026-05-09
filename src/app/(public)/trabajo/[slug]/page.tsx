import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

const CASES = [
  {
    slug: "identidad-norte",
    client: "Norte Colectivo",
    sector: "Cultura & Entretenimiento",
    location: "Bogotá",
    capabilities: ["Branding"],
    headline: "Una identidad que redefine la escena cultural bogotana.",
    year: "2025",
    placeholder: "#1a1a1a",
    challenge: "Norte Colectivo necesitaba una identidad que comunicara su posición como referente cultural emergente en Bogotá — sin caer en los clichés del sector creativo.",
    approach: "Construimos un sistema de marca basado en tensión visual: tipografías de peso extremo contrastadas con espacio negativo generoso. La paleta toma el blanco del papel editorial y el negro del vinilo.",
    result: "Una identidad que se lee como publicación de arte, no como agencia. Reconocida en 3 ediciones de festivales culturales en el primer año.",
    deliverables: ["Sistema de marca completo", "Identidad tipográfica", "Guía de aplicaciones", "Templates para redes sociales"],
  },
  {
    slug: "ecommerce-palma",
    client: "Palma Studio",
    sector: "Moda & Lifestyle",
    location: "Madrid",
    capabilities: ["Web", "Branding"],
    headline: "E-commerce de autor para una marca de moda independiente.",
    year: "2025",
    placeholder: "#111111",
    challenge: "Palma Studio competía en el segmento de moda independiente española con una presencia digital genérica que no comunicaba su diferencial artesanal.",
    approach: "Diseñamos una experiencia de compra que prioriza el producto sobre la interfaz. Editorial en el scroll, inmediata en la conversión. Shopify headless con frontend Next.js.",
    result: "Incremento del 40% en tasa de conversión respecto al sitio anterior. Tiempo medio de sesión: 4:20 min.",
    deliverables: ["Diseño UX/UI completo", "Desarrollo frontend Next.js", "Integración Shopify", "Sistema de identidad digital"],
  },
  {
    slug: "ai-operaciones-vertex",
    client: "Vertex Group",
    sector: "Real Estate",
    location: "Miami",
    capabilities: ["AI"],
    headline: "Automatización inteligente para escalar sin perder la voz de marca.",
    year: "2026",
    placeholder: "#0d0d0d",
    challenge: "Vertex generaba 200+ comunicaciones mensuales con clientes e inversores. El equipo dedicaba 30% de su tiempo a redacción repetitiva.",
    approach: "Implementamos un sistema de IA generativa entrenado sobre el tono y los documentos históricos de Vertex. El equipo supervisa y aprueba — la IA redacta el primer borrador.",
    result: "Reducción del 70% en tiempo de redacción. Consistencia de tono auditada en 98% de las comunicaciones.",
    deliverables: ["Auditoría de voz de marca", "Fine-tuning del modelo", "Dashboard de supervisión", "Integración con CRM"],
  },
  {
    slug: "web-boutique-sirka",
    client: "Sirka",
    sector: "Gastronomía Premium",
    location: "Barcelona",
    capabilities: ["Web"],
    headline: "Presencia digital que comunica exclusividad antes del primer bocado.",
    year: "2026",
    placeholder: "#161616",
    challenge: "Sirka tenía lista de espera de tres meses pero una web que parecía de restaurante de barrio. La desconexión entre experiencia física y digital costaba credibilidad.",
    approach: "Diseño editorial puro. Sin precios en el primer nivel. Sin menú desplegable. La web cuenta la historia del espacio antes de hablar de comida.",
    result: "Reservas online incrementadas un 60%. Menciones en tres publicaciones de gastronomía premium en los dos meses post-lanzamiento.",
    deliverables: ["Diseño web completo", "Sistema de reservas integrado", "Fotografía de dirección", "Copywriting"],
  },
  {
    slug: "film-atlas",
    client: "Atlas Films",
    sector: "Producción Audiovisual",
    location: "Atlanta",
    capabilities: ["Media"],
    headline: "Showreel y motion branding para una productora de nueva generación.",
    year: "2025",
    placeholder: "#0a0a0a",
    challenge: "Atlas Films necesitaba posicionarse ante productores y marcas de primer nivel en el mercado anglosajón. Su trabajo era excelente. Su presentación, invisible.",
    approach: "Produjimos el showreel como si fuera un trailer de festival — estructura de tres actos, sound design original, corte a 90 segundos y versión de 30 para redes.",
    result: "Seleccionado para presentación en Sundance Creators Market. Tres propuestas recibidas en la semana del lanzamiento.",
    deliverables: ["Dirección del showreel", "Edición y post-producción", "Motion graphics", "Identidad sonora"],
  },
  {
    slug: "3d-producto-manuk",
    client: "Manuk",
    sector: "Cosmética & Bienestar",
    location: "Bogotá",
    capabilities: ["Animación"],
    headline: "Renders hiperrealistas que convirtieron el packaging en obra.",
    year: "2026",
    placeholder: "#131313",
    challenge: "Manuk lanzaba su línea premium con packaging de diseño propio pero sin presupuesto para fotografía de producto de alta gama.",
    approach: "3D fotorrealista como alternativa — y superación — de la fotografía tradicional. Cada render controla la luz, el material y el ángulo con precisión quirúrgica.",
    result: "La campaña de lanzamiento con los renders generó mayor engagement que las fotos del producto físico. Costo: 60% menos que una producción fotográfica equivalente.",
    deliverables: ["Modelado 3D del packaging", "12 renders hero para campaña", "Animación de producto para redes", "Archivos fuente editables"],
  },
];

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const case_ = CASES.find((c) => c.slug === params.slug);
  if (!case_) return {};
  const capabilities = case_.capabilities.join(", ");
  return {
    title: `${case_.client} — ${capabilities}, ${case_.location}`,
    description: case_.challenge.slice(0, 155),
    openGraph: {
      title: `${case_.client} — ${capabilities}, ${case_.location} — MESTIZZO Studio`,
      description: case_.challenge.slice(0, 155),
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const case_ = CASES.find((c) => c.slug === params.slug);
  if (!case_) notFound();

  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          href="/trabajo"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors mb-16"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Trabajo
        </Link>

        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-2 mb-6">
            {case_.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[9px] font-black uppercase tracking-[0.3em] border border-border px-4 py-2 rounded-full text-secondary"
              >
                {cap}
              </span>
            ))}
            <span className="text-[9px] font-black uppercase tracking-[0.3em] border border-border px-4 py-2 rounded-full text-secondary">
              {case_.location} · {case_.year}
            </span>
          </div>

          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            {case_.client}
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-6 max-w-3xl">
            {case_.headline}
          </h1>
          <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium">
            {case_.sector}
          </p>
        </div>

        {/* Image placeholder */}
        <div
          className="w-full rounded-3xl mb-20 flex items-center justify-center"
          style={{ aspectRatio: "16/9", background: case_.placeholder }}
          role="img"
          aria-label={`Imagen del proyecto ${case_.client}`}
        >
          <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            Imágenes del proyecto
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

          <div className="md:col-span-2 space-y-16">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">
                El Reto
              </h2>
              <p className="text-xl font-light leading-relaxed text-foreground">
                {case_.challenge}
              </p>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">
                Nuestra Respuesta
              </h2>
              <p className="text-xl font-light leading-relaxed text-foreground">
                {case_.approach}
              </p>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">
                El Resultado
              </h2>
              <p className="text-xl font-light leading-relaxed text-foreground">
                {case_.result}
              </p>
            </section>
          </div>

          <aside>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6">
              Entregables
            </h2>
            <ul className="space-y-3">
              {case_.deliverables.map((d) => (
                <li key={d} className="text-sm text-foreground font-light flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">—</span>
                  {d}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">
              ¿Querés algo así?
            </p>
            <p className="text-2xl font-light">
              Hablemos de tu proyecto.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform"
          >
            Iniciar Proyecto
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
