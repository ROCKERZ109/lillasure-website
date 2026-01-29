import { MapPin, Clock, Mail, Phone, Instagram } from "lucide-react";
import { bakeryInfo, storeHours } from "@/lib/data";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-black">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-body tracking-[0.3em] uppercase  text-white/80 mb-4 block mt-10">
              Välkommen
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-6">
              Kontakt
            </h1>
            <p className="text-crust-200 leading-relaxed text-lg font-body">
              Har du frågor, funderingar eller vill bara säga hej? 
              Vi finns här för dig.
            </p>
          </div>
        </div>
      </section>
<hr />
      {/* Contact Info */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Info Cards */}
            <div className="space-y-6">
              {/* Location */}
              <div className="bg-gray-800 rounded-sm p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/80">
                      Besöksadress
                    </h2>
                    <p className="text-sm text-crust-200">I hjärtat av Kålltorp</p>
                  </div>
                </div>
                <address className="not-italic text-crust-200 leading-relaxed mb-4">
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
                  className="inline-flex items-center gap-2 text-crust-400 hover:text-crust-600 transition-colors font-body"
                >
                  Öppna i Google Maps →
                </a>
              </div>

              {/* Hours */}
              <div className="bg-gray-800 rounded-sm p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/70">
                      Öppettider
                    </h2>
                    <p className="text-sm text-crust-200">
                      Stängt söndag & måndag
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {storeHours.map((hours) => (
                    <li
                      key={hours.day}
                      className="flex justify-between py-2 border-b border-flour-200 last:border-0"
                    >
                      <span className="text-crust-200">{hours.day}</span>
                      <span
                        className={
                          hours.closed
                            ? "text-white"
                            : "text-white/80 font-medium"
                        }
                      >
                        {hours.closed ? "Stängt" : `${hours.open} – ${hours.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            
            </div>

            {/* Map Placeholder */}
            <div className="">
            
                <div className=" bg-gray-800 rounded-sm overflow-hidden max-sm:-mt-4">
                  {/* Map placeholder - replace with actual map */}
                  <div className="  flex flex-col items-center justify-center text-center p-8">
                    <MapPin className="max-sm:w-10 max-sm:h-10 w-16 h-16 text-white mb-4" />
                    <h3 className="font-display max-sm:text-xl text-2xl text-white/80 mb-2">
                      Hitta till oss
                    </h3>
                    <p className="text-crust-200 mb-6 max-sm:text-sm font-body">
                      Vi ligger på Solrosgatan 11 i Kålltorp, 
                      enkelt att nå med spårvagn eller buss.
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${bakeryInfo.address.street}+${bakeryInfo.address.city}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Visa på karta
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-6 bg-gray-800 rounded-sm ">
                  <h3 className="font-display text-lg text-white/80 mb-2">
                    Tips för besöket
                  </h3>
                  <ul className="text-sm text-crust-200 space-y-2 font-body">
                    <li>• Parkering finns längs gatan</li>
                    <li>• Närmaste hållplats: Solrosgatan (spårvagn 5, 3)</li>
                    <li>• Populära bröd kan ta slut tidigt – kom i tid!</li>
                    <li>• Vi tar emot kort, Swish och kontant</li>
                  </ul>
                </div>
           
                {/* Contact Methods */}
              <div className="mt-6 p-6 bg-gray-800 rounded-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-400  rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white/80">
                      Kontakta oss
                    </h2>
                    <p className="text-sm text-crust-200">Vi svarar så snart vi kan</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a
                    href={`mailto:${bakeryInfo.contact.email}`}
                    className="flex items-center gap-3 text-crust-200 hover:text-white/80 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    {bakeryInfo.contact.email}
                  </a>
                  <a
                    href={`https://instagram.com/${bakeryInfo.contact.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-crust-200 hover:text-white/80 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                    {bakeryInfo.contact.instagram}
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-800 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white/80 mb-12 text-center">
              Vanliga frågor
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Kan jag beställa till företagsevent?",
                  answer:
                    "Absolut! Vi tar emot större beställningar för företag, fester och evenemang. Kontakta oss via email minst en vecka i förväg så hjälper vi dig.",
                },
                {
                  question: "Har ni glutenfria alternativ?",
                  answer:
                    "Tyvärr bakar vi inte glutenfritt just nu eftersom vi arbetar med mjöl i hela lokalen. Men våra havre-limpor innehåller naturligt mindre gluten tack vare lång jäsning.",
                },
                {
                  question: "Hur länge håller brödet?",
                  answer:
                    "Vårt surdegsbröd håller sig färskt i 3-5 dagar i rumstemperatur, inslaget i kökshandduk. Du kan också frysa det – skiva först för enkel upptining.",
                },
                {
                  question: "Kan jag reservera bröd?",
                  answer:
                    "Ja! Använd vår online-beställning. Vi rekommenderar att beställa minst en dag i förväg, särskilt för helger.",
                },
                {
                  question: "Varför är butiken stängd söndag och måndag?",
                  answer:
                    "Vi behöver tid att förbereda och baka inför veckan. Surdegsbröd tar tid – våra degar jäser i upp till 48 timmar. Och alla behöver vila!",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-600 rounded-sm p-6 transition-all duration-300 hover:shadow-md"
                >
                  <h3 className="font-display text-xl font-bold text-white/80 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-crust-200  max-sm:text-sm font-body leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
