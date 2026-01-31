import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FettisdagenBanner from "@/components/FettisdagenBanner";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import FettisdagenPopup from "@/components/FettisdagenPopup";

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
    "Stenugnsbageri i Kålltorp, Göteborg. Vi bakar alla bröd för hand på svenskt mjöl. Beställ online för avhämtning.",
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
      "Stenugnsbageri i Kålltorp. Handgjorda bröd bakat på svenskt mjöl.",
    type: "website",
    locale: "sv_SE",
  },
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {


  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // FETCH MESSAGES - This is what was likely missing!
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${cormorant.variable} ${lato.variable}`}>

      <body className="min-h-screen flex flex-col ">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <Header />

            <FettisdagenPopup />
            <main className="flex-1 ">{children}</main>

            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
