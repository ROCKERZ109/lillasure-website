"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function FettisdagenBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-b border-amber-200 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-6xl">🥯</div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-6xl">🥯</div>
      </div>
      
      <div className="container mx-auto px-6 py-3 relative z-10">
        <Link 
          href="/produkter?kategori=semla"
          className="flex items-center justify-center gap-3 group"
        >
          <span className="text-2xl animate-bounce">🥯</span>
          <div className="text-center">
            <span className="block sm:inline font-display text-lg text-amber-900 font-bold">
              Fettisdagen närmar sig!
            </span>
            <span className="block sm:inline sm:ml-2 text-sm text-amber-700 font-semibold">
              Förbeställ din semla nu →
            </span>
          </div>
          <span className="text-2xl animate-bounce delay-100">🥯</span>
        </Link>
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-600 hover:text-amber-800 transition-colors z-20"
        aria-label="Stäng banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}