"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Wheat, Cookie, Coffee, Sparkles, MenuSquare, Calendar, Pizza } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory, DayOfWeek } from "@/types";
import { dayLabels, dayLabelsEn } from "@/types";
import { getProducts } from "@/lib/product";
import Shimmer from "@/components/Shimmer";
import { useLocale, useTranslations } from "next-intl";

// Static config for icons and IDs
const categoryConfig: { id: ProductCategory | "all"; icon: React.ReactNode }[] = [
  { id: "all", icon: <MenuSquare className="w-4 h-4" /> },
  { id: "bread", icon: <Wheat className="w-4 h-4" /> },
  { id: "pastry", icon: <Coffee className="w-4 h-4" /> },
  { id: "cookie", icon: <Cookie className="w-4 h-4" /> },
  { id: "dough", icon: <Pizza className="w-4 h-4" /> },
];

// Get current day of week
function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[new Date().getDay()];
}

// Check if product is available on a given day
function isProductAvailableOnDay(product: Product, day: DayOfWeek): boolean {
  if (!product.availableDays || product.availableDays.length === 0) {
    return true;
  }
  return product.availableDays.includes(day);
}

function ProductsContent() {
  const t = useTranslations('products');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [highlightSemla, setHighlightSemla] = useState(false);
  const [productsList, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyToday, setShowOnlyToday] = useState(false);

  const currentDay = getCurrentDay();

  // Map translations to categories
  const categories = categoryConfig.map(cat => ({
    ...cat,
    label: t(`filters.categories.${cat.id}`)
  }));

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();

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
    if (a.specialType === "week" && b.specialType !== "week") return -1;
    if (b.specialType === "week" && a.specialType !== "week") return 1;

    if (a.specialType === "day" && b.specialType !== "day") return -1;
    if (b.specialType === "day" && a.specialType !== "day") return 1;

    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;

    if (highlightSemla) {
      if (a.name.toUpperCase() === "SEMLA") return -1;
      if (b.name.toUpperCase() === "SEMLA") return 1;
    }

    return 0;
  });

  const weekSpecials = productsList.filter((p) => p.specialType === "week" && p.available);
  const daySpecials = productsList.filter((p) => p.specialType === "day" && p.available);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4 block mt-10">
              {t('hero.subtitle')}
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white/80 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-crust-200 leading-relaxed text-lg font-body">
              {t('hero.description')}
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
                  <h2 className="text-xl font-display text-purple-400">{t('specials.week')}</h2>
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
                  <h2 className="text-xl font-display text-blue-400">{t('specials.day')}</h2>
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
              {showOnlyToday
                ? `${t('filters.available_today')} (${locale == "sv" ? dayLabels[currentDay] : dayLabelsEn[currentDay]})`
                : t('filters.show_today')}
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
                  ? t('empty.no_today', { day: locale == "sv" ? dayLabels[currentDay] : dayLabelsEn[currentDay] })
                  : t('empty.no_category')
                }
              </p>
              {showOnlyToday && (
                <button
                  onClick={() => { setShowOnlyToday(false); setActiveCategory("all") }}
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {t('empty.reset_btn')}
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

            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">🔥</span>
              <span className="font-body text-sm">{t('features.stone_baked')}</span>
            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">✋</span>
              <span className="font-body text-sm">{t('features.handmade')}</span>
            </div>
            <div className="flex items-center gap-2 secondary text-white/70">
              <span className="text-2xl">🇸🇪</span>
              <span className="font-body text-sm">{t('features.swedish_flour')}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  // We need to fetch translations for the Suspense fallback too if we want it fully localized,
  // but hook usage inside fallback is tricky. Hardcoding or using a separate client wrapper is common.
  // For simplicity, I'll keep "Laddar..." or you can pass a prop.
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center">Laddar...</div>}>
      <ProductsContent />
    </Suspense>
  );
}