import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mercados — Bogotá, España, Miami, Atlanta",
  description: "MESTIZZO Studio trabaja con marcas premium en Bogotá, España, Miami y Atlanta. Diseño de autor y estrategia digital para cada mercado.",
  openGraph: {
    title: "Mercados — MESTIZZO Studio",
    description: "MESTIZZO Studio trabaja con marcas premium en Bogotá, España, Miami y Atlanta. Diseño de autor y estrategia digital para cada mercado.",
  },
};

const MERCADOS = [
  {
    num: "01",
    slug: "bogota",
    ciudad: "Bogotá",
    pais: "Colombia",
    desc: "El ecosistema empresarial de Bogotá está creciendo. Las marcas que quieren liderar necesitan identidad, no solo presencia.",
  },
  {
    num: "02",
    slug: "espana",
    ciudad: "España",
    pais: "Madrid · Barcelona",
    desc: "Marcas españolas con ambición global. Branding y web de autor para el mercado europeo y el hispanohablante.",
  },
  {
    num: "03",
    slug: "miami",
    ciudad: "Miami",
    pais: "Florida, EEUU",
    desc: "El mercado latino de EEUU necesita identidades que funcionen en dos idiomas y dos mundos sin perder coherencia.",
  },
  {
    num: "04",
    slug: "atlanta",
    ciudad: "Atlanta",
    pais: "Georgia, EEUU",
    desc: "Uno de los mercados hispanos de mayor crecimiento en EEUU. Diseño y estrategia para marcas en la comunidad latina de Georgia.",
  },
];

export default function MercadosPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="mb-24">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-5">
            Mercados
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] max-w-4xl mb-6">
            Diseño de autor en{" "}
            <span className="font-medium">cuatro mercados.</span>
          </h1>
          <p className="text-secondary text-lg font-light max-w-lg leading-relaxed">
            Bogotá · Madrid · Miami · Atlanta. Remoto de origen, local por criterio.
          </p>
        </div>

        <div className="divide-y divide-border">
          {MERCADOS.map((m) => (
            <Link
              key={m.slug}
              href={`/mercados/${m.slug}`}
              className="group py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 hover:bg-surface transition-colors duration-300 -mx-6 px-6 md:-mx-12 md:px-12 block"
            >
              <div className="md:col-span-1">
                <span className="text-[10px] font-black text-accent">{m.num}</span>
              </div>
              <div className="md:col-span-4">
                <h2 className="text-2xl font-medium mb-1 group-hover:text-accent transition-colors duration-300">
                  {m.ciudad}
                </h2>
                <p className="text-secondary text-sm font-light">{m.pais}</p>
              </div>
              <div className="md:col-span-6">
                <p className="text-secondary font-light leading-relaxed">{m.desc}</p>
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <ArrowUpRight
                  className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">
              ¿Tu mercado no está en la lista?
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              Hablemos igual.<br />
              <span className="font-medium">Trabajamos donde el criterio existe.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-colors duration-300 shrink-0"
          >
            Contactar
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
