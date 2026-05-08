'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

import Image from "next/image";

const navLinks = [
  { href: "/quote", label: "Cotizador" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative h-7 w-36">
            <Image 
              src="/logo/logo-mestizzo.svg" 
              alt="MESTIZZO Studio" 
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] border border-border bg-background text-foreground rounded-full hover:border-accent hover:text-accent transition-all duration-300">
            Iniciar Proyecto
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">

          <button
            className="p-1 text-foreground"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-0 bg-background z-40 p-8 pt-32 flex flex-col gap-12"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-black uppercase tracking-[0.2em] text-secondary hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent text-white text-xs font-black uppercase tracking-[0.3em] rounded-full">
                Iniciar Proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
