"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionCenteredHero from "@/components/sections/DirectionCenteredHero";
import DirectionAtmosphereSection from "@/components/sections/DirectionAtmosphereSection";
import DirectionScrapbookSection from "@/components/sections/DirectionTriFeatureSection";
import DirectionStaticGallery from "@/components/sections/DirectionStaticGallery";
import ContactMapSection from "@/components/sections/ContactMapSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";
import { useDirectionGallery } from "@/lib/api";

const previewImages = [
  { url: "/assets/images/fitness-weights-room.webp", alt: "Тренажёрный зал фитнес-клуба DASMIA", caption: "ТРЕНАЖЁРНЫЙ ЗАЛ" },
  { url: "/assets/images/fitness-spin-couple.webp", alt: "Групповое сайкл-занятие в фитнес-клубе DASMIA", caption: "ГРУППОВЫЕ ЗАНЯТИЯ" },
  { url: "/assets/images/fitness-trainers-team.webp", alt: "Команда тренеров фитнес-клуба DASMIA", caption: "ПЕРСОНАЛЬНЫЙ ТРЕНИНГ" },
];

const galleryImages = [
  { url: "/assets/images/fitness-hero-spin.webp", alt: "Сайкл-тренировка в фитнес-клубе DASMIA" },
  { url: "/assets/images/fitness-weights-room.webp", alt: "Тренажёрный зал фитнес-клуба DASMIA" },
  { url: "/assets/images/fitness-trainers-team.webp", alt: "Команда тренеров фитнес-клуба DASMIA" },
  { url: "/assets/images/fitness-spin-couple.webp", alt: "Групповое сайкл-занятие в фитнес-клубе DASMIA" },
  { url: "/assets/images/fitness-woman-dumbbells.webp", alt: "Силовая тренировка с гантелями" },
];

const featureImages = [
  "/assets/images/fitness-weights-room.webp",
  "/assets/images/fitness-spin-couple.webp",
  "/assets/images/fitness-trainers-team.webp",
];

export default function FitnessPage() {
  const { language } = useLanguage();
  const data = directionsContent.fitness[language] || directionsContent.fitness.ru;

  // CMS-backed images from the Django backend, when available. Falls back
  // to the static arrays above when the backend/admin has no data yet.
  const { gallery } = useDirectionGallery("fitness", language);

  const previewImagesResolved = previewImages.map((img, i) =>
    gallery && gallery[i] ? { ...img, url: gallery[i].url } : img,
  );
  const galleryImagesResolved = gallery && gallery.length > 0 ? gallery : galleryImages;
  const featureImagesResolved =
    gallery && gallery.length > 0 ? gallery.slice(0, 3).map((img) => img.url) : featureImages;

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
      image: featureImagesResolved[0],
      imageAlt: data.featuresSection.features[0].title,
    },
    {
      number: data.featuresSection.features[1].number,
      title: data.featuresSection.features[1].title,
      description: data.featuresSection.features[1].description,
      image: featureImagesResolved[1],
      imageAlt: data.featuresSection.features[1].title,
    },
    {
      number: data.featuresSection.features[2].number,
      title: data.featuresSection.features[2].title,
      description: data.featuresSection.features[2].description,
      image: featureImagesResolved[2],
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
          previewImages={previewImagesResolved}
          dataDirection="fitness"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          dataDirection="fitness"
        />

        <DirectionStaticGallery
          tagline="Пространство, где дисциплина превращается в результат"
          images={galleryImagesResolved}
          dataDirection="fitness"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
