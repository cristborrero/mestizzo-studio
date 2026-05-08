import MultiStepForm from "@/components/contact/MultiStepForm";

export const metadata = {
  title: "Contacto | MESTIZZO",
  description: "Iniciemos una conversación. Transformamos tu visión en un legado digital.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-foreground text-white pt-32 pb-24 px-6 md:px-12 selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <p className="text-accent uppercase tracking-widest text-xs font-semibold mb-6">
            Contacto
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8">
            Comencemos <br className="hidden md:block" />
            <span className="font-medium">algo extraordinario.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-xl leading-relaxed">
            Ya sea que estés buscando rediseñar tu marca, lanzar una nueva plataforma o transformar tu presencia digital, estamos listos para escucharte.
          </p>
        </div>

        {/* Form */}
        <section className="border-t border-white/10 pt-16">
          <MultiStepForm />
        </section>
      </div>
    </main>
  );
}

