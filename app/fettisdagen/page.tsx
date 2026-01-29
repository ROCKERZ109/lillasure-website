"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
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

export default function FettisdagenPage() {
    const [kremlaProduct, setKremlaProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(FETTISDAGEN_MIN_KREMLA);
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

    // Fetch kremla/semla product
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
    useEffect(()=>{
            window.scroll({top:0})
    },[orderComplete]);

    const totalAmount = kremlaProduct ? kremlaProduct.price * quantity : 0;

    const canSubmit = () => {
        return (
            kremlaProduct &&
            quantity >= FETTISDAGEN_MIN_KREMLA &&
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
            const orderItems: OrderItem[] = [
                {
                    productId: kremlaProduct.id,
                    productName: kremlaProduct.nameSv,
                    quantity: quantity,
                    price: kremlaProduct.price,
                },
            ];

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
            setError(
                "Det gick inte att skicka beställningen. Försök igen."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format the date nicely
    const fettisdagenFormatted = formatDate(FETTISDAGEN_DATE);

    // Order Complete View
    if (orderComplete) {
        return (
            <section className="min-h-screen  py-48 bg-black">
                <div className="container mx-auto px-6">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="font-display text-4xl font-semibold text-white mb-4">
                            Tack för din Fettisdagen-beställning!
                        </h1>
                        <p className="text-crust-200 mb-8 font-body">
                            Vi ser fram emot att baka dina semlor. Glöm inte att hämta dem på Fettisdagen!
                        </p>

                        <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
                            <h2 className="font-display text-xl text-white/80 mb-4">
                                Beställningsdetaljer
                            </h2>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between font-body">
                                    <dt className="text-crust-200">Ordernummer</dt>
                                    <dd className="text-white/80 font-medium">{orderId.slice(0, 8).toUpperCase()}</dd>
                                </div>
                                <div className="flex justify-between font-body">
                                    <dt className="text-crust-200">Produkt</dt>
                                    <dd className="text-white/80">{quantity}x {kremlaProduct?.nameSv}</dd>
                                </div>
                                <div className="flex justify-between font-body">
                                    <dt className="text-crust-200">Avhämtning</dt>
                                    <dd className="text-white/80">
                                        {fettisdagenFormatted} kl {pickupTime}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-crust-200">Totalt</dt>
                                    <dd className="text-white/80 font-medium font-body">
                                        {formatPrice(totalAmount)}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4 mb-8">
                            <p className="text-sm font-body text-crust-200">
                                <strong>Obs!</strong> Betalning sker vid avhämtning i butiken.
                            </p>
                        </div>

                        <Link href="/" className="btn-primary bg-crust-900 hover:bg-crust-800">
                            Tillbaka till startsidan
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
                        Tillbaka
                    </Link>

                    {/* Header */}
                    <div className="relative text-center mb-12 ">

                        <img src="/images/kremla.png" className="absolute inset-x-1/2 size-28 max-sm:size-12 animate-bounce" alt="" />

                        <h1 className="py-24 max-sm:py-12 font-display text-4xl md:text-5xl font-semibold text-white ">
                            Fettisdagen {new Date(FETTISDAGEN_DATE).getFullYear()}
                        </h1>
                        <p className="text-crust-200 text-lg -mt-12 sm:-mt-20">
                            Förbeställ dina semlor till <strong>{fettisdagenFormatted}</strong>
                        </p>
                    </div>

                    {/* Info box */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-8 flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm  text-crust-200">
                            <p className="font-medium mb-1">Viktigt att veta:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Minsta beställning: <strong>{FETTISDAGEN_MIN_KREMLA} semlor</strong></li>
                                <li>Endast avhämtning på Fettisdagen ({fettisdagenFormatted})</li>
                                <li>Betalning sker i butiken vid avhämtning</li>
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
                                Laddar...
                            </div>
                        ) : !kremlaProduct ? (
                            <div className="text-center py-12">
                                <p className="text-crust-200">
                                    Semlor är inte tillgängliga för beställning just nu.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8 ">
                                {/* Product */}
                                <div>
                                    <h2 className="font-display text-2xl text-white/80 mb-6">
                                        1. Välj antal semlor
                                    </h2>
                                    <div className="flex items-center gap-6 p-4 bg-gray-600 rounded-lg">
                                        <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                            {kremlaProduct.image ? (
                                                <img
                                                    src={kremlaProduct.image}
                                                    alt={kremlaProduct.nameSv}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                                    🥯
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display text-lg text-white/70">
                                                {kremlaProduct.nameSv}
                                            </h3>
                                            <p className="text-sm text-crust-200">
                                                {formatPrice(kremlaProduct.price)} / st
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 max-sm:grid max-sm:grid-rows-3 max-sm:grid-cols-2">
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-8 h-8 max-sm:h-7 max-sm:w-7 flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-600 transition-colors "
                                            >
                                                <Plus className="w-4 h-4 text-crust-200" />
                                            </button>
                                            <span className="w-8 text-center font-semibold text-white/80 max-sm:text-sm text-xl ">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(Math.max(FETTISDAGEN_MIN_KREMLA, quantity - 1))}
                                                className="w-8 h-8 max-sm:h-7 max-sm:w-7 flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-600 transition-colors "
                                            >
                                                <Minus className="w-4 h-4 text-crust-200" />
                                            </button>


                                        </div>
                                    </div>
                                    {quantity < FETTISDAGEN_MIN_KREMLA && (
                                        <p className="text-red-600 text-sm mt-2">
                                            Minsta beställning är {FETTISDAGEN_MIN_KREMLA} semlor
                                        </p>
                                    )}
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <h2 className="font-display text-2xl text-white/80 mb-6">
                                        <Calendar className="w-5 h-5 inline mr-2" />
                                        2. Välj tid för avhämtning
                                    </h2>
                                    <p className="text-sm text-crust-200 mb-3 font-body">
                                        Datum: <strong>{fettisdagenFormatted}</strong>
                                    </p>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {availableTimes.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setPickupTime(time)}
                                                className={cn(
                                                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                                    pickupTime === time
                                                        ? "bg-white text-gray-900"
                                                        : "bg-gray-700 text-white/80 hover:bg-gray-600"
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
                                        3. Dina uppgifter
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                Namn *
                                            </label>
                                            <input
                                                type="text"
                                                value={customerInfo.name}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                                                }
                                                placeholder="Ditt namn"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                E-post *
                                            </label>
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                                                }
                                                placeholder="din@email.se"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                Telefon *
                                            </label>
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                maxLength={10}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                                                }
                                                placeholder="07X XXX XX XX"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-crust-200 mb-1">
                                                Ytterligare kommentarer (valfritt)
                                            </label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Allergier eller andra önskemål..."
                                                rows={2}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary & Submit */}
                                <div className="border-t border-amber-200 pt-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-sm text-crust-200">Totalt att betala</p>
                                            <p className="font-display text-3xl text-white/80">
                                                {formatPrice(totalAmount)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleSubmitOrder}
                                            disabled={!canSubmit() || isSubmitting}
                                            className={cn(
                                                "px-8 py-4 bg-white text-black font-semibold rounded-lg transition-colors",
                                                canSubmit() && !isSubmitting
                                                    ? "hover:bg-gray-800 "
                                                    : "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? "Skickar..." : "Beställ semlor"}
                                        </button>
                                    </div>
                                    <p className="text-xs text-crust-200 text-center">
                                        Genom att beställa godkänner du att betala vid avhämtning
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
