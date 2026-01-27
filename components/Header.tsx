"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import { cn } from "@/lib/utils";
import { addProductstoDb } from "@/lib/orders";
import { products } from "@/lib/data";
import { getProducts } from "@/lib/product";
import FettisdagenBanner from "./FettisdagenBanner";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/produkter", label: "Produkter" },
  { href: "/bestall", label: "Beställ" },
  { href: "/om-oss", label: "Om Oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

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
            ? "bg-flour-50/95 backdrop-blur-md shadow-sm py-0"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
            >
              <span className="font-display text-3xl md:text-4xl font-semibold text-crust-900 tracking-tight">
                Lilla Sur
              </span>
              <span className="block text-xs font-body tracking-[0.3em] uppercase text-crust-500 mt-0.5 group-hover:text-crust-700 transition-colors">
                Hantverksbageri
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm tracking-wide text-crust-700 link-underline hover:text-crust-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2 text-crust-700 hover:text-crust-900 transition-colors"
                aria-label="Öppna varukorg"
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
                className="lg:hidden p-2 text-crust-700 hover:text-crust-900 transition-colors"
                aria-label={isMobileMenuOpen ? "Stäng meny" : "Öppna meny"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-flour-50/98 backdrop-blur-lg border-t border-flour-200 transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body text-lg text-crust-700 hover:text-crust-900 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <FettisdagenBanner></FettisdagenBanner>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
