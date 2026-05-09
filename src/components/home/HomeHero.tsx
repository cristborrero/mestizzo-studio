import FluidCanvasClient from "./FluidCanvasClient";
import HeroAnimations from "./HeroAnimations";

export default function HomeHero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 pb-8 overflow-hidden bg-background">
      <FluidCanvasClient />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto pt-32 pointer-events-none">
        <div className="mb-12">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">
            Est. 2026 — Bogotá, Colombia
          </span>
        </div>

        {/* Rendered on server — LCP inmediato, sin esperar hidratación */}
        <h1 className="text-[clamp(4rem,18vw,14rem)] font-black leading-[0.8] uppercase tracking-[-0.06em] mb-16 text-foreground select-none pointer-events-auto">
          Digital<br />
          <span className="text-accent">Atelier.</span>
        </h1>

        {/* Client island: subtítulo + CTA con animaciones */}
        <HeroAnimations />
      </div>
    </section>
  );
}
