import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MESTIZZO Studio | Cotizador",
  description: "Configure su presupuesto a medida. Servicios de branding, desarrollo web, marketing digital y más.",
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
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} ${fontSans.variable} ${fontHeading.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <body className={`${fontHeading.variable} ${fontBody.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
