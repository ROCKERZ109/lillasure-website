import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FettisdagenBanner from "@/components/FettisdagenBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lilla Sur | Göteborgs Hantverksbageri",
  description:
    "Ekologiskt stenugnsbageri i Kålltorp, Göteborg. Vi bakar alla bröd för hand på 100% ekologiskt och KRAV-märkt svenskt mjöl. Beställ online för avhämtning.",
  keywords: [
    "bageri",
    "göteborg",
    "surdeg",
    "ekologiskt",
    "bröd",
    "bullar",
    "kålltorp",
    "hantverksbageri",
  ],
  openGraph: {
    title: "Lilla Sur | Göteborgs Hantverksbageri",
    description:
      "Ekologiskt stenugnsbageri i Kålltorp. Handgjorda bröd bakat på 100% ekologiskt mjöl.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col ">
        
        <CartProvider>
          <Header  />
          <main className="flex-1 ">{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
