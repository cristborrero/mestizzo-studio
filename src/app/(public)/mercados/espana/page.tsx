import type { Metadata } from "next";
import MercadoContent, { type MercadoData } from "@/components/mercados/MercadoContent";

export const metadata: Metadata = {
  title: "Estudio Digital Boutique para Marcas en España",
  description: "Branding, diseño web y estrategia digital de autor para marcas en Madrid, Barcelona y España. Atelier boutique. Proyectos selectos.",
  openGraph: {
    title: "Estudio Digital Boutique para Marcas en España — MESTIZZO Studio",
    description: "Branding, diseño web y estrategia digital de autor para marcas en Madrid, Barcelona y España. Atelier boutique. Proyectos selectos.",
  },
};

const mercado: MercadoData = {
  num: "02",
  slug: "espana",
  ciudad: "España",
  pais: "España",
  headline: "El atelier digital para marcas españolas con ambición global.",
  sub: "Madrid, Barcelona y el mercado hispanohablante de primer nivel.",
  contexto: [
    "El mercado digital español está saturado de agencias genéricas que producen volumen. Sitios que se parecen entre sí. Identidades que no dicen nada.",
    "Las marcas con criterio — las que quieren competir en el mercado europeo o hispanohablante global — necesitan otra cosa: autoría, estrategia real y ejecución de nivel.",
    "Desde Bogotá y Londres, MESTIZZO trabaja con marcas españolas que entienden que el diseño de autor es una ventaja competitiva, no un gasto.",
  ],
  servicios: [
    {
      title: "Branding & Strategy",
      desc: "Identidad visual para marcas españolas con ambición internacional. Posicionamiento, naming y manuales que funcionan en España y el mercado global hispanohablante.",
    },
    {
      title: "Web Boutique",
      desc: "Sitios web de alto rendimiento para empresas de servicios, ecommerce premium y marcas B2B en España. Diseño y desarrollo end-to-end.",
    },
    {
      title: "Digital Growth",
      desc: "Estrategia de contenidos y presencia digital para marcas que quieren construir audiencias reales en España y Latinoamérica.",
    },
  ],
  clientes: ["Palma Studio"],
};

export default function EspanaPage() {
  return <MercadoContent mercado={mercado} />;
}
