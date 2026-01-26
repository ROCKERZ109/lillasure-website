"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Check,
  AlertCircle,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import {
  formatPrice,
  cn,
  getAvailablePickupDates,
  getAvailablePickupTimes,
  formatDate,
} from "@/lib/utils";
import { createOrder } from "@/lib/orders";
import type { CustomerInfo, OrderItem } from "@/types";

type Step = "cart" | "pickup" | "details" | "confirm";

export default function OrderPage() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<Step>("cart");
  const [pickupDate, setPickupDate] = useState("");
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

  const availableDates = getAvailablePickupDates(14);
  const availableTimes = pickupDate ? getAvailablePickupTimes(pickupDate) : [];

  const steps: { id: Step; label: string; number: number }[] = [
    { id: "cart", label: "Varukorg", number: 1 },
    { id: "pickup", label: "Avhämtning", number: 2 },
    { id: "details", label: "Uppgifter", number: 3 },
    { id: "confirm", label: "Bekräfta", number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case "cart":
        return state.items.length > 0;
      case "pickup":
        return pickupDate && pickupTime;
      case "details":
        return (
          customerInfo.name.trim() &&
          customerInfo.email.includes("@") &&
          customerInfo.phone.trim()
        );
      case "confirm":
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleSubmitOrder = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const orderItems: OrderItem[] = state.items.map((item) => ({
        productId: item.product.id,
        productName: item.product.nameSv,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const newOrderId = await createOrder({
        items: orderItems,
        customer: customerInfo,
        pickupDate,
        pickupTime,
        status: "pending",
        totalAmount,
        notes: notes || "",
      });

      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      setError(
        "Det gick inte att skicka beställningen. Kontrollera att du har internetanslutning och försök igen."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-dough-100 to-flour-50">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-4xl font-semibold text-crust-900 mb-4">
              Tack för din beställning!
            </h1>
            <p className="text-crust-600 mb-8">
              Din beställning har mottagits och vi börjar förbereda den.
              Du får en bekräftelse via email.
            </p>

            <div className="bg-flour-100 rounded-sm p-6 mb-8 text-left">
              <h2 className="font-display text-xl text-crust-900 mb-4">
                Beställningsdetaljer
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-crust-500">Ordernummer</dt>
                  <dd className="text-crust-900 font-medium">{orderId.slice(0, 8).toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-crust-500">Avhämtning</dt>
                  <dd className="text-crust-900">
                    {formatDate(pickupDate)} kl {pickupTime}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-crust-500">Totalt</dt>
                  <dd className="text-crust-900 font-medium">
                    {formatPrice(totalAmount)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-wheat-100 rounded-sm p-4 mb-8">
              <p className="text-sm text-wheat-800">
                <strong>Obs!</strong> Betalning sker vid avhämtning i butiken.
                Vi tar emot kort och Swish.
              </p>
            </div>

            <Link href="/" className="btn-primary">
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-dough-100 to-flour-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-crust-900 mb-4">
              Beställning
            </h1>
            <p className="text-crust-600">
              Fyll i din beställning och välj tid för avhämtning
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-body text-sm transition-colors",
                    currentStepIndex >= index
                      ? "bg-crust-900 text-flour-50"
                      : "bg-flour-300 text-crust-500"
                  )}
                >
                  {currentStepIndex > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    "hidden sm:block ml-3 text-sm font-body",
                    currentStepIndex >= index ? "text-crust-900" : "text-crust-400"
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                      currentStepIndex > index ? "bg-crust-900" : "bg-flour-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-flour-50 rounded-sm shadow-lg p-6 md:p-8">
            {/* Step 1: Cart */}
            {currentStep === "cart" && (
              <div>
                <h2 className="font-display text-2xl text-crust-900 mb-6">
                  Din varukorg
                </h2>

                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-flour-400 mx-auto mb-4" />
                    <p className="text-crust-500 mb-6">Din varukorg är tom</p>
                    <Link href="/produkter" className="btn-secondary">
                      Se produkter
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-4 bg-flour-100 rounded-sm"
                      >
                        <div className="w-16 h-16 bg-flour-200 rounded-sm flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🥖</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-crust-900">
                            {item.product.nameSv}
                          </h3>
                          <p className="text-sm text-crust-500">
                            {formatPrice(item.product.price)} st
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-crust-200 rounded-sm hover:bg-crust-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-crust-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Pickup */}
            {currentStep === "pickup" && (
              <div>
                <h2 className="font-display text-2xl text-crust-900 mb-6">
                  Välj avhämtning
                </h2>

                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-crust-700 mb-3">
                      <Calendar className="w-4 h-4" />
                      Välj datum
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableDates.slice(0, 9).map((date) => (
                        <button
                          key={date}
                          onClick={() => {
                            setPickupDate(date);
                            setPickupTime("");
                          }}
                          className={cn(
                            "px-4 py-3 rounded-sm text-sm font-body transition-colors",
                            pickupDate === date
                              ? "bg-crust-900 text-flour-50"
                              : "bg-flour-200 text-crust-700 hover:bg-flour-300"
                          )}
                        >
                          {new Date(date).toLocaleDateString("sv-SE", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {pickupDate && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-body text-crust-700 mb-3">
                        <Clock className="w-4 h-4" />
                        Välj tid
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setPickupTime(time)}
                            className={cn(
                              "px-4 py-3 rounded-sm text-sm font-body transition-colors",
                              pickupTime === time
                                ? "bg-crust-900 text-flour-50"
                                : "bg-flour-200 text-crust-700 hover:bg-flour-300"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === "details" && (
              <div>
                <h2 className="font-display text-2xl text-crust-900 mb-6">
                  Dina uppgifter
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-crust-700 mb-2">
                      <User className="w-4 h-4" />
                      Namn
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      placeholder="Ditt namn"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-crust-700 mb-2">
                      <Mail className="w-4 h-4" />
                      E-post
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      placeholder="din@email.se"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-crust-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      placeholder="07X XXX XX XX"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body text-crust-700 mb-2 block">
                      Meddelande (valfritt)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Allergier eller andra önskemål..."
                      rows={3}
                      className="input-field resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === "confirm" && (
              <div>
                <h2 className="font-display text-2xl text-crust-900 mb-6">
                  Bekräfta beställning
                </h2>

                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-flour-100 rounded-sm p-4">
                    <h3 className="font-display text-lg text-crust-900 mb-3">
                      Produkter
                    </h3>
                    <ul className="space-y-2">
                      {state.items.map((item) => (
                        <li
                          key={item.product.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-crust-700">
                            {item.quantity}x {item.product.nameSv}
                          </span>
                          <span className="text-crust-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-flour-300 mt-3 pt-3 flex justify-between font-medium">
                      <span>Totalt</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Pickup Details */}
                  <div className="bg-flour-100 rounded-sm p-4">
                    <h3 className="font-display text-lg text-crust-900 mb-3">
                      Avhämtning
                    </h3>
                    <p className="text-sm text-crust-700">
                      {formatDate(pickupDate)} kl {pickupTime}
                    </p>
                    <p className="text-sm text-crust-500 mt-1">
                      Solrosgatan 11, Göteborg
                    </p>
                  </div>

                  {/* Customer Details */}
                  <div className="bg-flour-100 rounded-sm p-4">
                    <h3 className="font-display text-lg text-crust-900 mb-3">
                      Kontaktuppgifter
                    </h3>
                    <dl className="space-y-1 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-crust-500">Namn:</dt>
                        <dd className="text-crust-900">{customerInfo.name}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-crust-500">E-post:</dt>
                        <dd className="text-crust-900">{customerInfo.email}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-crust-500">Telefon:</dt>
                        <dd className="text-crust-900">{customerInfo.phone}</dd>
                      </div>
                      {notes && (
                        <div className="flex gap-2">
                          <dt className="text-crust-500">Meddelande:</dt>
                          <dd className="text-crust-900">{notes}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="bg-wheat-100 rounded-sm p-4">
                    <p className="text-sm text-wheat-800">
                      <strong>Betalning:</strong> Betalning sker vid avhämtning
                      i butiken. Vi tar emot kort och Swish.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-flour-200">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-crust-600 hover:text-crust-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tillbaka
                </button>
              ) : (
                <Link
                  href="/produkter"
                  className="inline-flex items-center gap-2 text-crust-600 hover:text-crust-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Fortsätt handla
                </Link>
              )}

              <div className="flex items-center gap-4">
                {state.items.length > 0 && (
                  <div className="text-right">
                    <span className="text-sm text-crust-500">Totalt</span>
                    <p className="font-display text-xl text-crust-900">
                      {formatPrice(totalAmount)}
                    </p>
                  </div>
                )}

                {currentStep === "confirm" ? (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!canProceed() || isSubmitting}
                    className={cn(
                      "btn-primary",
                      (!canProceed() || isSubmitting) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? "Skickar..." : "Bekräfta beställning"}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={cn(
                      "btn-primary group",
                      !canProceed() && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Fortsätt
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
