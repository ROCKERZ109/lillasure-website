import Link from "next/link";
import { Instagram, Mail, MapPin, Clock } from "lucide-react";
import { bakeryInfo, storeHours } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-gray-950 text-flour-100">
      <hr />
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-0">
              {/* <span className="font-display text-3xl font-semibold text-flour-50"> */}
               <img src="/images/logo-white.png" className="sm:size-48 max-sm:size-32" alt="" />
              {/* </span> */}
              {/* <span className="block text-xs tracking-[0.3em] uppercase text-flour-400 mt-1">
                Hantverksbageri
              </span> */}
            </Link>
            <p className="text-sm text-flour-300 leading-relaxed mb-6">
              Ekologiskt bageri i Kålltorp sedan 2014. Vi bakar med
              kärlek, tid och de bästa råvarorna.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://instagram.com/${bakeryInfo.contact.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-flour-700 rounded-full hover:bg-flour-800 hover:border-flour-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${bakeryInfo.contact.email}`}
                className="w-10 h-10 flex items-center justify-center border border-flour-700 rounded-full hover:bg-flour-800 hover:border-flour-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg text-flour-50 mb-6">Navigering</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Hem" },
                { href: "/produkter", label: "Produkter" },
                { href: "/bestall", label: "Beställ Online" },
                { href: "/om-oss", label: "Om Oss" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-flour-400 hover:text-flour-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg text-flour-50 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Öppettider
            </h3>
            <ul className="space-y-2">
              {storeHours.map((hours) => (
                <li
                  key={hours.day}
                  className="flex justify-between text-sm"
                >
                  <span className="text-flour-400">{hours.day}</span>
                  <span className={hours.closed ? "text-flour-500" : "text-flour-200"}>
                    {hours.closed ? "Stängt" : `${hours.open} - ${hours.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-flour-50 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Hitta oss
            </h3>
            <address className="not-italic text-sm text-flour-300 leading-relaxed mb-4">
              {bakeryInfo.address.street}
              <br />
              {bakeryInfo.address.postalCode} {bakeryInfo.address.city}
              <br />
              {bakeryInfo.address.country}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-wheat-400 hover:text-wheat-300 transition-colors"
            >
              Visa på karta →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-flour-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-flour-500">
              © {currentYear} Lilla Sur Göteborgs Hantverksbageri AB.
              Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center gap-1 text-xs text-flour-600">
              <span>100% Ekologiskt</span>
              <span className="mx-2">•</span>
              <span>KRAV-märkt</span>
              <span className="mx-2">•</span>
              <span>Handgjort med kärlek</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
