"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionHero from "@/components/sections/DirectionHero";
import DirectionIntro from "@/components/sections/DirectionIntro";
import DirectionFeatures from "@/components/sections/DirectionFeatures";
import DirectionGallery from "@/components/sections/DirectionGallery";
import DirectionCTA from "@/components/sections/DirectionCTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const galleryImages = [
  {
    url: "/assets/images/IMG_9009.webp",
    alt: "Главный банкетный зал Айкөл Ордо с мозаичным куполом",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_8995.webp",
    alt: "Сервировка праздничного стола в банкетном зале DASMIA",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_9027.webp",
    alt: "Свадебная сцена и национальные декорации DASMIA",
  },
  {
    url: "/assets/images/IMG_9049.webp",
    alt: "Атмосфера торжества и балкон банкетного зала",
  },
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Художественные рельефы и лаунж-зона комплекса",
  },
  {
    url: "/assets/images/IMG_9031.webp",
    alt: "Праздничный вечер в банкетном зале DASMIA",
  },
];

export default function BanquetPage() {
  const { language } = useLanguage();
  const data = directionsContent.banquet[language] || directionsContent.banquet.ru;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <DirectionHero
          category={data.hero.category}
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          description={data.hero.description}
          imageUrl="/assets/images/IMG_2161.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="banquet"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="banquet"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_9009.webp"
          imageAlt="Интерьер банкетного зала DASMIA"
          imageRight={true}
          dataDirection="banquet"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="banquet"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="banquet"
        />
      </main>
      <Footer />
    </>
  );
}
