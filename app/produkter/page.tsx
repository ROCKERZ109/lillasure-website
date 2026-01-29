"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Wheat, Cookie, Cake, Coffee, Sparkles, MenuSquare, Calendar } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, getProductsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory, DayOfWeek } from "@/types";
import { dayLabels } from "@/types";
import { getProducts } from "@/lib/product";
import Shimmer from "@/components/Shimmer";

const categories: { id: ProductCategory | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Alla", icon: <MenuSquare className="w-4 h-4" /> },
  { id: "bread", label: "Bröd", icon: <Wheat className="w-4 h-4" /> },
  { id: "pastry", label: "Bakverk", icon: <Coffee className="w-4 h-4" /> },
  { id: "cookie", label: "Kakor", icon: <Cookie className="w-4 h-4" /> },
];

// Get current day of week
function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[new Date().getDay()];
}

// Check if product is available on a given day
function isProductAvailableOnDay(product: Product, day: DayOfWeek): boolean {
  // If no availableDays set, product is available all days
  if (!product.availableDays || product.availableDays.length === 0) {
    return true;
  }
  return product.availableDays.includes(day);
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [highlightSemla, setHighlightSemla] = useState(false);
  const [productsList, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyToday, setShowOnlyToday] = useState(false);
  
  const currentDay = getCurrentDay();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();

    const kategori = searchParams.get("kategori");
    if (kategori === "semla") {
      setHighlightSemla(true);
      setActiveCategory("pastry");
      setTimeout(() => {
        document.getElementById("semla")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [searchParams]);

  // Filter by category
  let filteredProducts =
    activeCategory === "all"
      ? productsList.filter((p) => p.available)
      : getProductsByCategory(activeCategory, productsList);

  // Filter by today's availability if toggle is on
  if (showOnlyToday) {
    filteredProducts = filteredProducts.filter((p) => isProductAvailableOnDay(p, currentDay));
  }

  // Sort: specials first, then featured, then rest
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Week specials first
    if (a.specialType === "week" && b.specialType !== "week") return -1;
    if (b.specialType === "week" && a.specialType !== "week") return 1;
    
    // Day specials second
    if (a.specialType === "day" && b.specialType !== "day") return -1;
    if (b.specialType === "day" && a.specialType !== "day") return 1;
    
    // Featured third
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    
    // Semla highlight
    if (highlightSemla) {
      if (a.name.toUpperCase() === "SEMLA") return -1;
      if (b.name.toUpperCase() === "SEMLA") return 1;
    }
    
    return 0;
  });

  // Get specials for display
  const weekSpecials = productsList.filter((p) => p.specialType === "week" && p.available);
  const daySpecials = productsList.filter((p) => p.specialType === "day" && p.available);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4 block mt-10">
              Vårt Sortiment
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white/80 mb-6">
              Produkter
            </h1>
            <p className="text-crust-200 leading-relaxed text-lg font-body">
              Alla våra produkter bakas dagligen på 100% ekologiskt och 
              KRAV-märkt svenskt mjöl. Välj bland surdegsbröd, bullar, 
              kakor och annat gott.
            </p>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      {(weekSpecials.length > 0 || daySpecials.length > 0) && (
        <section className="pb-8 bg-black">
          <div className="container mx-auto px-6">
            {/* Week Special */}
            {weekSpecials.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-display text-purple-400">Veckans special</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weekSpecials.map((product) => (
                    <div key={product.id} className="ring-2 ring-purple-500 rounded-lg">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day Special */}
            {daySpecials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-display text-blue-400">Dagens special</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daySpecials.map((product) => (
                    <div key={product.id} className="ring-2 ring-blue-500 rounded-lg">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 ">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 max-sm:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center max-sm:items-center md:justify-start gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-wide transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-crust-900 text-flour-50 shadow-lg shadow-crust-900/20"
                      : "bg-gray-600 text-white/70 hover:bg-gray-500"
                  )}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            {/* Today's availability toggle */}
            <button
              onClick={() => setShowOnlyToday(!showOnlyToday)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors max-sm:w-60 max-sm:text-xs",
                showOnlyToday
                  ? "bg-crust-900 text-white/70"
                  : "bg-gray-600 text-white/70 hover:bg-gray-600"
              )}
            >
              <Calendar className="w-4 h-4" />
              {showOnlyToday ? `Tillgängligt idag (${dayLabels[currentDay]})` : "Visa endast dagens produkter"}
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </>
            ) : (
              sortedProducts.map((product) => (
                <div
                  key={product.id}
                  id={product.id}
                  className={cn(
                    highlightSemla && product.name.toUpperCase() === "SEMLA" && "ring-4 ring-amber-400 ring-offset-4 rounded-sm"
                  )}
                >
                  <ProductCard product={product} showAvailableDays />
                </div>
              ))
            )}
          </div>

          {/* Empty State */}
          {!loading && sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-crust-200 text-lg">
                {showOnlyToday 
                  ? `Inga produkter tillgängliga idag (${dayLabels[currentDay]}). Prova att visa alla produkter.`
                  : "Inga produkter hittades i denna kategori."
                }
              </p>
              {showOnlyToday && (
                <button
                  onClick={() => setShowOnlyToday(false)}
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Visa alla produkter
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <hr />

      {/* Info Banner */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">🌾</span>
              <span className="font-body text-sm">100% Ekologiskt</span>
            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">🔥</span>
              <span className="font-body text-sm">Stenugnsbakat</span>
            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">✋</span>
              <span className="font-body text-sm">Handgjort</span>
            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">🇸🇪</span>
              <span className="font-body text-sm">Svenskt mjöl</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center">Laddar...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
