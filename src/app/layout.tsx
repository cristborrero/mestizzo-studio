import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
  adjustFontFallback: true,
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s — MESTIZZO Studio",
    default: "Digital Atelier para Marcas Premium — MESTIZZO Studio",
  },
  description: "Atelier digital boutique especializado en branding, diseño web, integración de IA y estrategia digital para marcas premium. Bogotá · Madrid · Miami · Atlanta.",
  metadataBase: new URL("https://mestizzo-studio.vercel.app"),
  openGraph: {
    siteName: "MESTIZZO Studio",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["es_ES", "en_US"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://mestizzo-studio.vercel.app/#organization",
  "name": "MESTIZZO Studio",
  "alternateName": "MESTIZZO Digital Atelier",
  "url": "https://mestizzo-studio.vercel.app",
  "description": "Atelier digital boutique especializado en branding, diseño web, integración de IA y estrategia digital para marcas premium. Bogotá · Madrid · Miami · Atlanta.",
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bogotá",
    "addressCountry": "CO",
  },
  "areaServed": [
    { "@type": "City", "name": "Bogotá", "addressCountry": "CO" },
    { "@type": "City", "name": "Madrid", "addressCountry": "ES" },
    { "@type": "City", "name": "Barcelona", "addressCountry": "ES" },
    { "@type": "City", "name": "Miami", "addressCountry": "US" },
    { "@type": "City", "name": "Atlanta", "addressCountry": "US" },
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://mestizzo-studio.vercel.app/contact",
    "availableLanguage": ["Spanish", "English"],
  },
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios MESTIZZO Studio",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Strategy", "url": "https://mestizzo-studio.vercel.app/servicios/branding" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Boutique", "url": "https://mestizzo-studio.vercel.app/servicios/web" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration", "url": "https://mestizzo-studio.vercel.app/servicios/ai" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Growth", "url": "https://mestizzo-studio.vercel.app/servicios/growth" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Media Production", "url": "https://mestizzo-studio.vercel.app/servicios/media" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Animación & 3D", "url": "https://mestizzo-studio.vercel.app/servicios/animacion" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fontHeading.variable} ${fontSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
