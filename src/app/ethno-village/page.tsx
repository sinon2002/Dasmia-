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

const previewImages = [
  { url: "/assets/images/IMG_2160.webp", alt: "Традиционная юрта этно-села DASMIA", caption: "АУТЕНТИЧНЫЕ ЮРТЫ" },
  { url: "/assets/images/IMG_9005.webp", alt: "Национальная кухня и этно-бар DASMIA", caption: "НАЦИОНАЛЬНАЯ КУХНЯ" },
  { url: "/assets/images/IMG_9018.webp", alt: "Резные орнаменты ручной работы этно-села DASMIA", caption: "МАСТЕР-КЛАССЫ И РЕМЁСЛА" },
];

const galleryImages = [
  { url: "/assets/images/IMG_9009.webp", alt: "Праздничный зал этно-села с росписью в кочевых мотивах" },
  { url: "/assets/images/IMG_2160.webp", alt: "Традиционная юрта этно-села DASMIA" },
  { url: "/assets/images/IMG_9005.webp", alt: "Национальная кухня и этно-бар DASMIA" },
  { url: "/assets/images/IMG_9000.webp", alt: "Интерьер с кыргызскими коврами-шырдаками" },
  { url: "/assets/images/IMG_8936.webp", alt: "Территория и дорожки этно-комплекса DASMIA" },
  { url: "/assets/images/IMG_8911.webp", alt: "Осенняя природа и тенистые аллеи комплекса" },
];

const ornaments = [
  { src: "/assets/images/ornament-ethno-blue.webp", alt: "Кыргызский орнамент", size: 108, duration: 24 },
  { src: "/assets/images/ornament-ethno-red.webp", alt: "Кыргызский орнамент", size: 86, duration: 18, reverse: true },
  { src: "/assets/images/ornament-ethno-gold.webp", alt: "Кыргызский орнамент", size: 70, duration: 13 },
];

export default function EthnoVillagePage() {
  const { language } = useLanguage();
  const data =
    directionsContent["ethno-village"][language] ||
    directionsContent["ethno-village"].ru;

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
      image: "/assets/images/IMG_2160.webp",
      imageAlt: data.featuresSection.features[0].title,
    },
    {
      number: data.featuresSection.features[1].number,
      title: data.featuresSection.features[1].title,
      description: data.featuresSection.features[1].description,
      image: "/assets/images/IMG_9005.webp",
      imageAlt: data.featuresSection.features[1].title,
    },
    {
      number: data.featuresSection.features[2].number,
      title: data.featuresSection.features[2].title,
      description: data.featuresSection.features[2].description,
      image: "/assets/images/IMG_9018.webp",
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
          backgroundImage="/assets/images/IMG_9009.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["СЕЗОН"] || "Круглый год"}
          hoursLabel="СЕЗОН"
          seatsLabel="ЮРТ"
          seats={detailsMap["ЮРТ"] || "Аутентичные юрты"}
          phoneLabel="ВМЕСТИМОСТЬ"
          phone={detailsMap["ВМЕСТИМОСТЬ"] || "Для семей и групп"}
          phoneIsLink={false}
          dataDirection="ethno-village"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImages}
          dataDirection="ethno-village"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          ornaments={ornaments}
          dataDirection="ethno-village"
        />

        <DirectionStaticGallery
          tagline="Пространство, где кочевая культура оживает"
          images={galleryImages}
          dataDirection="ethno-village"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
