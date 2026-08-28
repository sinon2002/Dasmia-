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
    url: "/assets/images/IMG_8902.webp",
    alt: "Территория аквазоны и открытые павильоны комплекса DASMIA",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_8911.webp",
    alt: "Парковая зона отдыха у воды комплекса DASMIA",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_8920.webp",
    alt: "Беседки и павильоны для отдыха на свежем воздухе",
  },
  {
    url: "/assets/images/IMG_8936.webp",
    alt: "Благоустроенная территория и зоны релаксации",
  },
  {
    url: "/assets/images/IMG_8929.webp",
    alt: "Цветочные сады и ландшафт аквакомплекса",
  },
  {
    url: "/assets/images/IMG_2160.webp",
    alt: "Панорама комплекса DASMIA",
  },
];

export default function PoolsPage() {
  const { language } = useLanguage();
  const data = directionsContent.pools[language] || directionsContent.pools.ru;

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
          imageUrl="/assets/images/IMG_8902.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="pools"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="pools"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_8911.webp"
          imageAlt="Главный бассейн DASMIA с профессиональными дорожками"
          imageRight={true}
          dataDirection="pools"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="pools"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="pools"
        />
      </main>
      <Footer />
    </>
  );
}
