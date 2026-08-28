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
    alt: "Территория спортивно-оздоровительного комплекса DASMIA",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_8920.webp",
    alt: "Открытая площадка для тренировок и активности",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_8936.webp",
    alt: "Инфраструктура и зоны отдыха фитнес-клуба DASMIA",
  },
  {
    url: "/assets/images/IMG_8911.webp",
    alt: "Окружающий парк для пробежек на свежем воздухе",
  },
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Интерьер и зоны восстановления комплекса DASMIA",
  },
  {
    url: "/assets/images/IMG_2161.webp",
    alt: "Главный вход в оздоровительный комплекс DASMIA",
  },
];

export default function FitnessPage() {
  const { language } = useLanguage();
  const data = directionsContent.fitness[language] || directionsContent.fitness.ru;

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
          dataDirection="fitness"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="fitness"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_8920.webp"
          imageAlt="Современный оздоровительный комплекс DASMIA"
          imageRight={false}
          dataDirection="fitness"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="fitness"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="fitness"
        />
      </main>
      <Footer />
    </>
  );
}
