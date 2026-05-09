import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6">
        404
      </p>
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6 text-foreground">
        Página<br />no encontrada.
      </h1>
      <p className="text-secondary text-lg font-light max-w-md mb-12 leading-relaxed">
        Esta URL no existe o fue movida. Podés volver al inicio o explorar nuestro trabajo.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al Inicio
        </Link>
        <Link
          href="/trabajo"
          className="inline-flex items-center gap-3 border border-border text-foreground px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:border-foreground transition-colors duration-300"
        >
          Ver Trabajo
        </Link>
      </div>
    </main>
  );
}
