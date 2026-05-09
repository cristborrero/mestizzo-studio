import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios de Diseño Digital de Autor",
  description: "Branding, diseño web boutique, integración de IA y más. Capacidades de autor para marcas con criterio. Proyectos únicos, sin volumen.",
  openGraph: {
    title: "Servicios de Diseño Digital de Autor — MESTIZZO Studio",
    description: "Branding, diseño web boutique, integración de IA y más. Capacidades de autor para marcas con criterio. Proyectos únicos, sin volumen.",
  },
};

export default function ServiciosPagina() {
  return <ServiciosContent />;
}
