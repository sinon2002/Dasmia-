"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionCenteredHero from "@/components/sections/DirectionCenteredHero";
import DirectionAtmosphereSection from "@/components/sections/DirectionAtmosphereSection";
import DirectionScrapbookSection from "@/components/sections/DirectionScrapbookSection";
import ContactMapSection from "@/components/sections/ContactMapSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const previewImages = [
  { url: "/assets/images/IMG_9000.webp", alt: "Интерьер чайханы DASMIA", caption: "ЧАЙНАЯ ЦЕРЕМОНИЯ" },
  { url: "/assets/images/IMG_9005.webp", alt: "Национальные блюда чайханы DASMIA", caption: "АУТЕНТИЧНАЯ КУХНЯ" },
  { url: "/assets/images/IMG_9007.webp", alt: "Приватные ниши чайханы DASMIA", caption: "ПРИВАТНЫЕ НИШИ" },
];

const stripImages = [
  { url: "/assets/images/IMG_9000.webp", alt: "Традиционный интерьер чайханы DASMIA" },
  { url: "/assets/images/IMG_9005.webp", alt: "Дастархан с национальными угощениями" },
  { url: "/assets/images/IMG_9007.webp", alt: "Уютная зона отдыха чайханы DASMIA" },
  { url: "/assets/images/IMG_9018.webp", alt: "Художественные панно чайханы DASMIA" },
  { url: "/assets/images/IMG_8902.webp", alt: "Летняя веранда чайханы в парковой зоне" },
  { url: "/assets/images/IMG_9049.webp", alt: "Атмосфера восточного гостеприимства DASMIA" },
];

const featureImages = [
  "/assets/images/IMG_9000.webp",
  "/assets/images/IMG_9005.webp",
  "/assets/images/IMG_9007.webp",
];

export default function ChaikhanaPage() {
  const { language } = useLanguage();
  const data = directionsContent.chaikhana[language] || directionsContent.chaikhana.ru;

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
          backgroundImage="/assets/images/IMG_9000.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ЧАСЫ РАБОТЫ"] || "10:00 – 23:00"}
          seats={detailsMap["ПОСАДОЧНЫХ МЕСТ"] || "150+ мест"}
          phone={"[CLIENT PHONE]"}
          dataDirection="chaikhana"
        />

        <DirectionAtmosphereSection
          label={data.intro.label}
          bodyText={data.intro.body}
          previewImages={previewImages}
          stripImages={stripImages}
          tagline={`${data.intro.heading} ${data.intro.headingItalic}`}
          dataDirection="chaikhana"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          dataDirection="chaikhana"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
