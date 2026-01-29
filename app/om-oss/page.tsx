import Link from "next/link";
import { Wheat, Heart, Clock, Leaf, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-black">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4 block text-center mt-10">
              Vår Historia
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-8 text-center leading-tight">
              Bakat med kärlek
              <br />
              sedan 2014
            </h1>
            <p className="text-xl text-crust-200 leading-relaxed text-center max-w-2xl mx-auto font-body">
              Lilla Sur är ett hantverksbageri i Kålltorp som drivs av
              passionen för riktigt bröd – det bröd som våra förfäder åt.
            </p>
          </div>
        </div>
      </section>
      <hr />
      {/* Story Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] xl:aspect-[6/7] rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl opacity-75"><img src="/images/history.png" className="object-fill" /></span>
              </div>
              <div className="absolute inset-4 border border-flour-50/30 rounded-sm pointer-events-none" />
            </div>

            {/* Content */}
            <div>
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white/80 ">
                Att skapa ett arv 
              </h2>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white/80 mb-6">
                Lilla Surs berättelse
              </h2>
              </div>
              <div className="space-y-4 text-crust-200 leading-relaxed max-sm:text-center font-body">
                <p>
                  Ett hantverksbageri i hjärtat av Kålltorp. Riktigt bröd. Riktiga människor. Riktig smak.
                  Lilla Sur grundades 2014 av brödentusiasterna Andreas och Tommy och har sedan dess varit en symbol för kvalitet, gemenskap och service. Ett decennium senare tar Beata och Sid Lilla Sur till nya höjder. Samma kvalitet. Samma gemenskap. Mer kärlek. Mer äventyr.
                </p>
                <p>
                  Beata har älskat surdegsbröd så länge hon kan minnas från sin barndom i Polen. Doften av nybakat surdegsbröd tar henne direkt tillbaka till barndomens dagar. Beata har bott och arbetat i Asien, Europa och USA, och har samlat på sig erfarenheter och smaker från världens alla hörn. Längs vägen mötte hon Sid. Sid har lekt med degar sedan han var liten, till och med innan han lärde sig gå. Sid byggde bilar på Volvo innan han bestämde sig för att satsa på det han verkligen brinner för.
                </p>
                <p>
                  Tillsammans med ett team av talangfulla bagare lovar Beata och Sid att skämma bort göteborgarna med bröd och bullar av högsta smak och kvalitet. Bakat på Lilla Sur.


                </p>
              </div>
              </div>
            </div>
          </div>
        

      </section>
<hr />
      {/* Values Section */}
      <section className="py-24 bg-black grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white/80 mb-6">
              Våra värderingar
            </h2>
            <p className="text-crust-200 leading-relaxed font-body">
              Varje beslut vi tar styrs av våra grundläggande värderingar – från
              val av råvaror till hur vi bemöter våra kunder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "100% Ekologiskt",
                description:
                  "Vi använder endast KRAV-märkt, ekologiskt odlat svenskt mjöl. Bra för dig, bra för jorden.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Tid & Tålamod",
                description:
                  "Våra surdegar jäser långsamt i upp till 48 timmar för maximal smak och näring.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Handgjort med kärlek",
                description:
                  "Varje bröd formas för hand. Inga maskiner, inga genvägar – bara hantverk.",
              },
              {
                icon: <Wheat className="w-8 h-8" />,
                title: "Lokala råvaror",
                description:
                  "Vårt mjöl kommer från svenska gårdar, malt på lokala kvarnar. Kortare transporter, bättre kvalitet.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Stenugnsgräddat",
                description:
                  "Vi gräddas i traditionell stenugn som ger brödet dess karakteristiska skorpa och smak.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Del av grannskapet",
                description:
                  "Vi är stolta över att vara en del av Kålltorps community och stöttar lokala initiativ.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white/90 mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-crust-200 leading-relaxed text-sm font-body">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
<hr />
      {/* Process Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
              Vår process
            </h2>
            <p className="text-white/80 leading-relaxed font-body">
              Från surdeg till färdigt bröd – en resa som tar upp till 48
              timmar.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Surdegen",
                description:
                  "Vår surdeg är över 10 år gammal och matas dagligen med färskt mjöl.",
              },
              {
                step: "02",
                title: "Jäsningen",
                description:
                  "Degen jäser långsamt i kyla för att utveckla smak och textur.",
              },
              {
                step: "03",
                title: "Formningen",
                description:
                  "Varje bröd formas varsamt för hand för perfekt struktur.",
              },
              {
                step: "04",
                title: "Gräddningen",
                description:
                  "I stenugnen får brödet sin knapriga skorpa och gyllene färg.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-6xl text-crust-200 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl text-white/80 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-crust-200 leading-relaxed font-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
<hr />
      {/* CTA Section */}
      <section className="py-24 bg-black text-flour-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Kom och smaka skillnaden
            </h2>
            <p className="text-flour-300 leading-relaxed mb-10 font-body">
              Det bästa sättet att förstå vad vi gör är att smaka själv. Besök
              oss i butiken eller beställ online för avhämtning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bestall"
                className="inline-flex items-center justify-center px-8 py-4 bg-crust-800 text-crust-200 font-body font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-crust-900"
              >
                Beställ online
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-flour-50 font-body font-medium tracking-wide border-2 border-flour-50 rounded-sm transition-all duration-300 hover:bg-flour-50 hover:text-black"
              >
                Hitta till oss
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
