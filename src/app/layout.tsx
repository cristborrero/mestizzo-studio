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

export const metadata: Metadata = {
  title: "MESTIZZO Studio | Digital Atelier",
  description: "Boutique digital studio crafting high-end brand identities and immersive web experiences.",
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
        {children}
      </body>
    </html>
  );
}
