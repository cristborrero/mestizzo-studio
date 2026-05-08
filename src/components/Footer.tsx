import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <div className="relative h-5 w-28 mb-2">
            <Image 
              src="/logo/logo-mestizzo.svg" 
              alt="MESTIZZO Studio" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
            © {new Date().getFullYear()} MESTIZZO Studio. All Rights Reserved.
          </p>
        </div>

        <nav className="flex items-center gap-4 text-xs text-secondary">
          <Link href="/quote" className="transition-colors hover:text-foreground">Cotizador</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">Contacto</Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">Privacidad</Link>
        </nav>
      </div>
    </footer>
  );
}
