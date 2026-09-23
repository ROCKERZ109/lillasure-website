"use client";

import { ArrowRight, CalendarDays, Clock3, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { KANELBULLENS_DAY_END } from "@/types";

export default function KanelbullensBanner({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("kanelbullens_day");
  const [isVisible, setIsVisible] = useState(true);
  const isPast = new Date() > new Date(`${KANELBULLENS_DAY_END}T23:59:59`);

  if (isPast || (compact && !isVisible)) return null;

  if (compact) {
    return (
      <div className="relative overflow-hidden border-b border-amber-200 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100">
        <div className="container relative z-10 mx-auto px-9 py-2 sm:px-10 sm:py-2.5">
          <Link href="/bestall?kanelbulle=10" className="flex min-w-0 items-center justify-center gap-2 text-center sm:gap-3">
            <img src="/images/cinnamon.jpg" className="h-8 w-8 flex-shrink-0 rounded-full object-cover sm:h-10 sm:w-10" alt="" />
            <span className="min-w-0 whitespace-nowrap">
              <span className="font-display text-base font-bold text-amber-900 sm:text-3xl">{t("compact_title")}</span>
              <span className="ml-1.5 text-xs font-semibold text-amber-700 sm:ml-2 sm:text-lg">{t("compact_cta")}</span>
            </span>
            <img src="/images/cinnamon.jpg" className="h-8 w-8 flex-shrink-0 rounded-full object-cover sm:h-10 sm:w-10" alt="" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 p-2 text-amber-600 transition-colors hover:text-amber-800"
          aria-label={t("close")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <section className="w-full bg-black px-6 py-10">
      <div className="relative mx-auto overflow-hidden rounded-3xl border border-amber-400/30 bg-neutral-900">
        <div className="grid min-h-[28rem] lg:grid-cols-2">
          <div className="relative min-h-[18rem] overflow-hidden lg:min-h-0">
            <img
              src="/images/cinnamon.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              alt={t("image_alt")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          <div className="flex items-center bg-gradient-to-br from-amber-950 via-neutral-900 to-black px-6 py-10 sm:px-12">
            <div className="max-w-xl">
              <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-amber-300">{t("badge")}</span>
              <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{t("title")}</h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-amber-100">{t("subtitle")}</p>

              <div className="mt-7 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-amber-300" />{t("dates")}</div>
                <div className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-amber-300" />{t("cutoff")}</div>
                <p className="text-white/70">{t("minimum")}</p>
              </div>

              <Link href="/bestall?kanelbulle=10" className="btn-primary group mt-8 inline-flex items-center">
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
