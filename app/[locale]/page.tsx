"use client"

import { Link } from "@/i18n/navigation";
import { ArrowRight, Wheat, Clock, MapPin } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, storeHours, bakeryInfo } from "@/lib/data";
import { getProducts } from "@/lib/product";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Shimmer from "@/components/Shimmer";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations('home');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setFeaturedProducts(getFeaturedProducts(data).slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchProducts()
  }, [setFeaturedProducts, setLoading])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-[3rem] md:py-[9rem] flex items-center justify-center overflow-hidden grain-overlay bg-black">
        {/* Background Gradient */}
        <div className="absolute inset-0 max-sm:mt-32">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/images/vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="w-full mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Main Heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.9] tracking-tight mb-6 animate-slide-up">
              {t('hero.title_prefix')}
              <br />
              <span className="text-white/80">{t('hero.title_suffix')}</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-lg md:text-xl text-crust-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center animate-slide-up delay-200">
              <Link href="/produkter" className="btn-primary group bg-white text-black hover:bg-white/90">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-14 animate-fade-in delay-300">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-body">{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-body">{t('hero.hours_short')}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Wheat className="w-5 h-5" />
                <span className="text-sm font-body">{t('hero.method')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black transition-transform duration-500 hover:scale-95">
        <div className="mx-auto px-6">
          {/* Container */}
          <div className="relative h-[27rem] sm:h-[32rem] xl:h-[29rem] rounded-3xl overflow-hidden">

            {/* Mobile/Tablet: Centered overlay layout */}
            <div className="xl:hidden absolute inset-0">
              <img
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                src="/images/ghibli.png"
                alt="Vive La Kremla"
              />
              <div className="absolute inset-0 bg-gray-900/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xl mx-auto text-center px-6">
                  <span className="text-amber-400 text-sm uppercase tracking-widest mb-3 block">
                   {t('new_product.badge')}{''}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
                    {t('new_product.title')}{''}
                  </h2>
                  <p className="text-neutral-300 font-body leading-relaxed mb-6 text-sm sm:text-base">
                    {t('new_product.line1')}{''}
                  </p>
                  <p className="text-amber-500 font-body leading-relaxed mb-4 text-2xl">
                    {t('new_product.line2')}{''}
                  </p>
                   <p className="text-neutral-200 font-body leading-relaxed mb-8 text-base xl:text-lg">
                     {t('new_product.line3')}{' '}
                    <span className="text-amber-300 font-body ">Saffron Kremla</span> and{' '}
                    <span className="text-amber-300 font-body ">Jalapeño Cheddar Bread</span>, comes{' '}
                      <br />
                    <em className="font-display text-white max-sm:text-2xl text-3xl">Vive La Kremla!!</em>
                    <br />
                    <span className="text-neutral-200 text-sm">Made only on Sundays!</span>
                  </p>
                  {/* <Link href="/produkter" className="btn-primary text-sm h-11 sm:h-14 sm:text-lg">
                    {t('new_product.cta')}{''}
                  </Link> */}
                </div>
              </div>
            </div>

            {/* Desktop: Side by side layout (Text LEFT, Image RIGHT) */}
            <div className="hidden xl:flex h-full ">
              {/* Left: Content */}
              <div className="w-1/2 h-full flex items-center justify-center bg-neutral-900">
                <div className="max-w-lg text-center px-8">
                  <span className="text-amber-400  font-bodytext-sm uppercase tracking-widest mb-4 block">
                     {t('new_product.badge')}{''}
                  </span>
                  <h2 className="font-display text-4xl xl:text-5xl font-semibold text-white mb-6">
                   {t('new_product.title')}{''} 
                  </h2>
                  <p className="text-neutral-400 font-body leading-relaxed mb-4 text-base xl:text-lg">
                      {t('new_product.line1')}{''}
                    {/* <span className="text-amber-400 font-semibold">basic human right</span>. */}
                  </p>
                  <p className="text-amber-500 font-body leading-relaxed mb-4 text-4xl">
                    {t('new_product.line2')}{''}
                  </p>
                  <p className="text-neutral-400  font-bodyleading-relaxed mb-8 text-base xl:text-lg">
                     {t('new_product.line3')}{' '}
                    <span className="text-amber-300 font-body">Saffron Kremla</span> and{' '}
                    <span className="text-amber-300 font-body">Jalapeño Cheddar Bread</span>, comes{' '}
                    <em className="font-display text-white text-3xl">Vive La Kremla!!</em>
                    <br />
                    <span className="text-neutral-500 text-sm font-body">Made only on Sundays!</span>
                  </p>
                  {/* <Link href="/produkter" className="btn-primary text-lg h-14">
                    {t('new_product.cta')} →
                  </Link> */}
                </div>
              </div>

              {/* Right: Image */}
              <div className="w-1/2 h-full relative">
                <img
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  src="/images/ghibli.png"
                  alt="Vive La Kremla"
                />
                {/* Optional: subtle gradient overlay from left */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block">
              {t('featured.label')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white/80 mb-6">
              {t('featured.title')}
            </h2>
            <p className="text-crust-200 leading-relaxed font-body">
              {t('featured.description')}
            </p>
          </div>

          {/* Products Grid */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {loading ? (
              <>
                <Shimmer />
                <div className="w-full">
                  <Shimmer />
                  <Shimmer />
                </div>
                <Shimmer />
              </>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showAvailableDays
                // featured={product.name === "Kdremla"}
                />
              ))
            )}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 font-body text-amber-100 link-underline hover:text-white/80 transition-colors"
            >
              {t('featured.view_all')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <hr className="bg-wheat-400"></hr>

      {/* About Section */}
      {/* About Section */}
      <section className="py-10 bg-black">
        <div className="mx-auto px-6">
          {/* Container */}
          <div className="relative h-[27rem] sm:h-[32rem] xl:h-[37rem] rounded-3xl overflow-hidden">

            {/* Mobile/Tablet: Centered overlay layout */}
            <div className="xl:hidden absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              >
                <source src="/images/sprinkle.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gray-900/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-xl mx-auto text-center px-6">
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-6">
                    {t('about.title')}
                  </h2>
                  <p className="text-neutral-300 leading-relaxed mb-10 text-sm sm:text-base">
                    {t('about.description')}
                  </p>
                  <Link href="/produkter" className="btn-primary text-sm h-11 sm:h-14 sm:text-lg">
                    {t('about.cta')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop: Side by side layout */}
            <div className="hidden xl:flex h-full">
              {/* Left: Video */}
              <div className="w-1/2 h-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                >
                  <source src="/images/sprinkle.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Right: Content */}
              <div className="w-1/2 h-full flex items-center justify-center bg-neutral-900">
                <div className="max-w-lg text-center px-8">
                  <h2 className="font-display text-4xl xl:text-5xl font-semibold text-white mb-6">
                    {t('about.title')}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed mb-10 text-base xl:text-lg">
                    {t('about.description')}
                  </p>
                  <Link href="/produkter" className="btn-primary text-lg h-14">
                    {t('about.cta')}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <hr className="bg-wheat-400"></hr>

      {/* Info Section */}
      {/* <section className="py-10 bg-black text-flour-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12"> */}
      {/* Hours */}
      {/* <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-crust-800 rounded-full">
                  <Clock className="w-6 h-6 text-wheat-400" />
                </div>
                <h3 className="font-display text-2xl">{t('info.hours_title')}</h3>
              </div>
              <ul className="space-y-2">
                {storeHours.map((hours) => (
                  <li
                    key={hours.day}
                    className="flex justify-between text-sm py-1 border-b border-crust-800"
                  > */}
      {/* Note: hours.day might need its own translation logic if coming from raw data */}
      {/* <span className="text-flour-400">{hours.day}</span>
                    <span className={hours.closed ? "text-flour-600" : "text-flour-200"}>
                      {hours.closed ? t('info.closed') : `${hours.open} – ${hours.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}

      {/* Location */}
      {/* <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full">
                  <MapPin className="w-6 h-6 text-white/90" />
                </div>
                <h3 className="font-display text-2xl">{t('info.location_title')}</h3>
              </div>
              <address className="not-italic text-flour-300 leading-relaxed mb-4">
                {bakeryInfo.address.street}
                <br />
                {bakeryInfo.address.postalCode} {bakeryInfo.address.city}
              </address>
              <p className="text-sm text-flour-500 mb-4 font-body">
                {t('info.location_description')}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-crust-400 hover:text-crust-600 transition-colors font-body"
              >
                {t('info.map_link')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div> */}

      {/* Contact */}
      {/* <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full">
                  <Wheat className="w-6 h-6 text-white/90" />
                </div>
                <h3 className="font-display text-2xl">{t('info.contact_title')}</h3>
              </div>
              <p className="text-crust-200 leading-relaxed mb-4 font-body">
                {t('info.contact_description')}
              </p>
              <div className="space-y-2">
                <a
                  href={`mailto:${bakeryInfo.contact.email}`}
                  className="block text-flour-200 hover:text-wheat-400 transition-colors"
                >
                  {bakeryInfo.contact.email}
                </a>
                <a
                  href={`https://instagram.com/${bakeryInfo.contact.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-flour-200 hover:text-wheat-400 transition-colors"
                >
                  {bakeryInfo.contact.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}