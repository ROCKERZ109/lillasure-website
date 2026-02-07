"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types";
import { useLocale, useTranslations } from "next-intl";

interface VariantSelectorProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function VariantSelector({ product, isOpen, onClose }: VariantSelectorProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const { addItem, openCart } = useCart();
    const locale = useLocale();
    const t = useTranslations('variant_selector');

    if (!isOpen) return null;

    const handleAddToCart = () => {
        if (!selectedVariant) return;

        const variantName = locale === "sv" ? selectedVariant.nameSv : selectedVariant.name;

        addItem(product, selectedVariant.id, variantName);
        openCart();
        onClose();
        setSelectedVariant(null);
    };

    const getVariantPrice = (variant: ProductVariant) => {
        return product.price + (variant.priceDiff || 0);
    };

    const variantLabel = locale === "sv"
        ? (product.variantLabelSv || "Välj variant")
        : (product.variantLabel || "Select option");

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-neutral-900 rounded-2xl max-w-md w-full p-6 border border-neutral-800">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                {locale === "sv" ? product.nameSv : product.name}
                            </h3>
                            <p className="text-crust-400 font-medium mt-1">
                                {t('from')} {formatPrice(product.price)}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Variant Selection */}
                    <div className="mb-6">
                        <label className="block text-sm text-neutral-400 mb-3">{variantLabel}</label>
                        <div className="grid grid-cols-2 gap-3">
                            {product.variants?.map((variant) => {
                                const isSelected = selectedVariant?.id === variant.id;
                                const variantPrice = getVariantPrice(variant);

                                return (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        disabled={!variant.available}
                                        className={cn(
                                            "p-4 rounded-xl border-2 transition-all text-left",
                                            isSelected
                                                ? "border-crust-500 bg-crust-500/10"
                                                : variant.available
                                                    ? "border-neutral-700 hover:border-neutral-600 "
                                                    : "border-neutral-800 opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <p className="font-medium text-white ont-body">
                                            {locale === "sv" ? variant.nameSv : variant.name}
                                        </p>
                                        <p className="text-sm text-crust-400 mt-1 ont-body">
                                            {formatPrice(variantPrice)}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedVariant}
                        className={cn(
                            "w-full py-4 rounded-xl font-semibold transition-all",
                            selectedVariant
                                ? "bg-crust-900 text-white/90 hover:bg-crust-800 font-body"
                                : "bg-neutral-800 text-neutral-500 cursor-not-allowed font-body"
                        )}
                    >
                        {selectedVariant
                            ? `${t('add_to_cart')} - ${formatPrice(getVariantPrice(selectedVariant))}`
                            : t('select_variant')}
                    </button>
                </div>
            </div>
        </>
    );
}