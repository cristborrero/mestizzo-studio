import type { Metadata } from "next";
import EstudioContent from "./EstudioContent";

export const metadata: Metadata = {
  title: { absolute: "Sobre MESTIZZO Studio — Diseño de Autor, Personas Reales" },
  description: "Somos MESTIZZO Studio. Un atelier digital para los que se niegan a ser ordinarios. Founders, criterio y diseño de autor desde Bogotá hacia el mundo.",
  openGraph: {
    title: "Sobre MESTIZZO Studio — Diseño de Autor, Personas Reales",
    description: "Somos MESTIZZO Studio. Un atelier digital para los que se niegan a ser ordinarios. Founders, criterio y diseño de autor desde Bogotá hacia el mundo.",
  },
};

export default function EstudioPagina() {
  return <EstudioContent />;
}
