"use client"

import Link from "next/link";
import { ArrowRight, Wheat, Clock, MapPin, Leaf } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, storeHours, bakeryInfo } from "@/lib/data";
import { getProducts } from "@/lib/product";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Shimmer from "@/components/Shimmer";

export default function HomePage() {
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
      <section className="relative     md:py-[4rem]  flex items-center justify-center overflow-hidden grain-overlay bg-black ">
        {/* Background Gradient */}
        <div className="absolute inset-0  max-sm:mt-32">
          <img
            src="/images/flagship.jpeg"
            className="w-full h-full object-cover"
            alt=""
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="w-full mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-fade-in mt-14 max-sm:mt-4">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-sm font-body text-white tracking-wide">
                100% Ekologiskt & KRAV-märkt
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.9] tracking-tight mb-6 animate-slide-up">
              Handgjort
              <br />
              <span className="text-white/80">Surdegsbröd</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-lg md:text-xl text-crust-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100 ">
              Vi har bakat bröd i Kålltorp sedan 2014. Varje limpa är fylld med kärlek, formas för hand och bakas i en stenugn med lokalt utvalda ingredienser
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center animate-slide-up delay-200">
              <Link href="/produkter" className="btn-primary group bg-white text-black hover:bg-white/90">
                Beställ Online
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-14 animate-fade-in delay-300">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-body">Kålltorp, Göteborg</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-body">Tis-Lör öppet</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Wheat className="w-5 h-5" />
                <span className="text-sm font-body">Stenugnsbakat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-crust-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-crust-400 rounded-full animate-pulse" />
          </div>
        </div> */}
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block">
              Från Ugnen
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white/80 mb-6">
              Våra Favoriter
            </h2>
            <p className="text-crust-200 leading-relaxed font-body" >
              Varje dag bakar vi ett urval av klassiska surdegsbröd och
              svenska bakverk. Allt handgjort med de finaste ekologiska råvarorna.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ">
            {loading ?
              (<>

                <Shimmer />
                <div className="w-full">
                  <Shimmer />
                  <Shimmer />
                </div>
                <Shimmer />
              </>
              )

              : featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  featured={product.name === "Kdremla"}
                />
              ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 font-body text-amber-100 link-underline hover:text-white/80 transition-colors"
            >
              Se alla produkter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <hr className="bg-wheat-400 "></hr>
      {/* About Section */}
      <section className="py-10 bg-black">
        <div className="h-[37rem] max-sm:h-[27rem] mx-auto px-6">
          {/* Video Container */}
          <div className="relative h-[37rem] max-sm:h-[27rem] rounded-3xl overflow-hidden">

            {/* Layer 1: Video (bottom) */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <source src="/images/vid.mp4" type="video/mp4" />
            </video>

            {/* Layer 2: Dark overlay (middle) */}
            <div className="absolute inset-0 bg-gray-900/70" />

            {/* Layer 3: Content (top) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-3xl mx-auto text-center px-6">
                <h2 className="font-display  text-3xl sm:text-5xl font-semibold text-white mb-6">
                  Beställ till avhämtning
                </h2>
                <p className="text-crust-200 leading-relaxed mb-10 text-sm sm:text-lg">
                  Lägg din beställning online och hämta ditt nybakade bröd
                  i butiken. Vi bakar på beställning så att ditt bröd alltid
                  är så färskt som möjligt.
                </p>
                <Link href="/produkter" className="btn-primary  text-sm h-11 sm:h-14 sm:text-lg">
                  Beställ nu
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
 <hr className="bg-wheat-400 "></hr>
      {/* Info Section */}
      <section className="py-10 bg-black text-flour-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-crust-800 rounded-full">
                  <Clock className="w-6 h-6 text-wheat-400" />
                </div>
                <h3 className="font-display text-2xl">Öppettider</h3>
              </div>
              <ul className="space-y-2">
                {storeHours.map((hours) => (
                  <li
                    key={hours.day}
                    className="flex justify-between text-sm py-1 border-b border-crust-800"
                  >
                    <span className="text-flour-400">{hours.day}</span>
                    <span className={hours.closed ? "text-flour-600" : "text-flour-200"}>
                      {hours.closed ? "Stängt" : `${hours.open} – ${hours.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full">
                  <MapPin className="w-6 h-6 text-white/90" />
                </div>
                <h3 className="font-display text-2xl">Hitta Hit</h3>
              </div>
              <address className="not-italic text-flour-300 leading-relaxed mb-4">
                {bakeryInfo.address.street}
                <br />
                {bakeryInfo.address.postalCode} {bakeryInfo.address.city}
              </address>
              <p className="text-sm text-flour-500 mb-4 font-body">
                I hjärtat av Kålltorp, precis vid Solrosgatan.
                Parkering finns på gatan.
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2  text-crust-400 hover:text-crust-600 transition-colors font-body"
              >
                Visa på Google Maps
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Contact */} 
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full">
                  <Wheat className="w-6 h-6 text-white/90" />
                </div>
                <h3 className="font-display text-2xl">Kontakt</h3>
              </div>
              <p className="text-crust-200 leading-relaxed mb-4 font-body">
                Har du frågor om beställningar eller våra produkter?
                Hör gärna av dig!
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
      </section>

      {/* CTA Section */}
  
    </>
  );
}
