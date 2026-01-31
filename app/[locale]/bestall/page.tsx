"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
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
  Info,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import DatePicker from "@/components/DatePicker";
import {
  formatPrice,
  cn,
  getAvailablePickupDates,
  getAvailablePickupTimes,
  formatDate,
  getDayOfWeek,
} from "@/lib/utils";
import { createOrder } from "@/lib/orders";
import type { CustomerInfo, OrderItem } from "@/types";
import { dayLabels, dayLabelsEn, FETTISDAGEN_DATE, FETTISDAGEN_MIN_KREMLA } from "@/types";
import { useTranslations, useLocale } from "next-intl";
import { strong } from "framer-motion/client";

type Step = "cart" | "pickup" | "details" | "confirm";

export default function OrderPage() {
  const t = useTranslations('order');
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
  } = useCart();
  const locale = useLocale()
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
  const [totalPrice, setPrice] = useState(0);

  // Check if selected date is Fettisdagen
  const isFettisdagenSelected = pickupDate === FETTISDAGEN_DATE;

  const availableDates = getAvailablePickupDates(60);
  const availableTimes = pickupDate ? getAvailablePickupTimes(pickupDate) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, orderComplete]);

  // Defined inside component to use translations
  const steps: { id: Step; label: string; number: number }[] = [
    { id: "cart", label: t('steps.cart'), number: 1 },
    { id: "pickup", label: t('steps.pickup'), number: 2 },
    { id: "details", label: t('steps.details'), number: 3 },
    { id: "confirm", label: t('steps.confirm'), number: 4 },
  ];

  const unavailableItems = state.items.filter((item) => {
    if (!pickupDate) return false;
    const selectedDay = getDayOfWeek(pickupDate);

    // If availableDays is empty/undefined, it's available every day
    if (!item.product.availableDays || item.product.availableDays.length === 0) {
      return false;
    }
    return !item.product.availableDays.includes(selectedDay);
  });

  const hasAvailabilityConflict = unavailableItems.length > 0;
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case "cart":
        return state.items.length > 0;
      case "pickup":
        if (isFettisdagenSelected) return false;
        return pickupDate && pickupTime && !hasAvailabilityConflict;
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
     setPrice(totalAmount)
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
      setError(t('errors.submit_failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <section className="min-h-screen pt-40 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-4xl font-semibold text-white/80 mb-4">
              {t('success.title')}
            </h1>
            <p className="text-crust-200 mb-8 font-body">
              {t('success.message')}
            </p>

            <div className="bg-gray-600 rounded-sm p-6 mb-8 text-left">
              <h2 className="font-display text-xl text-white/80 mb-4">
                {t('success.details_title')}
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-crust-200">{t('success.labels.order_number')}</dt>
                  <dd className="text-white/80 font-medium">{orderId.slice(0, 8).toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-crust-200">{t('success.labels.pickup')}</dt>
                  <dd className="text-white/80">
                    {formatDate(pickupDate)} kl {pickupTime}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-crust-200">{t('success.labels.total')}</dt>
                  <dd className="text-white/80 font-medium">
                    {formatPrice(totalPrice)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-crust-900 border border-crust-200 rounded-lg p-4 mb-10">
              <p className="text-sm text-crust-200 font-body"  >
                {t.rich('confirm.payment_info',{
                  strong: (chunks)=><strong>{chunks}</strong>
                })}
                </p>
            </div>

            <Link href="/" className="btn-primary">
              {t('success.back_btn')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-36 pb-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 mt-8 max-sm:mt-4">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white/80 mb-4">
              {t('header.title')}
            </h1>
            <p className="text-crust-200">
              {t('header.subtitle')}
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
                      ? "bg-crust-900 text-crust-200"
                      : "bg-gray-600 text-white/70"
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
                    currentStepIndex >= index ? "text-white/80" : "text-white"
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
          <div className="w-full bg-gray-800 shadow-lg p-6 md:p-8 rounded-2xl">
            {/* Step 1: Cart */}
            {currentStep === "cart" && (
              <div>
                <h2 className="font-display text-2xl text-white/80 mb-6">
                  {t('cart.title')}
                </h2>

                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-crust-200 mx-auto mb-4" />
                    <p className="text-crust-200 mb-6">{t('cart.empty_title')}</p>
                    <Link href="/produkter" className="btn-secondary border-crust-200 text-crust-200 ">
                      {t('cart.empty_btn')}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4 ">
                    {state.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-4 bg-gray-700 rounded-lg max-sm:h-28"
                      >
                        <div className="w-16 h-16 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.image ? (
                            <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.nameSv} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🥖</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-white/80">
                            {item.product.nameSv}
                          </h3>
                          <p className="text-sm text-crust-200">
                            {formatPrice(item.product.price)} {t('cart.price_unit')}
                          </p>
                        </div>
                        <div className="grid grid-cols-2  gap-x-5 max-sm:gap-x-0 max-sm:grid-cols-2">
                          <div className="flex flex-col items-center max-sm:-mt-2  max-sm:h-24  "> <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 max-sm:w-8 flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-600 transition-colors "
                          >
                            <Plus className="w-4 h-4 text-white/70" />
                          </button>
                            <span className="w-8 text-center text-white max-sm:mt-2 max-sm:h-6  flex items-center justify-center">{item.quantity}</span>

                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 max-sm:w-8   flex items-center justify-center border border-gray-500 rounded-lg hover:bg-gray-600 transition-colors max-sm:mt-2"
                            >
                              <Minus className="w-4 h-4 text-white/70 " />
                            </button></div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors max-sm:ml-1 sm:mt-8 max-sm:mt-6"
                          >
                            <Trash2 className="w-4 h-4 max-sm:h-4 -mt-6" />
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
                <h2 className="font-display text-2xl text-white/80 mb-6">
                  {t('pickup.title')}
                </h2>

                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-amber-100 mb-3">
                      <Calendar className="w-4 h-4" />
                      {t('pickup.date_label')}
                    </label>
                    <DatePicker
                      selectedDate={pickupDate}
                      onSelectDate={(date: SetStateAction<string>) => {
                        setPickupDate(date as string);
                        setPickupTime("");
                      }}
                      availableDates={availableDates}
                    />
                  </div>
                  {/* AESTHETIC ALERT: Availability Conflict */}
                  {pickupDate && hasAvailabilityConflict && !isFettisdagenSelected && (
                    <div className="p-5 bg-red-950/30 border border-red-500/50 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-red-200 font-semibold mb-1 font-body max-sm:text-sm" >
                            {t('pickup.conflict.title')}
                          </h3>
                          <p className="text-sm text-red-300/80 mb-3 font-body max-sm:text-xs">
                            {t('pickup.conflict.description', { day: locale=="sv"?dayLabels[getDayOfWeek(pickupDate)]:dayLabelsEn[getDayOfWeek(pickupDate)] })}
                          </p>
                          <ul className="space-y-1">
                            {unavailableItems.map((item) => (
                              <li key={item.product.id} className="text-sm text-white flex items-center gap-2 font-body">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full " />
                                {item.product.nameSv}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-red-400/60 mt-4 italic font-body max-sm:text-xs">
                            {t('pickup.conflict.tip')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fettisdagen Warning */}
                  {isFettisdagenSelected && (
                    <div className="p-4 bg-gray-600 border border-crust-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="flex flex-row items-center">
                            <img src="/images/kremla.png" className="size-6 animate-bounce" alt="" />
                            <p className=" text-xl font-bold text-white  max-sm:text-base mb-2 font-display">
                              {t('pickup.fettisdagen.title')}
                            </p></div>
                          <p className="text-sm text-crust-200 max-sm:text-xs mb-3 font-body">
                            {t('pickup.fettisdagen.description', { date: formatDate(FETTISDAGEN_DATE), count: FETTISDAGEN_MIN_KREMLA })}
                          </p>
                          <Link
                            href="/fettisdagen"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-sm hover:bg-crust-900 hover:text-white  transition-colors max-sm:text-xs"
                          >
                            {t('pickup.fettisdagen.btn')}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time Selection - only show if NOT Fettisdagen */}
                  {pickupDate && !isFettisdagenSelected && !hasAvailabilityConflict && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-body text-amber-100 mb-3">
                        <Clock className="w-4 h-4" />
                        {t('pickup.time_label')}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setPickupTime(time)}
                            className={cn(
                              "px-4 py-3 rounded-lg text-sm font-body transition-colors",
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
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === "details" && (
              <div>
                <h2 className="font-display text-2xl text-white/80 mb-6">
                  {t('details.title')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-amber-100 mb-2">
                      <User className="w-4 h-4" />
                      {t('details.labels.name')}
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder={t('details.placeholders.name')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-amber-100 mb-2">
                      <Mail className="w-4 h-4" />
                      {t('details.labels.email')}
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder={t('details.placeholders.email')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-body text-amber-100 mb-2">
                      <Phone className="w-4 h-4" />
                      {t('details.labels.phone')}
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder={t('details.placeholders.phone')}
                      maxLength={10}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body text-amber-100 mb-2 block">
                      {t('details.labels.notes')}
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('details.placeholders.notes')}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === "confirm" && (
              <div>
                <h2 className="font-display text-2xl text-white/80 mb-6">
                  {t('confirm.title')}
                </h2>

                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-display text-lg text-white/80 mb-3 ">
                      {t('confirm.sections.products')}
                    </h3>
                    <ul className="space-y-2">
                      {state.items.map((item) => (
                        <li key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-gray-300">
                            {item.quantity}x {item.product.nameSv}
                          </span>
                          <span className="text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-600 mt-3 pt-3 flex justify-between font-medium text-white">
                      <span>{t('confirm.labels.total')}</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Pickup Details */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-display text-lg text-white/80 mb-3">
                      {t('confirm.sections.pickup')}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {formatDate(pickupDate)} kl {pickupTime}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Solrosgatan 11, Göteborg
                    </p>
                  </div>

                  {/* Customer Details */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-display text-lg text-white/80 mb-3">
                      {t('confirm.sections.contact')}
                    </h3>
                    <dl className="space-y-1 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-gray-400">{t('confirm.labels.name')}</dt>
                        <dd className="text-white">{customerInfo.name}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-gray-400">{t('confirm.labels.email')}</dt>
                        <dd className="text-white">{customerInfo.email}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-gray-400">{t('confirm.labels.phone')}</dt>
                        <dd className="text-white">{customerInfo.phone}</dd>
                      </div>
                      {notes && (
                        <div className="flex gap-2">
                          <dt className="text-gray-400">{t('confirm.labels.message')}</dt>
                          <dd className="text-white">{notes}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="bg-crust-900 border border-crust-200 rounded-lg p-4">
                    <p className="text-sm text-crust-200 font-body">
                      {t.rich('confirm.payment_info', {
                        strong: (chunks) => <strong className="font-semibold ">{chunks}</strong>
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('navigation.back')}
                </button>
              ) : (
                <Link
                  href="/produkter"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('navigation.continue_shopping')}
                </Link>
              )}

              <div className="flex items-center gap-4">
                {state.items.length > 0 && (
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{t('navigation.total_label')}</span>
                    <p className="font-display text-xl text-white">
                      {formatPrice(totalAmount)}
                    </p>
                  </div>
                )}

                {currentStep === "confirm" ? (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!canProceed() || isSubmitting}
                    className={cn(
                      "px-6 py-3 btn-primary bg-crust-900 hover:bg-crust-800 font-semibold rounded-lg transition-colors font-body",
                      canProceed() && !isSubmitting
                        ? "hover:bg-crust-800"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? t('navigation.submitting') : t('navigation.confirm_btn')}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 bg-crust-900 text-white font-semibold rounded-lg transition-colors font-body",
                      canProceed()
                        ? "hover:bg-crust-800"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {t('navigation.continue')}
                    <ArrowRight className="w-4 h-4" />
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