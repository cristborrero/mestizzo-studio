import type { Metadata } from "next";
import MercadoContent, { type MercadoData } from "@/components/mercados/MercadoContent";

export const metadata: Metadata = {
  title: "Agencia Digital Boutique en Bogotá",
  description: "Branding, diseño web y estrategia digital de autor para marcas premium en Bogotá. Atelier boutique. Proyectos selectos.",
  openGraph: {
    title: "Agencia Digital Boutique en Bogotá — MESTIZZO Studio",
    description: "Branding, diseño web y estrategia digital de autor para marcas premium en Bogotá. Atelier boutique. Proyectos selectos.",
  },
};

const mercado: MercadoData = {
  num: "01",
  slug: "bogota",
  ciudad: "Bogotá",
  pais: "Colombia",
  headline: "Diseño de autor para el ecosistema empresarial de Bogotá.",
  sub: "Branding, web y estrategia digital para founders y marcas en construcción.",
  contexto: [
    "Bogotá atraviesa una transformación empresarial profunda. El ecosistema de startups, marcas de consumo premium y estudios creativos crece — pero la mayoría sigue comunicando como si estuvieran en 2015.",
    "La diferencia entre una marca que lidera y una que compite por precio es, casi siempre, de diseño. De identidad. De criterio.",
    "En MESTIZZO trabajamos con marcas bogotanas que ya entendieron eso. Que saben que la imagen no es decoración — es argumento de venta.",
  ],
  servicios: [
    {
      title: "Branding & Strategy",
      desc: "Identidad visual que posiciona. Manuales de marca, naming y posicionamiento para marcas que quieren liderar su categoría en Colombia.",
    },
    {
      title: "Web Boutique",
      desc: "Sitios web a medida para empresas de servicios, consumo premium y startups en Bogotá. Diseño y desarrollo en una sola firma.",
    },
    {
      title: "AI Integration",
      desc: "Automatización e inteligencia artificial aplicada al negocio. Agentes autónomos para escalar operaciones sin perder la voz de marca.",
    },
  ],
  clientes: ["Norte Colectivo", "Manuk", "Vertex Group"],
};

export default function BogotaPage() {
  return <MercadoContent mercado={mercado} />;
}
