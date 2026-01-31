"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "sv" ? "en" : "sv";
    
    // This replaces the current URL with the new locale
    // while keeping the user on the same page (e.g., /produkter -> /en/produkter)
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "max-sm:px-2 flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300",
        "bg-transparent border-amber-100/30 text-amber-100 hover:bg-amber-100/10 hover:border-amber-100/60"
      )}
      aria-label="Switch language"
    >
      <Globe className="max-sm:w-3 max-sm:h-3 w-4 h-4" />
      <span className="max-sm:text-xs text-sm font-body font-medium uppercase tracking-wide">
        {locale === "sv" ? "EN" : "SV"}
      </span>
    </button>
  );
}