"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import { cn } from "@/lib/utils";
import FettisdagenBanner from "./FettisdagenBanner";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  // Defined inside component to use translations
  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/produkter", label: t('nav.products') },
    { href: "/bestall", label: t('nav.order') },
    { href: "/om-oss", label: t('nav.about') },
    { href: "/kontakt", label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ",
          isScrolled
            ? "bg-black backdrop-blur-md shadow-sm py-0"
            : "bg-black py-0"
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
            >
              <div className="grid grid-cols-2 grid-rows-1 ">
                <img
                  src="/images/logo-white.png"
                  alt={t('logo_alt')}
                  className="h-24 w-36 -ml-5 max-sm:h-16 max-sm:w-20 max-sm:-ml-2 object-cover"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-lg tracking-wide text-amber-100 link-underline hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
                {/* <LocaleSwitcher></LocaleSwitcher> */}
            </div>
           

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
               <LocaleSwitcher></LocaleSwitcher>
              <button
                onClick={openCart}
                className="relative p-2 text-amber-100 hover:text-white/80 transition-colors"
                aria-label={t('actions.open_cart')}
              >
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-crust-800 text-flour-50 text-xs font-body rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-amber-100 hover:text-white/80 transition-colors"
                aria-label={isMobileMenuOpen ? t('actions.close_menu') : t('actions.open_menu')}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6 " />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-black-50/98 backdrop-blur-lg border-t border-flour-200 transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container bg-black/90 mx-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body  text-lg text-amber-100 hover:text-white/80 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <FettisdagenBanner />
         
      </header>
     
      {/* Cart Drawer */}
      
      <CartDrawer />
    </>
  );
}