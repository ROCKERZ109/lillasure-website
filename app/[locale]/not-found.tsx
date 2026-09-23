// app/[locale]/not-found.tsx
import { Link } from '@/i18n/navigation';
import { Home, Search, Cookie } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full text-center">
                {/* 404 with Cookie */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-8xl sm:text-9xl font-display font-bold text-neutral-800">4</span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center animate-pulse">
                        <Cookie className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-900" />
                    </div>
                    <span className="text-8xl sm:text-9xl font-display font-bold text-neutral-800">4</span>
                </div>

                {/* Text */}
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                    {t('title')}
                </h1>
                <p className="text-neutral-400 font-body text-sm sm:text-base mb-2">
                    {t('description')}
                </p>
                <p className="text-neutral-500 font-body text-sm mb-8">
                    {t('subtitle')} 🍪
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-body font-semibold rounded-xl transition-all active:scale-[0.98]"
                    >
                        <Home className="w-4 h-4" />
                        {t('homeBtn')}
                    </Link>
                    <Link
                        href="/produkter"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-body font-medium rounded-xl transition-all border border-neutral-700"
                    >
                        <Search className="w-4 h-4" />
                        {t('productsBtn')}
                    </Link>
                </div>

                {/* Decorative */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    <span className="text-2xl">🥐</span>
                    <span className="text-2xl">🍞</span>
                    <span className="text-2xl">🥖</span>
                    <span className="text-2xl">🧁</span>
                    <span className="text-2xl">🥧</span>
                </div>
            </div>
        </main>
    );
}