"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    Calendar,
    User,
    Check,
    AlertCircle,
    Minus,
    Plus,
    Info,
} from "lucide-react";
import {
    formatPrice,
    cn,
    getAvailablePickupTimes,
    formatDate,
} from "@/lib/utils";
import { createOrder } from "@/lib/orders";
import { getProducts } from "@/lib/product";
import type { Product, CustomerInfo, OrderItem } from "@/types";
import { FETTISDAGEN_DATE, FETTISDAGEN_MIN_KREMLA } from "@/types";
import { useTranslations } from "next-intl";

export default function FettisdagenPage() {
    const t = useTranslations('fettisdagen');
    const [kremlaProduct, setKremlaProduct] = useState<Product | null>(null);
    
    // Split quantity state
    const [quantities, setQuantities] = useState({
        mandel: FETTISDAGEN_MIN_KREMLA, // Default to min amount of original
        vanilj: 0
    });
    
    const [loading, setLoading] = useState(true);
    const [pickupTime, setPickupTime] = useState("");
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: "",
        email: "",
        phone: "",
    });
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

    const availableTimes = getAvailablePickupTimes(FETTISDAGEN_DATE);

    useEffect(() => {
        async function fetchKremla() {
            try {
                const products = await getProducts();
                const kremla = products.find(
                    (p) => p.isFettisdagen || p.nameSv.toLowerCase().includes("semla") || p.nameSv.toLowerCase().includes("kremla")
                );
                if (kremla) {
                    setKremlaProduct(kremla);
                }
            } catch (err) {
                console.error("Error fetching kremla:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchKremla();
    }, []);

    useEffect(() => {
        window.scroll({ top: 0 });
    }, [orderComplete]);

    const totalQuantity = quantities.mandel + quantities.vanilj;
    const totalAmount = kremlaProduct ? kremlaProduct.price * totalQuantity : 0;

    const updateQuantity = (type: 'mandel' | 'vanilj', delta: number) => {
        setQuantities(prev => {
            const newValue = Math.max(0, prev[type] + delta);
            return { ...prev, [type]: newValue };
        });
    };

    const canSubmit = () => {
        return (
            kremlaProduct &&
            totalQuantity >= FETTISDAGEN_MIN_KREMLA &&
            pickupTime &&
            customerInfo.name.trim() &&
            customerInfo.email.includes("@") &&
            customerInfo.phone.trim()
        );
    };

    const handleSubmitOrder = async () => {
        if (!canSubmit() || !kremlaProduct) return;

        setIsSubmitting(true);
        setError("");

        try {
            const orderItems: OrderItem[] = [];

            if (quantities.mandel > 0) {
                orderItems.push({
                    productId: kremlaProduct.id,
                    productName: `${kremlaProduct.nameSv} (Mandel)`,
                    quantity: quantities.mandel,
                    price: kremlaProduct.price,
                });
            }

            if (quantities.vanilj > 0) {
                orderItems.push({
                    productId: kremlaProduct.id,
                    productName: `${kremlaProduct.nameSv} (Vanilj)`,
                    quantity: quantities.vanilj,
                    price: kremlaProduct.price,
                });
            }

            const newOrderId = await createOrder({
                items: orderItems,
                customer: customerInfo,
                pickupDate: FETTISDAGEN_DATE,
                pickupTime,
                status: "pending",
                totalAmount,
                notes: notes || "",
                isFettisdagenOrder: true,
            });

            setOrderId(newOrderId);
            setOrderComplete(true);
        } catch (err) {
            console.error("Order error:", err);
            setError(t('error.submit_failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const fettisdagenFormatted = formatDate(FETTISDAGEN_DATE);

    // Helper component for the product thumbnail image
    const ProductThumbnail = () => (
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-500 rounded-lg overflow-hidden flex-shrink-0 border border-gray-600/50">
            {kremlaProduct?.image ? (
                <img
                    src={kremlaProduct.image}
                    alt={kremlaProduct.nameSv}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🥯</div>
            )}
        </div>
    );

    if (orderComplete) {
        return (
            <section className="min-h-screen py-48 bg-black">
                <div className="container mx-auto px-6">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="font-display text-4xl font-semibold text-white mb-4">
                            {t('success.title')}
                        </h1>
                        <p className="text-crust-200 mb-8 font-body">
                            {t('success.message')}
                        </p>

                        <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
                            <h2 className="font-display text-xl text-white/80 mb-4">
                                {t('success.details_title')}
                            </h2>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between font-body">
                                    <dt className="text-crust-200">{t('success.labels.order_number')}</dt>
                                    <dd className="text-white/80 font-medium">{orderId.slice(0, 8).toUpperCase()}</dd>
                                </div>
                                <div className="flex justify-between font-body border-b border-gray-700 pb-2">
                                    <dt className="text-crust-200">{t('success.labels.product')}</dt>
                                    <dd className="text-white/80 text-right">
                                        {quantities.mandel > 0 && <div>{quantities.mandel}x Mandel</div>}
                                        {quantities.vanilj > 0 && <div>{quantities.vanilj}x Vanilj</div>}
                                    </dd>
                                </div>
                                <div className="flex justify-between font-body pt-2">
                                    <dt className="text-crust-200">{t('success.labels.pickup')}</dt>
                                    <dd className="text-white/80">
                                        {fettisdagenFormatted} kl {pickupTime}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-crust-200">{t('success.labels.total')}</dt>
                                    <dd className="text-white/80 font-medium font-body">
                                        {formatPrice(totalAmount)}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4 mb-8">
                            <p className="text-sm font-body text-crust-200" >
                                {t.rich('success.payment_note', {
                                    strong: (chunks) => <strong>{chunks}</strong>
                                })}
                            </p>
                        </div>

                        <Link href="/" className="btn-primary bg-crust-900 hover:bg-crust-800">
                            {t('success.back_home')}
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-48 pb-20 bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-crust-200 hover:text-amber-900 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('back_link')}
                    </Link>

                    {/* Header */}
                    <div className="relative text-center mb-12">
                        <img src="/images/kremla.png" className="absolute inset-x-1/2 size-28 max-sm:size-12 animate-bounce" alt="" />
                        <h1 className="py-24 max-sm:py-12 font-display text-4xl md:text-5xl font-semibold text-white">
                            {t('hero.title')} {new Date(FETTISDAGEN_DATE).getFullYear()}
                        </h1>
                        <p className="text-crust-200 text-lg -mt-12 sm:-mt-20" >
                            {t.rich('hero.subtitle', {
                                date: fettisdagenFormatted,
                                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
                            })}
                        </p>
                    </div>

                    {/* Info box */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-8 flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-crust-200">
                            <p className="font-medium mb-1">{t('info.title')}</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    {t.rich('info.min_order', {
                                        count: FETTISDAGEN_MIN_KREMLA,
                                        strong: (chunks) => <strong>{chunks}</strong>
                                    })}
                                </li>
                                <li>{t('info.pickup_only', { date: fettisdagenFormatted })}</li>
                                <li>{t('info.payment')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Order Form */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-crust-200">
                        {loading ? (
                            <div className="text-center py-12 text-crust-200">
                                {t('loading')}
                            </div>
                        ) : !kremlaProduct ? (
                            <div className="text-center py-12">
                                <p className="text-crust-200">
                                    {t('unavailable')}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Product & Quantity Selection */}
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <h2 className="font-display text-2xl text-white/80">
                                            {t('steps.quantity.title')}
                                        </h2>
                                        <span className={cn(
                                            "text-sm font-medium transition-colors duration-300",
                                            totalQuantity >= FETTISDAGEN_MIN_KREMLA ? "text-crust-400" : "text-red-400"
                                        )}>
                                            {t('steps.quantity.total_label')} {totalQuantity}
                                        </span>
                                    </div>
                                    <p className="text-sm text-crust-200 mb-6 -mt-2">
                                        {t('steps.quantity.subtitle', { count: FETTISDAGEN_MIN_KREMLA })}
                                    </p>
                                    
                                    {/* Updated aesthetic layout with integrated images */}
                                    <div className="space-y-3">
                                        {/* Row 1: Mandel */}
                                        <div className={cn(
                                            "flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
                                            quantities.mandel > 0 ? "bg-gray-700/80 ring-1 ring-amber-400/20" : "bg-gray-700/40 hover:bg-gray-700/60"
                                        )}>
                                            <div className="flex items-center gap-4 sm:gap-5">
                                                <ProductThumbnail />
                                                <div>
                                                    <h3 className="font-display text-lg sm:text-xl text-white/90 group-hover:text-white transition-colors">
                                                        {t('steps.quantity.variant_mandel')}
                                                    </h3>
                                                    <p className="text-sm text-crust-200 font-body">
                                                        {formatPrice(kremlaProduct.price)} {t('steps.quantity.price_unit')}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Vertical Controls */}
                                            <div className="flex flex-col items-center gap-1 bg-gray-800/50 p-1 rounded-lg border border-gray-600/50">
                                                <button
                                                    onClick={() => updateQuantity('mandel', 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-gray-600 transition-colors active:scale-95"
                                                    aria-label="Increase Mandel quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-white font-medium text-lg py-0.5 font-body tabular-nums">
                                                    {quantities.mandel}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity('mandel', -1)}
                                                    className={cn(
                                                        "w-8 h-8 flex items-center justify-center rounded-md transition-colors active:scale-95",
                                                        quantities.mandel === 0 
                                                            ? "text-gray-500 cursor-not-allowed" 
                                                            : "text-white/70 hover:text-white hover:bg-gray-600"
                                                    )}
                                                    aria-label="Decrease Mandel quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Row 2: Vanilj */}
                                        <div className={cn(
                                            "flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
                                            quantities.vanilj > 0 ? "bg-gray-700/80 ring-1 ring-amber-400/20" : "bg-gray-700/40 hover:bg-gray-700/60"
                                        )}>
                                            <div className="flex items-center gap-4 sm:gap-5">
                                                <ProductThumbnail />
                                                <div>
                                                    <h3 className="font-display text-lg sm:text-xl text-white/90 group-hover:text-white transition-colors">
                                                        {t('steps.quantity.variant_vanilj')}
                                                    </h3>
                                                    <p className="text-sm text-crust-200 font-body">
                                                        {formatPrice(kremlaProduct.price)} {t('steps.quantity.price_unit')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Vertical Controls */}
                                            <div className="flex flex-col items-center gap-1 bg-gray-800/50 p-1 rounded-lg border border-gray-600/50">
                                                <button
                                                    onClick={() => updateQuantity('vanilj', 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-gray-600 transition-colors active:scale-95"
                                                    aria-label="Increase Vanilj quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-white font-medium text-lg py-0.5 font-body tabular-nums">
                                                    {quantities.vanilj}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity('vanilj', -1)}
                                                    className={cn(
                                                        "w-8 h-8 flex items-center justify-center rounded-md transition-colors active:scale-95",
                                                        quantities.vanilj === 0 
                                                            ? "text-gray-500 cursor-not-allowed" 
                                                            : "text-white/70 hover:text-white hover:bg-gray-600"
                                                    )}
                                                    aria-label="Decrease Vanilj quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {totalQuantity < FETTISDAGEN_MIN_KREMLA && (
                                        <p className="text-amber-400 text-sm mt-4 flex items-center gap-2 animate-pulse">
                                            <AlertCircle className="w-4 h-4" />
                                            {t('steps.quantity.min_error', { count: FETTISDAGEN_MIN_KREMLA })}
                                            <span className="opacity-80 font-medium">
                                                ({t('steps.quantity.total_label')} {totalQuantity})
                                            </span>
                                        </p>
                                    )}
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <h2 className="font-display text-2xl text-white/80 mb-6">
                                        <Calendar className="w-5 h-5 inline mr-2" />
                                        {t('steps.time.title')}
                                    </h2>
                                    <p className="text-sm text-crust-200 mb-3 font-body">
                                        {t('steps.time.date_label')} <strong>{fettisdagenFormatted}</strong>
                                    </p>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {availableTimes.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setPickupTime(time)}
                                                className={cn(
                                                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border",
                                                    pickupTime === time
                                                        ? "bg-amber-100 border-amber-200 text-gray-900 shadow-sm scale-[1.02]"
                                                        : "bg-gray-700 border-gray-600 text-white/80 hover:bg-gray-600 hover:border-gray-500"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div>
                                    <h2 className="font-display text-2xl text-white/80 mb-6">
                                        <User className="w-5 h-5 inline mr-2" />
                                        {t('steps.customer.title')}
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                {t('steps.customer.labels.name')}
                                            </label>
                                            <input
                                                type="text"
                                                value={customerInfo.name}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                                                }
                                                placeholder={t('steps.customer.placeholders.name')}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                {t('steps.customer.labels.email')}
                                            </label>
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                                                }
                                                placeholder={t('steps.customer.placeholders.email')}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                {t('steps.customer.labels.phone')}
                                            </label>
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                maxLength={10}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                                                }
                                                placeholder={t('steps.customer.placeholders.phone')}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                {t('steps.customer.labels.notes')}
                                            </label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder={t('steps.customer.placeholders.notes')}
                                                rows={2}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary & Submit */}
                 <div className="border-t border-amber-200 pt-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-sm text-crust-200">{t('summary.total_label')}</p>
                                            <p className="font-display text-3xl text-white/80">
                                                {formatPrice(totalAmount)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleSubmitOrder}
                                            disabled={!canSubmit() || isSubmitting}
                                            className={cn(
                                                "px-8 py-4 bg-crust-900 text-white font-semibold rounded-lg transition-colors",
                                                canSubmit() && !isSubmitting
                                                    ? "hover:bg-crust-800"
                                                    : "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? t('summary.submitting') : t('summary.submit_btn')}
                                        </button>
                                    </div>
                                    <p className="text-xs text-crust-200 text-center">
                                        {t('summary.disclaimer')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}