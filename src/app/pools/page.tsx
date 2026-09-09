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
  { url: "/assets/images/pools-swimmer-goggles.webp", alt: "Пловец в главном бассейне DASMIA", caption: "ГЛАВНЫЙ БАССЕЙН" },
  { url: "/assets/images/pools-kids-group.webp", alt: "Детская зона бассейна DASMIA", caption: "ДЕТСКАЯ ЗОНА" },
  { url: "/assets/images/pools-lounge-empty.webp", alt: "Зона релаксации у бассейна DASMIA", caption: "ЗОНА РЕЛАКСАЦИИ" },
];

const galleryImages = [
  { url: "/assets/images/pools-hero-wide.webp", alt: "Панорама бассейна DASMIA" },
  { url: "/assets/images/pools-swimmer-goggles.webp", alt: "Пловец в главном бассейне DASMIA" },
  { url: "/assets/images/pools-kids-group.webp", alt: "Детская зона бассейна DASMIA" },
  { url: "/assets/images/pools-lounge-empty.webp", alt: "Зона релаксации у бассейна DASMIA" },
];

const featureImages = [
  "/assets/images/pools-swimmer-goggles.webp",
  "/assets/images/pools-kids-group.webp",
  "/assets/images/pools-lounge-empty.webp",
];

export default function PoolsPage() {
  const { language } = useLanguage();
  const data = directionsContent.pools[language] || directionsContent.pools.ru;

  // CMS-backed images from the Django backend, when available. Falls back
  // to the static arrays above when the backend/admin has no data yet.
  const { gallery } = useDirectionGallery("pools", language);

  const previewImagesResolved = previewImages.map((img, i) =>
    gallery && gallery[i] ? { ...img, url: gallery[i].url } : img,
  );
  const galleryImagesResolved = gallery && gallery.length > 0 ? gallery : galleryImages;
  const featureImagesResolved =
    gallery && gallery.length > 0 ? gallery.slice(0, 3).map((img) => img.url) : featureImages;
  const accentPhotosResolved: [
    { image: string; imageAlt: string },
    { image: string; imageAlt: string },
  ] =
    gallery && gallery.length > 1
      ? [
          { image: gallery[1].url, imageAlt: gallery[1].alt },
          { image: gallery[0].url, imageAlt: gallery[0].alt },
        ]
      : [
          { image: "/assets/images/pools-kids-group.webp", imageAlt: "Детская зона бассейна DASMIA" },
          { image: "/assets/images/pools-hero-wide.webp", imageAlt: "Панорама бассейна DASMIA" },
        ];

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
          backgroundImage="/assets/images/pools-hero-wide.webp"
          backgroundAlt={data.hero.imageAlt}
          ctaLabel={data.cta.primaryLabel}
          hours={detailsMap["ЧАСЫ РАБОТЫ"] || "07:00 – 23:00"}
          seatsLabel="ДЛИНА ДОРОЖКИ"
          seats={detailsMap["ДЛИНА ДОРОЖКИ"] || "25 метров"}
          phoneLabel="ТЕМПЕРАТУРА"
          phone={detailsMap["ТЕМПЕРАТУРА"] || "28°C комфорт"}
          phoneIsLink={false}
          dataDirection="pools"
        />

        <DirectionAtmosphereSection
          label={data.featuresSection.label}
          bodyText={data.intro.body}
          previewImages={previewImagesResolved}
          dataDirection="pools"
        />

        <DirectionScrapbookSection
          heading={data.featuresSection.heading}
          features={scrapbookFeatures}
          accentPhotos={accentPhotosResolved}
          dataDirection="pools"
        />

        <DirectionStaticGallery
          tagline="Пространство, где каждый заплыв становится моментом покоя"
          images={galleryImagesResolved}
          dataDirection="pools"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
