import type { Metadata } from "next";
import MercadoContent, { type MercadoData } from "@/components/mercados/MercadoContent";

export const metadata: Metadata = {
  title: "Diseño y Estrategia Digital para Marcas en Atlanta y Georgia",
  description: "Branding, diseño web y estrategia digital para marcas y la comunidad latina en Atlanta, Georgia. Bilingual — español e inglés. Proyectos selectos.",
  openGraph: {
    title: "Diseño y Estrategia Digital para Marcas en Atlanta — MESTIZZO Studio",
    description: "Branding, diseño web y estrategia digital para marcas y la comunidad latina en Atlanta, Georgia. Bilingual — español e inglés. Proyectos selectos.",
  },
};

const mercado: MercadoData = {
  num: "04",
  slug: "atlanta",
  ciudad: "Atlanta · Georgia",
  pais: "Estados Unidos",
  headline: "Diseño de autor para la comunidad latina y marcas en Georgia.",
  sub: "Identidad y estrategia para el mercado hispano de mayor crecimiento en EEUU.",
  contexto: [
    "Atlanta es uno de los mercados latinos de mayor crecimiento en los Estados Unidos. La comunidad hispana en Georgia supera ya los 1.1 millones — con un poder adquisitivo y empresarial que muchas agencias todavía no saben cómo hablarle.",
    "Las marcas que operan en este mercado necesitan identidad que conecte con la audiencia latina sin alienar al mercado anglosajón. Un equilibrio difícil de lograr sin criterio de diseño real.",
    "MESTIZZO trabaja con founders y empresas en Georgia que entienden ese equilibrio — y quieren construir una presencia que dure.",
  ],
  servicios: [
    {
      title: "Branding & Strategy",
      desc: "Identidad visual para marcas en Atlanta que necesitan comunicar con la comunidad latina y el mercado anglosajón. Posicionamiento bicultural con criterio de autor.",
    },
    {
      title: "Web Boutique",
      desc: "Sitios web bilingües para empresas en Georgia. Diseño y desarrollo a medida para el mercado hispano de EEUU.",
    },
    {
      title: "AI Integration",
      desc: "Automatización e IA para negocios en Atlanta. Agentes autónomos y flujos inteligentes que operan en español e inglés.",
    },
  ],
  clientes: [],
};

export default function AtlantaPage() {
  return <MercadoContent mercado={mercado} />;
}
