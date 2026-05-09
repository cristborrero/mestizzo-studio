import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "MESTIZZO Studio",
  url: "https://mestizzo.studio",
  logo: "https://mestizzo.studio/logo/logo-mestizzo.svg",
  description: "Estudio digital boutique en Bogotá. Identidades de marca premium y experiencias web a medida para founders que construyen para perdurar.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  sameAs: [],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mestizzo.studio"),
  title: {
    template: "%s — MESTIZZO Studio",
    default: "Digital Atelier para Marcas Premium — MESTIZZO Studio",
  },
  description: "Estudio digital boutique en Bogotá. Identidades de marca premium y experiencias web a medida para founders que construyen para perdurar.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://mestizzo.studio",
    siteName: "MESTIZZO Studio",
    title: "Digital Atelier para Marcas Premium — MESTIZZO Studio",
    description: "Estudio digital boutique en Bogotá. Identidades de marca premium y experiencias web a medida para founders que construyen para perdurar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Atelier para Marcas Premium — MESTIZZO Studio",
    description: "Estudio digital boutique en Bogotá. Identidades de marca premium y experiencias web a medida para founders que construyen para perdurar.",
  },
  icons: {
    icon: "/favicon.svg",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
