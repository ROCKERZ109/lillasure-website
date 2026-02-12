"use client";

import React, { useState, useEffect } from 'react';
import { Heart, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Assuming next-intl based on your syntax

const ValentineBanner = () => {
    const t = useTranslations('valentine');
    const [currentSlide, setCurrentSlide] = useState(0);
    const isExpired = new Date() > new Date('2026-02-14T23:59:59');

    const slides = [
        {
            type: 'product',
            image: '/images/valentine-heart.png',
        },
        {
            type: 'promo',
            image: '/images/121.png',
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    if (isExpired) return null;

    return (
        <section className="w-full px-6">
            <div className="relative h-[32rem] sm:h-[34rem] xl:h-[28rem] rounded-3xl overflow-hidden border border-red-500/20"
                style={{ boxShadow: '0 10px 40px -12px rgba(220, 38, 38, 0.15)' }}>
                
                {/* Mobile/Tablet: Slider */}
                <div className="xl:hidden absolute inset-0">
                    <div
                        className="flex h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {/* Slide 1: Product */}
                        <div className="min-w-full h-full relative flex-shrink-0">
                            <img className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={slides[0].image} alt={t('title')} />
                            <div className="absolute inset-0 bg-neutral-900/70" />

                            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-400 rounded-full z-10">
                                <Heart className="w-3 h-3 text-white" fill="currentColor" />
                                <span className="text-xs font-bold text-white font-body">{t('badge')}</span>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="max-w-md mx-auto text-center px-6">
                                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">{t('title')}</h2>
                                    <p className="text-red-400/80 font-bold font-display italic text-xl mb-6">{t('subtitle')}</p>

                                    <div className="space-y-1 text-neutral-300 font-body text-sm sm:text-base mb-6">
                                        <p>{t('description.line1')}</p>
                                        <p>{t('description.line2')}</p>
                                        <p>{t('description.line3')} <Heart className="inline w-3 h-3 text-red-500" fill="currentColor" /></p>
                                    </div>

                                    <div className="space-y-1 text-neutral-400 font-body text-xs sm:text-sm mb-6">
                                        <p>{t('details.shell')}</p>
                                        <p>{t('details.cream')}</p>
                                        <p>{t('details.core')}</p>
                                    </div>

                                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-rose-400 rounded-xl mb-6">
                                        <span className="text-lg font-semibold text-white font-body">{t('price')}</span>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs mb-4">
                                        <MapPin className="w-4 h-4 text-red-400" />
                                        <span>{t('availability')}</span>
                                    </div>
                                    <p className="text-red-400/60 text-xs">{t('disclaimer')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2: Promo */}
                        <div className="min-w-full h-full relative flex-shrink-0 bg-neutral-900">
                            <img className="absolute inset-0 w-full h-full object-fill pointer-events-none" src={slides[1].image} alt={t('title')} />
                        </div>
                    </div>

                    {/* Navigation */}
                    <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-neutral-900/60 rounded-full text-white/70 z-20"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-neutral-900/60 rounded-full text-white/70 z-20"><ChevronRight className="w-5 h-5" /></button>
                </div>

                {/* Desktop: Side by side */}
                <div className="hidden xl:flex h-full">
                    <div className="w-[35%] h-full relative flex-shrink-0">
                        <img className="absolute inset-0 w-full h-full object-cover pointer-events-none" src="/images/valentine-heart.png" alt={t('title')} />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent" />
                        <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-400 rounded-full">
                            <Heart className="w-3.5 h-3.5 text-white" fill="currentColor" />
                            <span className="text-xs font-bold text-white">{t('badge')}</span>
                        </div>
                    </div>

                    <div className="w-[65%] h-full relative flex-shrink-0 overflow-hidden bg-neutral-900">
                        <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {/* Slide 1: Content */}
                            <div className="min-w-full h-full flex items-center justify-center flex-shrink-0">
                                <div className="max-w-md text-center px-8">
                                    <h2 className="font-display text-4xl xl:text-5xl font-bold text-white">{t('title')}</h2>
                                    <p className="text-red-400/80 font-body italic text-xl mb-4">{t('subtitle')}</p>

                                    <div className="space-y-1 text-neutral-300 font-body text-lg mb-3">
                                        <p>{t('description.line1')}</p>
                                        <p>{t('description.line2')}</p>
                                        <p>{t('description.line3')} <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" /></p>
                                    </div>

                                    <div className="space-y-0 text-neutral-500 font-body text-sm mb-6">
                                        <p>{t('details.shell')}</p>
                                        <p>{t('details.cream')}</p>
                                        <p>{t('details.core')}</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-neutral-800 rounded-xl border border-neutral-700">
                                            <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                                            <p className="text-white font-semibold text-sm">{t('availability')}</p>
                                        </div>
                                        <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-400 rounded-xl">
                                            <span className="text-xl font-bold text-white font-body">{t('price')}</span>
                                        </div>
                                    </div>

                                    <p className="text-red-400/60 text-xs mb-3">{t('disclaimer')}</p>
                                    <p className="text-neutral-600 font-body text-xs mb-1">{t('footer_label')}</p>
                                    <p className="text-red-400/80 font-display text-base tracking-widest">{t('date_roman')}</p>
                                </div>
                            </div>

                            {/* Slide 2: Promo Graphic */}
                            <div className="min-w-full h-full flex items-center justify-center flex-shrink-0">
                                <img className="h-full w-full object-fill pointer-events-none" src="/images/121.png" alt={t('title')} />
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-red-500 w-6' : 'bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValentineBanner;