import Link from "next/link";
import { Wheat, Heart, Clock, Leaf, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-dough-100 to-flour-50 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-wheat-600 mb-4 block text-center mt-10">
              Vår Historia
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-crust-900 mb-8 text-center leading-tight">
              Bakat med kärlek
              <br />
              sedan 2014
            </h1>
            <p className="text-xl text-crust-600 leading-relaxed text-center max-w-2xl mx-auto">
              Lilla Sur är ett litet hantverksbageri i Kålltorp som drivs av
              passionen för riktigt bröd – det bröd som våra förfäder åt.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-flour-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-crust-200 to-crust-300 rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl opacity-40">👨‍🍳</span>
              </div>
              <div className="absolute inset-4 border border-flour-50/30 rounded-sm pointer-events-none" />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-crust-900 mb-6">
                Från fabrik till bageri
              </h2>
              <div className="space-y-4 text-crust-600 leading-relaxed">
                <p>
                  Lilla Sur startades Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Culpa odio quidem accusantium eum accusamus
                  fuga, nostrum possimus sit. Non aliquid fugiat a temporibus
                  harum quibusdam quas cumque alias velit. Ab cupiditate
                  obcaecati doloribus voluptate? Molestias, obcaecati alias?
                  Ratione nam quos quasi debitis quas. Quo deserunt voluptate
                  nostrum sunt suscipit mollitia.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  maiores, mollitia excepturi ipsa, nobis earum commodi officia
                  sapiente, amet eius quis beatae cupiditate dolores repellat.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                  deleniti nobis nam omnis fugiat totam commodi, dolorem,
                  officia, nulla assumenda cum molestias nesciunt aliquid
                  doloremque non. Placeat, recusandae accusantium enim esse sint
                  quibusdam aliquid, facilis natus, ea nisi quasi cum!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dough-100 grain-overlay">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-crust-900 mb-6">
              Våra värderingar
            </h2>
            <p className="text-crust-600 leading-relaxed">
              Varje beslut vi tar styrs av våra grundläggande värderingar – från
              val av råvaror till hur vi bemöter våra kunder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-flour-50 rounded-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-wheat-100 rounded-full flex items-center justify-center text-wheat-700 mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl text-crust-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-crust-500 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-flour-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-crust-900 mb-6">
              Vår process
            </h2>
            <p className="text-crust-600 leading-relaxed">
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
                <div className="font-display text-6xl text-wheat-300 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl text-crust-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-crust-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-crust-900 text-flour-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Kom och smaka skillnaden
            </h2>
            <p className="text-flour-300 leading-relaxed mb-10">
              Det bästa sättet att förstå vad vi gör är att smaka själv. Besök
              oss i butiken eller beställ online för avhämtning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bestall"
                className="inline-flex items-center justify-center px-8 py-4 bg-wheat-500 text-crust-950 font-body font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-wheat-400"
              >
                Beställ online
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-flour-50 font-body font-medium tracking-wide border-2 border-flour-50 rounded-sm transition-all duration-300 hover:bg-flour-50 hover:text-crust-900"
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
