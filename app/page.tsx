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
  useEffect(()=>{
    async function fetchProducts() {
      try {
       const data  = await getProducts();
      
       setFeaturedProducts( getFeaturedProducts(data).slice(0, 6));
      } catch (error) {
         console.error("Error fetching featured products:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchProducts()
  },[setFeaturedProducts, setLoading])
 
  

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dough-100 via-flour-50 to-flour-100" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-wheat-200 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-dough-200 rounded-full blur-3xl opacity-30 animate-float delay-300" />
        
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center ">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-flour-100/80 backdrop-blur-sm border border-flour-300 rounded-full mb-8 animate-fade-in">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-body text-crust-600 tracking-wide">
                100% Ekologiskt & KRAV-märkt
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-crust-900 leading-[0.9] tracking-tight mb-6 animate-slide-up">
              Handgjort
              <br />
              <span className="text-gradient">Surdegsbröd</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-lg md:text-xl text-crust-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100">
              Sedan 2014 har vi bakat bröd med kärlek i Kålltorp. 
              Varje limpa formas för hand och gräddas i stenugn på 
              lokalodlat, ekologiskt mjöl.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
              <Link href="/bestall" className="btn-primary group">
                Beställ Online
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/produkter" className="btn-secondary">
                Se Produkter
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in delay-300">
              <div className="flex items-center gap-2 text-crust-500">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-body">Kålltorp, Göteborg</span>
              </div>
              <div className="flex items-center gap-2 text-crust-500">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-body">Tis-Lör öppet</span>
              </div>
              <div className="flex items-center gap-2 text-crust-500">
                <Wheat className="w-5 h-5" />
                <span className="text-sm font-body">Stenugnsbakat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-crust-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-crust-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-flour-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block">
              Från Ugnen
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-crust-900 mb-6">
              Våra Favoriter
            </h2>
            <p className="text-crust-500 leading-relaxed">
              Varje dag bakar vi ett urval av klassiska surdegsbröd och 
              svenska bakverk. Allt handgjort med de finaste ekologiska råvarorna.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ">
            {loading ?  
            (<>

<Shimmer/>
      <div className="w-full">
<Shimmer/>
<Shimmer/>
</div> 
<Shimmer/>
            </>
     

)

             : featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 font-body text-crust-700 link-underline hover:text-crust-900 transition-colors"
            >
              Se alla produkter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-dough-100 to-flour-50 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-crust-200 to-crust-300 rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl opacity-75"><img src="/images/rye.jpg" alt="" /></span>
              </div>
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-flour-50/30 rounded-sm pointer-events-none" />
            </div>

            {/* Content */}
            <div>
              <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block">
                Vår Historia
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-crust-900 mb-6 leading-tight">
                Bröd som det
                <br />ska smaka
              </h2>
              <div className="space-y-4 text-crust-600 leading-relaxed mb-8">
                <p>
                  Lilla Sur startades 2014 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, nulla minima iure esse cumque nostrum et? Porro culpa ducimus quas voluptatem earum et officiis ullam fuga! Consequuntur cum molestias ipsum excepturi, deleniti tempora unde, numquam, eos porro veniam saepe. Nobis voluptatibus veniam obcaecati tempore ipsa?
                </p>
                <p>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde, itaque laboriosam harum doloribus necessitatibus maxime non eligendi numquam similique provident fuga qui dolore quia!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi quasi vero quas aliquam rerum. Praesentium ullam, suscipit ratione error nesciunt officiis quaerat mollitia magnam nihil!
                </p>
              </div>
              <Link href="/om-oss" className="btn-secondary">
                Läs mer om oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-crust-900 text-flour-50">
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
                <div className="w-12 h-12 flex items-center justify-center bg-crust-800 rounded-full">
                  <MapPin className="w-6 h-6 text-wheat-400" />
                </div>
                <h3 className="font-display text-2xl">Hitta Hit</h3>
              </div>
              <address className="not-italic text-flour-300 leading-relaxed mb-4">
                {bakeryInfo.address.street}
                <br />
                {bakeryInfo.address.postalCode} {bakeryInfo.address.city}
              </address>
              <p className="text-sm text-flour-500 mb-4">
                I hjärtat av Kålltorp, precis vid Solrosgatan.
                Parkering finns på gatan.
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-wheat-400 hover:text-wheat-300 transition-colors"
              >
                Visa på Google Maps
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-crust-800 rounded-full">
                  <Wheat className="w-6 h-6 text-wheat-400" />
                </div>
                <h3 className="font-display text-2xl">Kontakt</h3>
              </div>
              <p className="text-flour-300 leading-relaxed mb-4">
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
      <section className="py-24 bg-gradient-to-b from-flour-100 to-dough-100 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-crust-900 mb-6">
              Beställ till avhämtning
            </h2>
            <p className="text-crust-600 leading-relaxed mb-10 text-lg">
              Lägg din beställning online och hämta ditt nybakade bröd 
              i butiken. Vi bakar på beställning så att ditt bröd alltid 
              är så färskt som möjligt.
            </p>
            <Link href="/bestall" className="btn-primary text-lg">
              Beställ nu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
