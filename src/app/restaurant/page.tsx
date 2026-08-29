"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionCenteredHero from "@/components/sections/DirectionCenteredHero";
import DirectionAtmosphereSection from "@/components/sections/DirectionAtmosphereSection";
import DirectionScrapbookSection from "@/components/sections/DirectionScrapbookSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const previewImages = [
  { url: "/assets/images/IMG_8995.webp", alt: "Авторское блюдо ресторана DASMIA", caption: "АВТОРСКОЕ МЕНЮ" },
  { url: "/assets/images/IMG_8997.webp", alt: "Винная карта ресторана DASMIA", caption: "ВИННАЯ КАРТА" },
  { url: "/assets/images/IMG_9000.webp", alt: "VIP-зал ресторана DASMIA", caption: "ЧАСТНЫЕ УЖИНЫ" },
];

const stripImages = [
  { url: "/assets/images/IMG_8995.webp", alt: "Сервировка стола в ресторане DASMIA" },
  { url: "/assets/images/IMG_9000.webp", alt: "VIP-зал ресторана с национальным убранством" },
  { url: "/assets/images/IMG_9049.webp", alt: "Просторный зал ресторана с балконом" },
  { url: "/assets/images/IMG_8902.webp", alt: "Летняя веранда ресторана в парковой зоне" },
  { url: "/assets/images/IMG_9018.webp", alt: "Интерьерные панно и атмосфера ресторана DASMIA" },
  { url: "/assets/images/IMG_9009.webp", alt: "Панорамный вид на обеденную зону комплекса" },
];

const featureImages = [
  "/assets/images/IMG_8995.webp",
  "/assets/images/IMG_8997.webp",
  "/assets/images/IMG_9000.webp",
];

export default function RestaurantPage() {
  const { language } = useLanguage();
  const data = directionsContent.restaurant[language] || directionsContent.restaurant.ru;

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
          backgroundImage="/assets/images/IMG_8995.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ЧАСЫ РАБОТЫ"] || "11:00 – 00:00"}
          seats={detailsMap["ПОСАДОЧНЫХ МЕСТ"] || "200+ мест"}
          phone={detailsMap["БРОНИРОВАНИЕ"] || "[CLIENT PHONE]"}
          dataDirection="restaurant"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImages}
          stripImages={stripImages}
          tagline={`27 лет создаём атмосферу в том самом DASMIA`}
          dataDirection="restaurant"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          dataDirection="restaurant"
        />
      </main>
      <Footer />
    </>
  );
}
