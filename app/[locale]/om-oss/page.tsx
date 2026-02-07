"use client";

import { Link } from "@/i18n/navigation";
import { Wheat, Heart, Clock, Leaf, Award, Users, User, HandMetal, Star, Sparkles, Gem, Repeat1, Repeat, Feather, Hammer } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('about');

  // Define values list using translations
  const valuesList = [
    // {
    //   icon: <Leaf className="w-8 h-8" />,
    //   title: t('values.items.organic.title'),
    //   description: t('values.items.organic.description'),
    // },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('values.items.quality.title'),
      description: t('values.items.quality.description'),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('values.items.customer.title'),
      description: t('values.items.customer.description'),
    },
    {
      icon: <Feather className="w-8 h-8" />,
      title: t('values.items.clean.title'),
      description: t('values.items.clean.description'),
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: t('values.items.less.title'),
      description: t('values.items.less.description'),
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: t('values.items.magic.title'),
      description: t('values.items.magic.description'),
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: t('values.items.craft.title'),
      description: t('values.items.craft.description'),
    },
  ];

  // Define process steps using translations
  const processSteps = [
    {
      step: "01",
      title: t('process.steps.sourdough.title'),
      description: t('process.steps.sourdough.description'),
    },
    {
      step: "02",
      title: t('process.steps.fermentation.title'),
      description: t('process.steps.fermentation.description'),
    },
    {
      step: "03",
      title: t('process.steps.shaping.title'),
      description: t('process.steps.shaping.description'),
    },
    {
      step: "04",
      title: t('process.steps.baking.title'),
      description: t('process.steps.baking.description'),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-black">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4 block text-center mt-10">
              {t('hero.badge')}
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-8 text-center leading-tight">
              {t('hero.title_line1')}
              <br />
              {t('hero.title_line2')}
            </h1>
            <p className="text-xl text-crust-200 leading-relaxed text-center max-w-2xl mx-auto font-body">
              {t('hero.description')}
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
            <div className="relative aspect-[3/2] xl:aspect-[5/3] rounded-xl overflow-hidden">
              <div className="absolute inset-0 ">

                <img src="/images/ghibli_owners.png" className="absolute inset-0 " alt="Our history" />

              </div>
              <div className="absolute inset-4 border border-flour-50/30 rounded-sm pointer-events-none" />
            </div>

            {/* Content */}
            <div>
              <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white/80 ">
                  {t('story.subtitle')}
                </h2>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white/80 mb-6">
                  {t('story.title')}
                </h2>
              </div>
              <div className="space-y-4 text-crust-200 leading-relaxed max-sm:text-center font-body">
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />

      {/* Values Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
              {t('values.title')}
            </h2>
            <p className="text-neutral-400 leading-relaxed font-body">
              {t('values.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesList.map((value, index) => (
              <div
                key={index}
                className="group h-64 [perspective:1000px]"
              >
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* Front */}
                  <div className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                      {value.icon}
                    </div>
                    <h3 className="font-display text-xl text-white text-center font-bold">
                      {value.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-2 font-body max-sm:hidden">
                      {t('values.hover')}
                    </p>
                    <p className="text-neutral-500 text-sm mt-2 font-body sm:hidden">
                      {t('values.tap')}
                    </p>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-amber-400 rounded-2xl p-8 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h3 className="font-display max-sm:text-xl text-2xl text-neutral-900 text-center mb-4 font-bold">
                      {value.title}
                    </h3>
                    <p className="text-neutral-800 leading-relaxed text-sm font-body text-center">
                      {value.description}
                    </p>
                  </div>

                </div>
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
              {t('process.title')}
            </h2>
            <p className="text-white/80 leading-relaxed font-body">
              {t('process.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
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
              {t('cta.title')}
            </h2>
            <p className="text-flour-300 leading-relaxed mb-10 font-body">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/bestall"
                className="inline-flex items-center justify-center px-8 py-4 bg-crust-800 text-crust-200 font-body font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-crust-900"
              >
                {t('cta.btn_primary')}
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-flour-50 font-body font-medium tracking-wide border-2 border-flour-50 rounded-sm transition-all duration-300 hover:bg-flour-50 hover:text-black"
              >
                {t('cta.btn_secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}