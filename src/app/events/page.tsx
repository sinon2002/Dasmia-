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
  { url: "/assets/images/IMG_9031.webp", alt: "Зал для конференций и форумов DASMIA", caption: "КОНФЕРЕНЦИИ И ФОРУМЫ" },
  { url: "/assets/images/IMG_9009.webp", alt: "Зал для тренингов и семинаров DASMIA", caption: "ТРЕНИНГИ И СЕМИНАРЫ" },
  { url: "/assets/images/IMG_9007.webp", alt: "Техническое оснащение зала DASMIA — свет, звук, экраны", caption: "ТЕХНИЧЕСКОЕ ОСНАЩЕНИЕ" },
];

const galleryImages = [
  { url: "/assets/images/IMG_9002.webp", alt: "Панорама зала для мероприятий DASMIA" },
  { url: "/assets/images/IMG_9031.webp", alt: "Зал для конференций и форумов DASMIA" },
  { url: "/assets/images/IMG_9009.webp", alt: "Зал для тренингов и семинаров DASMIA" },
  { url: "/assets/images/IMG_9007.webp", alt: "Техническое оснащение зала DASMIA" },
];

export default function EventsPage() {
  const { language } = useLanguage();
  const data = directionsContent.events[language] || directionsContent.events.ru;

  // CMS-backed images from the Django backend, when available. Falls back
  // to the static arrays above when the backend/admin has no data yet.
  const { gallery } = useDirectionGallery("events", language);

  const previewImagesResolved = previewImages.map((img, i) =>
    gallery && gallery[i] ? { ...img, url: gallery[i].url } : img,
  );
  const galleryImagesResolved = gallery && gallery.length > 0 ? gallery : galleryImages;

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
      image: gallery && gallery[0] ? gallery[0].url : "/assets/images/IMG_9031.webp",
      imageAlt: data.featuresSection.features[0].title,
    },
    {
      number: data.featuresSection.features[1].number,
      title: data.featuresSection.features[1].title,
      description: data.featuresSection.features[1].description,
      image: gallery && gallery[1] ? gallery[1].url : "/assets/images/IMG_9009.webp",
      imageAlt: data.featuresSection.features[1].title,
    },
    {
      number: data.featuresSection.features[2].number,
      title: data.featuresSection.features[2].title,
      description: data.featuresSection.features[2].description,
      image: gallery && gallery[2] ? gallery[2].url : "/assets/images/IMG_9007.webp",
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
          backgroundImage="/assets/images/IMG_9002.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ФОРМАТ"] || "Конференции и тренинги"}
          hoursLabel="ФОРМАТ"
          seatsLabel="ВМЕСТИМОСТЬ"
          seats={detailsMap["ВМЕСТИМОСТЬ"] || "до 500 участников"}
          phoneLabel="ОСНАЩЕНИЕ"
          phone={detailsMap["ОСНАЩЕНИЕ"] || "Свет, звук, экраны"}
          phoneIsLink={false}
          dataDirection="events"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImagesResolved}
          dataDirection="events"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          dataDirection="events"
        />

        <DirectionStaticGallery
          tagline="Пространство, где идеи становятся событиями"
          images={galleryImagesResolved}
          dataDirection="events"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
