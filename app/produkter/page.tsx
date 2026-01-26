"use client";

import { useState } from "react";
import { Wheat, Cookie, Cake, Coffee, MenuSquare,  } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, getProductsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

const categories: { id: ProductCategory | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Alla", icon: <MenuSquare className="w-4 h-4" /> },
  { id: "bread", label: "Bröd", icon: <Wheat className="w-4 h-4" /> },
  { id: "pastry", label: "Bakverk", icon: <Coffee className="w-4 h-4" /> },
  // { id: "cookie", label: "Kakor", icon: <Cookie className="w-4 h-4" /> },
  // { id: "cake", label: "Tårtor", icon: <Cake className="w-4 h-4" /> },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const filteredProducts =
    activeCategory === "all"
      ? products.filter((p) => p.available)
      : getProductsByCategory(activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dough-100 to-flour-50 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block">
              Vårt Sortiment
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-crust-900 mb-6">
              Produkter
            </h1>
            <p className="text-crust-600 leading-relaxed text-lg">
              Alla våra produkter bakas dagligen på 100% ekologiskt och 
              KRAV-märkt svenskt mjöl. Välj bland surdegsbröd, bullar, 
              kakor och annat gott.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-flour-50">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-wide transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-crust-900 text-flour-50 shadow-lg shadow-crust-900/20"
                    : "bg-flour-200 text-crust-700 hover:bg-flour-300"
                )}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-crust-500 text-lg">
                Inga produkter hittades i denna kategori.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-dough-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-crust-700">
              <span className="text-2xl">🌾</span>
              <span className="font-body text-sm">100% Ekologiskt</span>
            </div>
            <div className="flex items-center gap-2 text-crust-700">
              <span className="text-2xl">🔥</span>
              <span className="font-body text-sm">Stenugnsbakat</span>
            </div>
            <div className="flex items-center gap-2 text-crust-700">
              <span className="text-2xl">✋</span>
              <span className="font-body text-sm">Handgjort</span>
            </div>
            <div className="flex items-center gap-2 text-crust-700">
              <span className="text-2xl">🇸🇪</span>
              <span className="font-body text-sm">Svenskt mjöl</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
