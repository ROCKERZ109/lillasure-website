"use client";

import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useState } from "react";
import { FETTISDAGEN_DATE } from "@/types";
import { useTranslations } from "next-intl";

export default function FettisdagenBanner() {
  const t = useTranslations('fettisdagen.banner');
  const [isVisible, setIsVisible] = useState(true);

  // Check if Fettisdagen has passed
  const today = new Date();
  const fettisdagen = new Date(FETTISDAGEN_DATE);
  const isPast = today > fettisdagen;

  // Don't show banner if Fettisdagen has passed
  if (!isVisible || isPast) return null;

  // Calculate days until Fettisdagen
  const daysUntil = Math.ceil((fettisdagen.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Logic to determine text
  const isCountdownMode = daysUntil <= 7 && daysUntil > 0;

  let bannerText;
  if (isCountdownMode) {
    // Handle singular/plural
    bannerText = daysUntil === 1
      ? t('countdown_one', { days: daysUntil })
      : t('countdown', { days: daysUntil });
  } else {
    bannerText = t('approaching');
  }

  return (
    
    <div className="relative bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-b border-amber-200 overflow-hidden">
    
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-4 max-sm:-left-1 top-1/2 -translate-y-1/2 text-6xl">
          <img src="/images/kremla.png" className="h-16 w-16 max-sm:h-10 max-sm:w-6" alt="kremla-png" />
        </div>
        <div className="absolute -right-4 max-sm:-right-1 top-1/2 -translate-y-1/2 text-6xl">
          <img src="/images/kremla.png" className="h-16 w-16 max-sm:h-10 max-sm:w-6" alt="kremla-png" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-2.5 relative z-10">
        <Link
          href="/fettisdagen"
          className="flex items-center justify-center gap-3 group"
        >
          <span className="text-2xl animate-bounce">
            <img src="/images/kremla.png" className="h-9 w-9 max-sm:h-6 max-sm:w-6" alt="kremla-png" />
          </span>
          <div className="text-center">
            <span className="block sm:inline font-display text-3xl max-sm:text-xl text-amber-900 font-bold">
              {bannerText}
            </span>
            <span className="block sm:inline sm:ml-2 text-2xl max-sm:text-base text-amber-700 font-semibold">
              {t('cta')}
            </span>
          </div>
          <span className="text-2xl animate-bounce delay-100">
            <img src="/images/kremla.png" className="h-9 w-9 max-sm:h-6 max-sm:w-6" alt="kremla-png" />
          </span>
        </Link>
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-600 hover:text-amber-800 transition-colors z-20"
        aria-label={t('close')}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}