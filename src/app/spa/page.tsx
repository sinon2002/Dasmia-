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
  { url: "/assets/images/spa-massage-room.webp", alt: "Массажный кабинет SPA DASMIA", caption: "МАССАЖ" },
  { url: "/assets/images/spa-sauna-pool.webp", alt: "Сауна и купель SPA DASMIA", caption: "ХАММАМ И САУНА" },
  { url: "/assets/images/spa-candles-oils.webp", alt: "Косметический уход SPA DASMIA", caption: "КОСМЕТИЧЕСКИЙ УХОД" },
];

const galleryImages = [
  { url: "/assets/images/spa-massage-room.webp", alt: "Массажный кабинет SPA DASMIA" },
  { url: "/assets/images/spa-massage-bed-candles.webp", alt: "Массажная кушетка с ароматическими маслами" },
  { url: "/assets/images/spa-singing-bowls.webp", alt: "Сеанс звуковой терапии поющими чашами" },
  { url: "/assets/images/spa-sauna-pool.webp", alt: "Сауна и купель SPA DASMIA" },
  { url: "/assets/images/spa-candles-oils.webp", alt: "Косметический уход SPA DASMIA" },
];

const ornaments = [
  { src: "/assets/images/ornament-spa-red.webp", alt: "Кыргызский орнамент", size: 96, duration: 26 },
  { src: "/assets/images/ornament-spa-gold.webp", alt: "Кыргызский орнамент", size: 90, duration: 19, reverse: true },
  { src: "/assets/images/ornament-spa-navy.webp", alt: "Кыргызский орнамент", size: 84, duration: 14 },
];

export default function SpaPage() {
  const { language } = useLanguage();
  const data = directionsContent.spa[language] || directionsContent.spa.ru;

  // CMS-backed images from the Django backend, when available. Falls back
  // to the static arrays above when the backend/admin has no data yet.
  const { gallery } = useDirectionGallery("spa", language);

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
      image: gallery && gallery[0] ? gallery[0].url : "/assets/images/spa-massage-room.webp",
      imageAlt: data.featuresSection.features[0].title,
    },
    {
      number: data.featuresSection.features[1].number,
      title: data.featuresSection.features[1].title,
      description: data.featuresSection.features[1].description,
      image: gallery && gallery[1] ? gallery[1].url : "/assets/images/spa-sauna-pool.webp",
      imageAlt: data.featuresSection.features[1].title,
    },
    {
      number: data.featuresSection.features[2].number,
      title: data.featuresSection.features[2].title,
      description: data.featuresSection.features[2].description,
      image: gallery && gallery[2] ? gallery[2].url : "/assets/images/spa-candles-oils.webp",
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
          backgroundImage="/assets/images/spa-massage-room.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ЧАСЫ РАБОТЫ"] || "09:00 – 22:00"}
          seatsLabel="ПРОЦЕДУР"
          seats={detailsMap["ПРОЦЕДУР"] || "30+ ритуалов"}
          phoneLabel="КАБИНЕТОВ"
          phone={detailsMap["КАБИНЕТОВ"] || "Приватные сьюты"}
          phoneIsLink={false}
          dataDirection="spa"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImagesResolved}
          dataDirection="spa"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          variant="compact"
          ornaments={ornaments}
          dataDirection="spa"
        />

        <DirectionStaticGallery
          tagline="Пространство, где время замедляется ради вас"
          images={galleryImagesResolved}
          dataDirection="spa"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
