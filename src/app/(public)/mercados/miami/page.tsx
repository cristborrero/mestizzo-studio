import type { Metadata } from "next";
import MercadoContent, { type MercadoData } from "@/components/mercados/MercadoContent";

export const metadata: Metadata = {
  title: "Diseño Digital Premium para Marcas en Miami y Florida",
  description: "Branding, diseño web y estrategia digital para marcas latinas en Miami y el sur de Florida. Bilingual — español e inglés. Proyectos selectos.",
  openGraph: {
    title: "Diseño Digital Premium para Marcas en Miami y Florida — MESTIZZO Studio",
    description: "Branding, diseño web y estrategia digital para marcas latinas en Miami y el sur de Florida. Bilingual — español e inglés. Proyectos selectos.",
  },
};

const mercado: MercadoData = {
  num: "03",
  slug: "miami",
  ciudad: "Miami · Florida",
  pais: "Estados Unidos",
  headline: "Identidad digital para marcas latinas en Miami y el sur de EEUU.",
  sub: "Branding y web en español e inglés para marcas que cruzan culturas.",
  contexto: [
    "Miami es uno de los mercados latinos más dinámicos del mundo. Empresas que nacen en Colombia, Venezuela, Argentina o México y encuentran en Florida su plataforma de lanzamiento al mercado anglosajón.",
    "Esa dualidad cultural es una ventaja — pero solo si la identidad de marca la puede sostener. Un logo que funciona en Bogotá no necesariamente funciona en Brickell.",
    "MESTIZZO trabaja con fundadores y marcas en Miami que necesitan una identidad que opere en dos idiomas y dos mundos sin perder coherencia ni criterio.",
  ],
  servicios: [
    {
      title: "Branding Bilingüe",
      desc: "Identidad visual que funciona en español e inglés. Sistemas de marca para el mercado latino de EEUU y la expansión hacia el mercado anglosajón.",
    },
    {
      title: "Web Boutique",
      desc: "Sitios web en inglés y español para empresas en Miami. Desde landing pages hasta ecosistemas e-commerce para el mercado latinoamericano de Florida.",
    },
    {
      title: "Media Production",
      desc: "Fotografía y video con estética de alto nivel para marcas que necesitan comunicar en ambos mercados. Contenido que no necesita traducción.",
    },
  ],
  clientes: [],
};

export default function MiamiPage() {
  return <MercadoContent mercado={mercado} />;
}
