"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionCenteredHero from "@/components/sections/DirectionCenteredHero";
import DirectionAtmosphereSection from "@/components/sections/DirectionAtmosphereSection";
import DirectionScrapbookSection from "@/components/sections/DirectionTriFeatureSection";
import ContactMapSection from "@/components/sections/ContactMapSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const previewImages = [
  { url: "/assets/images/fitness-weights-room.webp", alt: "Тренажёрный зал фитнес-клуба DASMIA", caption: "ТРЕНАЖЁРНЫЙ ЗАЛ" },
  { url: "/assets/images/fitness-spin-couple.webp", alt: "Групповое сайкл-занятие в фитнес-клубе DASMIA", caption: "ГРУППОВЫЕ ЗАНЯТИЯ" },
  { url: "/assets/images/fitness-trainers-team.webp", alt: "Команда тренеров фитнес-клуба DASMIA", caption: "ПЕРСОНАЛЬНЫЙ ТРЕНИНГ" },
];

const stripImages = [
  { url: "/assets/images/fitness-hero-spin.webp", alt: "Сайкл-тренировка в фитнес-клубе DASMIA" },
  { url: "/assets/images/IMG_8920.webp", alt: "Зона свободных весов фитнес-клуба DASMIA" },
  { url: "/assets/images/fitness-woman-dumbbells.webp", alt: "Силовая тренировка с гантелями" },
  { url: "/assets/images/IMG_8936.webp", alt: "Инфраструктура и зоны отдыха фитнес-клуба DASMIA" },
  { url: "/assets/images/fitness-trainers-team.webp", alt: "Команда тренеров фитнес-клуба DASMIA" },
  { url: "/assets/images/IMG_8911.webp", alt: "Территория рядом с фитнес-клубом DASMIA" },
];

const featureImages = [
  "/assets/images/fitness-weights-room.webp",
  "/assets/images/fitness-spin-couple.webp",
  "/assets/images/fitness-trainers-team.webp",
];

export default function FitnessPage() {
  const { language } = useLanguage();
  const data = directionsContent.fitness[language] || directionsContent.fitness.ru;

  const detailsMap = Object.fromEntries(
    data.intro.details.map((d) => [d.label, d.value]),
  );

  const scrapbookFeatures: [
    { number: string; title: string; description: string; image: string; imageAlt: string },
    { number: string; title: string; description: string; image: string; imageAlt: string },
    { number: string; title: string; description: string; image: string; imageAlt: string },
  ] = [
    {
      number: data.featuresSection.features[0].number,
      title: data.featuresSection.features[0].title,
      description: data.featuresSection.features[0].description,
      image: featureImages[0],
      imageAlt: data.featuresSection.features[0].title,
    },
    {
      number: data.featuresSection.features[1].number,
      title: data.featuresSection.features[1].title,
      description: data.featuresSection.features[1].description,
      image: featureImages[1],
      imageAlt: data.featuresSection.features[1].title,
    },
    {
      number: data.featuresSection.features[2].number,
      title: data.featuresSection.features[2].title,
      description: data.featuresSection.features[2].description,
      image: featureImages[2],
      imageAlt: data.featuresSection.features[2].title,
    },
  ];

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <DirectionCenteredHero
          category={data.hero.category}
          title={data.hero.title}
          description={data.hero.description}
          backgroundImage="/assets/images/fitness-hero-spin.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ЧАСЫ РАБОТЫ"] || "07:00 – 23:00"}
          seats={detailsMap["ПЛОЩАДЬ"] || "1200+ м²"}
          seatsLabel="ПЛОЩАДЬ"
          phone={detailsMap["ТРЕНАЖЁРОВ"] || "80+ единиц"}
          phoneLabel="ОБОРУДОВАНИЕ"
          phoneIsLink={false}
          dataDirection="fitness"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImages}
          stripImages={stripImages}
          tagline="Пространство, где дисциплина превращается в результат"
          dataDirection="fitness"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          dataDirection="fitness"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
