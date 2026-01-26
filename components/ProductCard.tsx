"use client";

import { Plus, Wheat } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured }: ProductCardProps) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <article
      className={cn(
        "product-card group",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-dough-100 to-dough-200",
          featured ? "aspect-square md:aspect-[4/3]" : "aspect-square"
        )}
      >
        {/* Placeholder with emoji - replace with actual images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("transition-transform duration-500 group-hover:scale-110", featured ? "text-8xl" : "text-6xl")}>
            <img src={product.image} alt="" />
            {/* {product.category === "bread" && "🍞"}
            {product.category === "pastry" && "🥐"}
            {product.category === "cookie" && "🍪"}
            {product.category === "cake" && "🍰"}
            {product.category === "seasonal" && "🌾"} */}
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
          <span className="badge badge-organic">Ekologisk</span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-4 right-4 z-10",
            "w-12 h-12 flex items-center justify-center",
            "bg-crust-900 text-flour-50 rounded-full",
            "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-300 ease-out",
            "hover:bg-crust-800 hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-crust-400 focus:ring-offset-2"
          )}
          aria-label={`Lägg till ${product.nameSv} i varukorg`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3
            className={cn(
              "font-display text-crust-900 leading-tight",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {product.nameSv}
          </h3>
          <span
            className={cn(
              "font-display text-crust-700 whitespace-nowrap",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <p
          className={cn(
            "text-crust-500 leading-relaxed mb-4",
            featured ? "text-base" : "text-sm",
            !featured && "line-clamp-2"
          )}
        >
          {product.descriptionSv}
        </p>

        {/* Allergens */}
        {product.allergens && product.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.allergens.map((allergen) => (
              <span
                key={allergen}
                className="text-xs text-crust-400 bg-flour-200 px-2 py-0.5 rounded-full"
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
          <p className="text-xs text-crust-400 mt-2">{product.weight}</p>
        )}
      </div>
    </article>
  );
}
