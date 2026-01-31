"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
// Import Link from your navigation wrapper
import { Link } from "@/i18n/navigation";
import { FETTISDAGEN_DATE, FETTISDAGEN_MIN_KREMLA } from "@/types";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";

export default function FettisdagenPopup() {
  const t = useTranslations('fettisdagen_popup');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if Fettisdagen hasn't passed yet
    const today = new Date();
    const fettisdagen = new Date(FETTISDAGEN_DATE);
    
    // Only show if today is before or exactly on Fettisdagen
    if (today <= fettisdagen) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  const formattedDate = formatDate(FETTISDAGEN_DATE);
  const year = new Date(FETTISDAGEN_DATE).getFullYear();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-crust-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-amber-50 border border-amber-100 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-crust-400 hover:text-crust-900 hover:bg-flour-200 rounded-full transition-colors"
          aria-label={t('close_aria')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <span className="flex justify-center mb-5">
            <img 
              src="/images/kremla.png" 
              className="h-20 w-20 max-sm:h-16 max-sm:w-16 animate-bounce" 
              alt={t('image_alt')} 
            />
          </span>
          {/* Header bigger and theme color */}
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-crust-900 mb-4 leading-tight">
            {t('title', { year })}
          </h2>
          {/* Body text theme colors */}
          <p className="text-crust-800 mb-2 text-lg font-body">
            {t('description', { date: formattedDate })}
          </p>
          <p className="text-crust-600 mb-8 text-sm font-body">
            {t('sub_description', { count: FETTISDAGEN_MIN_KREMLA })}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Primary button bg-crust-900 */}
            <Link
              href="/fettisdagen"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3.5 bg-crust-900 text-white font-semibold rounded-full hover:bg-crust-800 shadow-md hover:shadow-lg transition-all font-body"
            >
              {t('cta_btn')}
            </Link>
            {/* Secondary button theme styles */}
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-3.5 text-crust-900 font-medium border border-crust-200 hover:bg-flour-100 rounded-full transition-colors font-body"
            >
              {t('close_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}