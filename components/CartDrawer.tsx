"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, cn } from "@/lib/utils";

export default function CartDrawer() {
  const {
    state,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalAmount,
  } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-crust-950/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-black shadow-2xl z-50 transition-transform duration-500 ease-out",
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-flour-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-crust-200" />
            <h2 className="font-display text-2xl text-white/80">Varukorg</h2>
            <span className="text-sm text-crust-200">
              ({totalItems} {totalItems === 1 ? "vara" : "varor"})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-crust-200 hover:text-white/80 transition-colors"
            aria-label="Stäng varukorg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 h-[calc(100%-200px)] scrollbar-thin">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-flour-400 mb-4" strokeWidth={1} />
              <p className="font-display text-xl text-white/80 mb-2">
                Din varukorg är tom
              </p>
              <p className="text-sm text-crust-200 mb-6">
                Utforska våra nybakade produkter
              </p>
              <Link
                href="/produkter"
                onClick={closeCart}
                className="btn-secondary hover:bg-white hover:text-black border-crust-200 text-sm text-crust-200"
              >
                Se produkter
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-gray-800  rounded-sm"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-14 h-14 bg-flour-200 rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl"><img src={item.product.image} className="rounded-sm sm:rounded-md object-fill" /></span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-white/80 truncate">
                      {item.product.nameSv}
                    </h3>
                    <p className="text-sm text-crust-200 mb-2">
                      {formatPrice(item.product.price)} st
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100 transition-colors"
                          aria-label="Minska antal"
                        >
                          <Minus className="w-4 h-4 text-white/70 hover:text-black" />
                        </button>
                        <span className="w-8 text-center font-body  text-crust-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100 transition-colors"
                          aria-label="Öka antal"
                        >
                          <Plus className="w-4 h-4  text-white/70 hover:text-black" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-white hover:text-red-600 transition-colors"
                        aria-label="Ta bort"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black border-t border-flour-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-lg text-crust-200">Totalt</span>
              <span className="font-display text-2xl text-white/80">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <Link
              href="/bestall"
              onClick={closeCart}
              className="btn-primary w-full text-center"
            >
              Gå till beställning
            </Link>
            <p className="text-xs text-center text-white mt-3">
              Beställningar hämtas i butiken
            </p>
          </div>
        )}
      </div>
    </>
  );
}
