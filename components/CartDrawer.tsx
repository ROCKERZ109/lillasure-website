"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Helper: Get item price with variant
const getItemPrice = (item: { product: any; variantId?: string }) => {
  const basePrice = item.product.price;
  if (item.variantId && item.product.variants) {
    const variant = item.product.variants.find((v: any) => v.id === item.variantId);
    return basePrice + (variant?.priceDiff || 0);
  }
  return basePrice;
};

export default function CartDrawer() {
  const t = useTranslations('cart_drawer');
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
          "fixed top-0 right-0 h-full w-full max-w-md bg-black shadow-2xl z-50 transition-transform duration-500 ease-out flex flex-col", // ✅ Added flex flex-col
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-flour-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-crust-200" />
            <h2 className="font-display text-2xl text-white/80">{t('header.title')}</h2>
            <span className="text-sm text-crust-200">
              ({totalItems} {totalItems === 1 ? t('header.item_one') : t('header.item_other')})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-crust-200 hover:text-white/80 transition-colors"
            aria-label={t('header.close_aria')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-flour-400 mb-4" strokeWidth={1} />
              <p className="font-display text-xl text-white/80 mb-2">
                {t('empty.title')}
              </p>
              <p className="text-sm text-crust-200 mb-6">
                {t('empty.subtitle')}
              </p>
              <Link
                href="/produkter"
                onClick={closeCart}
                className="btn-secondary hover:bg-white hover:text-black border-crust-200 text-sm text-crust-200"
              >
                {t('empty.btn')}
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => {
                const itemPrice = getItemPrice(item);
                const itemKey = item.variantId 
                  ? `${item.product.id}-${item.variantId}` 
                  : item.product.id;

                return (
                  <li
                    key={itemKey}
                    className="flex gap-4 p-4 bg-gray-800 rounded-sm"
                  >
                    {/* Product Image */}
                    <div className="w-14  bg-transparent rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">
                        <img
                          src={item.product.image}
                          className="rounded-sm sm:rounded-md object-fill"
                          alt={item.product.nameSv}
                        />
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-white/80 truncate">
                        {item.product.nameSv}
                      </h3>
                      {/* Show variant name */}
                      {item.variantName && (
                        <p className="text-sm text-amber-400 mb-1">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-sm text-crust-200 mb-2">
                        {formatPrice(itemPrice)} {t('item.price_suffix')}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.variantId)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100 transition-colors"
                            aria-label={t('item.decrease_aria')}
                          >
                            <Minus className="w-4 h-4 text-white/70 hover:text-black" />
                          </button>
                          <span className="w-8 text-center font-body text-crust-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.variantId)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100 transition-colors"
                            aria-label={t('item.increase_aria')}
                          >
                            <Plus className="w-4 h-4 text-white/70 hover:text-black" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.variantId)}
                          className="p-2 text-white hover:text-red-600 transition-colors"
                          aria-label={t('item.remove_aria')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer - Fixed */}
        {state.items.length > 0 && (
          <div className="flex-shrink-0 p-6 bg-black border-t border-flour-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-lg text-crust-200">{t('footer.total')}</span>
              <span className="font-display text-2xl text-white/80">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <Link
              href="/bestall"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              {t('footer.checkout_btn')}
            </Link>
            <p className="text-xs text-center text-white mt-3">
              {t('footer.disclaimer')}
            </p>
          </div>
        )}
      </div>
    </>
  );
}