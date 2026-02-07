"use client";

import { Link } from "@/i18n/navigation";
import { Instagram, Mail, MapPin, Clock } from "lucide-react";
import { bakeryInfo, storeHours, storeHoursEn } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  // Define nav links inside component to use translations
  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/produkter", label: t('nav.products') },
    { href: "/bestall", label: t('nav.order') },
    { href: "/om-oss", label: t('nav.about') },
    { href: "/kontakt", label: t('nav.contact') },
  ];

  return (
    <footer className="bg-gray-950 text-flour-100">
      <hr />
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-sm:gap-12 sm:gap-24 md:gap-40">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className=" relative inline-block mb-0">
              <img src="/images/logo-white.png" className="sm:size-48 max-sm:size-32" alt="Lilla Sur Logo" />
              {/* Curved Text Area */}
              {/* Position absolute karke logo ke upar overlay kiya hai, thoda neeche shift karke */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] pointer-events-none z-20 animate-spin-slow">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Path Breakdown for Circle Bottom:
        M 50,150  -> Start point (Left side, middle height)
        A 100,100 -> Radius X, Radius Y (Jitna bada number, utna flat curve)
        0 0,0     -> Rotation and Flags (Standard curve settings)
        250,150   -> End point (Right side, middle height)
        
        Isse ek "U" shape ya "Bowl" shape banti hai jo circle ke neeche fit hoti hai.
      */}
                  <path
                    id="circle-path"
                    d="M 65,150 A 80,125 0 0,0 225,15"
                    fill="transparent"
                  />

                  <text className="font-century tracking-[12px]  text-[17px] max-sm:text-[14px]" fill="white">
                    {/* startOffset="50%" text ko exact center-bottom mein rakhega */}
                    <textPath href="#circle-path"   textAnchor="start" >
                      {t('tagline')}
                    </textPath>
                  </text>
                </svg>
              </div>
            </Link>

            <p className="text-sm text-flour-300 leading-relaxed mb-6">
              {t('brand_description')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://instagram.com/${bakeryInfo.contact.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-flour-700 rounded-full hover:bg-flour-800 hover:border-flour-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${bakeryInfo.contact.email}`}
                className="w-10 h-10 flex items-center justify-center border border-flour-700 rounded-full hover:bg-flour-800 hover:border-flour-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          {/* <div>
            <h3 className="font-display text-lg text-flour-50 mb-6">{t('nav.title')}</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-flour-400 hover:text-flour-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg text-flour-50 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {t('hours.title')}
            </h3>
            <ul className="space-y-2">
              {locale == "sv" ? storeHours.map((hours) => (
                <li
                  key={hours.day}
                  className="flex justify-between text-sm"
                >
                  <span className="text-flour-400">{hours.day}</span>
                  <span className={hours.closed ? "text-flour-500" : "text-flour-200"}>
                    {hours.closed ? t('hours.closed') : `${hours.open} - ${hours.close}`}
                  </span>
                </li>
              )) : storeHoursEn.map((hours) => (
                <li
                  key={hours.day}
                  className="flex justify-between text-sm"
                >
                  <span className="text-flour-400">{hours.day}</span>
                  <span className={hours.closed ? "text-flour-500" : "text-flour-200"}>
                    {hours.closed ? t('hours.closed') : `${hours.open} - ${hours.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-flour-50 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t('contact.title')}
            </h3>
            <address className="not-italic text-sm text-flour-300 leading-relaxed mb-4">
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
              className="inline-flex items-center gap-2 text-sm text-wheat-400 hover:text-wheat-300 transition-colors"
            >
              {t('contact.map_link')}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-flour-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-flour-500">
              {t('bottom.copyright', { year: currentYear })}
            </p>
            {/* <div className="flex items-center gap-1 text-xs text-flour-600">
              <span>{t('bottom.tags.organic')}</span>
              <span className="mx-2">•</span>
              <span>{t('bottom.tags.krav')}</span>
              <span className="mx-2">•</span>
              <span>{t('bottom.tags.handmade')}</span>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="border-t border-flour-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-flour-500">
              {t('bottom.copyright', { year: currentYear })}
            </p>
            {/* <div className="flex items-center gap-1 text-xs text-flour-600">
              <span>{t('bottom.tags.organic')}</span>
              <span className="mx-2">•</span>
              <span>{t('bottom.tags.krav')}</span>
              <span className="mx-2">•</span>
              <span>{t('bottom.tags.handmade')}</span>
            </div> */}
      {/* </div>
        </div>
      </div> */}
    </footer>
  );
}