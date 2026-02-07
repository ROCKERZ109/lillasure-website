"use client";

import { MapPin, Clock, Mail, Instagram, Phone } from "lucide-react";
import { bakeryInfo, storeHours, storeHoursEn } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();

  // Define FAQ items using translations
  const faqItems = [
    {
      question: t('faq.items.corporate.question'),
      answer: t('faq.items.corporate.answer'),
    },
    {
      question: t('faq.items.gluten.question'),
      answer: t('faq.items.gluten.answer'),
    },
    {
      question: t('faq.items.shelf_life.question'),
      answer: t('faq.items.shelf_life.answer'),
    },
    {
      question: t('faq.items.reserve.question'),
      answer: t('faq.items.reserve.answer'),
    }
    // {
    //   question: t('faq.items.closed_days.question'),
    //   answer: t('faq.items.closed_days.answer'),
    // },
  ];

  // Helper to get tips array safely
  const tips = [0, 1, 2, 3].map((index) => t(`info.tips.items.${index}`));

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-black">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4 block mt-10">
              {t('hero.subtitle')}
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-crust-200 leading-relaxed text-lg font-body">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>
      <hr />

      {/* Contact Info */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Info Cards */}
            <div className="space-y-6">
              {/* Location */}
              <div className="bg-gray-800 rounded-sm p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/80">
                      {t('info.address_title')}
                    </h2>
                    <p className="text-sm text-crust-200">{t('info.address_subtitle')}</p>
                  </div>
                </div>
                <address className="not-italic text-crust-200 leading-relaxed mb-4">
                  {bakeryInfo.address.street}
                  <br />
                  {bakeryInfo.address.postalCode} {bakeryInfo.address.city}
                  <br />
                  {bakeryInfo.address.country}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-crust-400 hover:text-crust-600 transition-colors font-body"
                >
                  {t('info.open_map')}
                </a>
              </div>

              {/* Hours */}
              <div className="bg-gray-800 rounded-sm p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/70">
                      {t('info.hours_title')}
                    </h2>
                    <p className="text-sm text-crust-200">
                      {t('info.hours_subtitle')}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {locale == "sv" ? storeHours.map((hours) => (
                    <li
                      key={hours.day}
                      className="flex justify-between py-2 border-b border-flour-200 last:border-0"
                    >
                      <span className="text-crust-200">{hours.day}</span>
                      <span
                        className={
                          hours.closed
                            ? "text-white"
                            : "text-white/80 font-medium"
                        }
                      >
                        {hours.closed ? t('info.closed') : `${hours.open} – ${hours.close}`}
                      </span>
                    </li>
                  )) : storeHoursEn.map((hours) => (
                    <li
                      key={hours.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-flour-400">{hours.day}</span>
                      <span className={hours.closed ? "text-white"   : "text-white/80 font-medium"}>
                        {hours.closed ? t('info.closed') : `${hours.open} - ${hours.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="">
              <div className="bg-gray-800 rounded-sm overflow-hidden max-sm:-mt-4">
                {/* Map placeholder - replace with actual map */}
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <MapPin className="max-sm:w-10 max-sm:h-10 w-16 h-16 text-white mb-4" />
                  <h3 className="font-display max-sm:text-xl text-2xl text-white/80 mb-2">
                    {t('info.map_placeholder.title')}
                  </h3>
                  <p className="text-crust-200 mb-6 max-sm:text-sm font-body">
                    {t('info.map_placeholder.description')}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {t('info.map_placeholder.button')}
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-6 bg-gray-800 rounded-sm">
                <h3 className="font-display text-lg text-white/80 mb-2">
                  {t('info.tips.title')}
                </h3>
                <ul className="text-sm text-crust-200 space-y-2 font-body">
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Contact Methods */}
              <div className="mt-6 p-6 bg-gray-800 rounded-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/80">
                      {t('info.contact_title')}
                    </h2>
                    <p className="text-sm text-crust-200">{t('info.contact_subtitle')}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a
                    href={`mailto:${bakeryInfo.contact.email}`}
                    className="flex items-center gap-3 text-crust-200 hover:text-white/80 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    {bakeryInfo.contact.email}
                  </a>
                  <a
                    href={`https://instagram.com/${bakeryInfo.contact.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-crust-200 hover:text-white/80 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                    {bakeryInfo.contact.instagram}
                  </a>
                  <a
                    href={`https://instagram.com/${bakeryInfo.contact.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-crust-200 hover:text-white/80 transition-colors"
                  >
                    {/* <Phone className="w-5 h-5 text-white" />
                    {bakeryInfo.contact.phone} */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-800 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white/80 mb-12 text-center">
              {t('faq.title')}
            </h2>

            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-600 rounded-sm p-6 transition-all duration-300 hover:shadow-md"
                >
                  <h3 className="font-display text-xl font-bold text-white/80 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-crust-200 max-sm:text-sm font-body leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}