"use client";

import { Plus, Wheat, Calendar } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, DayOfWeek } from "@/types";
import { dayLabels } from "@/types";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  showAvailableDays?: boolean;
}

// Short day labels for display
const shortDayLabels: Record<DayOfWeek, string> = {
  monday: "Mån",
  tuesday: "Tis",
  wednesday: "Ons",
  thursday: "Tor",
  friday: "Fre",
  saturday: "Lör",
  sunday: "Sön",
};

export default function ProductCard({ product, featured, showAvailableDays }: ProductCardProps) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  // Format available days for display
  const formatAvailableDays = (days?: DayOfWeek[]): string | null => {
    if (!days || days.length === 0 || days.length === 7) return null; // All days
    return days.map(d => shortDayLabels[d]).join(", ");
  };

  const availableDaysText = formatAvailableDays(product.availableDays);

  return (
    <article
      className={cn(
        "product-card group rounded-3xl",
        featured && "md:col-span-2 md:row-span-2 rounded-3xl"
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-dough-100 to-dough-200",
          featured ? "aspect-square" : "aspect-square"
        )}
      >
        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("transition-transform duration-500 group-hover:scale-110", featured ? "text-8xl" : "text-6xl")}>
            <img src={product.image} className="relative object-fill" alt={product.nameSv} />
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.featured && (
            <span className="badge badge-featured">
              <Wheat className="w-3 h-3 mr-1" />
              Populär
            </span>
          )}
          {product.specialType === "week" && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full font-medium">
              Veckans special
            </span>
          )}
          {product.specialType === "day" && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
              Dagens special
            </span>
          )}
          {product.isFettisdagen && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-medium">
              🥯 Fettisdagen
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-5 right-4 z-10",
            "w-20 h-10 flex items-center justify-center rounded-md",
            "bg-crust-900 text-flour-50",
            "opacity-100 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-300 ease-out",
            "hover:bg-crust-800 hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-crust-400 focus:ring-offset-2"
          )}
          aria-label={`Lägg till ${product.nameSv} i varukorg`}
        >
          Lägg till
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3
            className={cn(
              "font-display text-white/80 leading-tight",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {product.nameSv}
          </h3>
          <span
            className={cn(
              "font-display text-amber-100 whitespace-nowrap",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <p
          className={cn(
            "text-crust-200 leading-relaxed mb-4 font-body",
            featured ? "text-base" : "text-sm",
            !featured && "line-clamp-2"
          )}
        >
          {product.descriptionSv}
        </p>

        {/* Available Days as Tags */}
        {showAvailableDays && product.availableDays && product.availableDays.length > 0 && product.availableDays.length < 7 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="w-3 h-3 text-amber-200" />
              <span className="text-xs text-amber-200">Tillgänglig:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as DayOfWeek[]).map((day) => {
                const isAvailable = product.availableDays?.includes(day);
                return (
                  <span
                    key={day}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-500 line-through"
                    )}
                  >
                    {shortDayLabels[day]}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Min Order - for Fettisdagen products */}
        {product.minOrder && product.minOrder > 1 && (
          <div className="mb-3 text-xs text-amber-300">
            Min. beställning: {product.minOrder} st
          </div>
        )}

        {/* Allergens */}
        {product.allergens && product.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.allergens.map((allergen) => (
              <span
                key={allergen}
                className="text-xs text-white bg-gray-500 px-2 py-0.5 rounded-full"
              >
                {allergen === "gluten" && "Gluten"}
                {allergen === "dairy" && "Mjölk"}
                {allergen === "eggs" && "Ägg"}
                {allergen === "almonds" && "Mandel"}
                {allergen === "oats" && "Havre"}
                {allergen === "coconut" && "Kokos"}
              </span>
            ))}
          </div>
        )}

        {/* Weight indicator */}
        {product.weight && (
          <p className="text-xs text-white mt-2">{product.weight}</p>
        )}
      </div>
    </article>
  );
}