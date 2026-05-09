import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import WorkGrid from "./WorkGrid";

export const metadata = {
  title: "Portafolio de Proyectos Digitales",
  description: "Proyectos que dejan marca. Branding, web, IA y media para founders de Colombia, España y EE.UU. Seis estudios de caso seleccionados.",
  openGraph: {
    title: "Portafolio de Proyectos Digitales — MESTIZZO Studio",
    description: "Proyectos que dejan marca. Branding, web, IA y media para founders de Colombia, España y EE.UU.",
  },
};

export default function TrabajoPagina() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="mb-20">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-5">
            01 — Trabajo
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6">
            Proyectos que<br />
            <span className="font-medium">dejan marca.</span>
          </h1>
          <p className="text-secondary text-lg font-light max-w-lg leading-relaxed">
            Cada proyecto es una pieza única. Trabajamos con pocas marcas para entregarlo todo.
          </p>
        </div>

        <WorkGrid />

        <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">
              ¿Trabajamos juntos?
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              Tu proyecto podría ser<br />
              <span className="font-medium">el siguiente.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform"
          >
            Iniciar Proyecto
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}
