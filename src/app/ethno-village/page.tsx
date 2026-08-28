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
    url: "/assets/images/IMG_2160.webp",
    alt: "Этно-село DASMIA — традиционные юрты с кыргызскими орнаментами в окружении осеннего парка",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_8902.webp",
    alt: "Парковая зона и беседки этно-комплекса",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_8929.webp",
    alt: "Национальные росписи и цветочные сады этно-села",
  },
  {
    url: "/assets/images/IMG_8936.webp",
    alt: "Архитектура и дорожки этно-комплекса DASMIA",
  },
  {
    url: "/assets/images/IMG_8911.webp",
    alt: "Осенняя природа и тенистые аллеи комплекса",
  },
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Художественные барельефы с мотивами кочевой культуры",
  },
];

export default function EthnoVillagePage() {
  const { language } = useLanguage();
  const data =
    directionsContent["ethno-village"][language] ||
    directionsContent["ethno-village"].ru;

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
          imageUrl="/assets/images/IMG_2160.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="ethno-village"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="ethno-village"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_8929.webp"
          imageAlt="Интерьер традиционной кыргызской юрты с богатыми орнаментами"
          imageRight={true}
          dataDirection="ethno-village"
        />

        {data.secondFeaturesSection && (
          <DirectionFeatures
            label={data.secondFeaturesSection.label}
            heading={data.secondFeaturesSection.heading}
            features={data.secondFeaturesSection.features}
            imageUrl="/assets/images/IMG_8936.webp"
            imageAlt="Парковая территория этно-села DASMIA"
            imageRight={false}
            dataDirection="ethno-village"
          />
        )}

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="ethno-village"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="ethno-village"
        />
      </main>
      <Footer />
    </>
  );
}
