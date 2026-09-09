"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionShowcaseHero from "@/components/sections/DirectionShowcaseHero";
import DirectionIntro from "@/components/sections/DirectionIntro";
import DirectionShowcaseGrid from "@/components/sections/DirectionShowcaseGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";
import { fetchDirection, getApiGalleryImageTitle, type ApiDirection } from "@/lib/api";

const stripImages = [
  { url: "/assets/images/IMG_9009.webp", alt: "Главный банкетный зал DASMIA", arch: true },
  { url: "/assets/images/IMG_8995.webp", alt: "Сервировка праздничного стола DASMIA" },
  { url: "/assets/images/IMG_9027.webp", alt: "Свадебная сцена DASMIA", arch: true },
  { url: "/assets/images/IMG_9049.webp", alt: "Атмосфера торжества DASMIA" },
  { url: "/assets/images/IMG_9018.webp", alt: "Художественные рельефы DASMIA", arch: true },
  { url: "/assets/images/IMG_9031.webp", alt: "Праздничный вечер DASMIA" },
];

const hallImages = [
  "/assets/images/IMG_9009.webp",
  "/assets/images/IMG_9027.webp",
  "/assets/images/IMG_9049.webp",
];

export default function BanquetPage() {
  const { language } = useLanguage();
  const data = directionsContent.banquet[language] || directionsContent.banquet.ru;

  // CMS-backed images from the Django backend, when available. Stays
  // null (and the page keeps using the static arrays above) if the
  // backend/admin isn't reachable or hasn't been filled in yet.
  const [apiDirection, setApiDirection] = useState<ApiDirection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDirection("banquet").then((result) => {
      if (!cancelled) setApiDirection(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const galleryFromApi =
    apiDirection && apiDirection.gallery_images.length > 0
      ? [...apiDirection.gallery_images]
          .sort((a, b) => a.order - b.order)
          .map((img) => ({
            url: img.image,
            alt: getApiGalleryImageTitle(img, language, apiDirection.name),
            arch: img.span === "wide",
          }))
      : null;

  const heroImages = galleryFromApi || stripImages;

  const hallImagesResolved =
    galleryFromApi && galleryFromApi.length > 0
      ? galleryFromApi.slice(0, 3).map((img) => img.url)
      : hallImages;

  const showcaseItems = data.featuresSection.features.map((f, i) => ({
    image: hallImagesResolved[i] || hallImagesResolved[0],
    imageAlt: f.title,
    title: f.title,
    description: f.description,
    linkLabel: data.cta.primaryLabel,
  }));

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <DirectionShowcaseHero
          category={data.hero.category}
          title={`${data.hero.title} ${data.hero.subtitle || ""}`.trim()}
          description={data.hero.description}
          images={heroImages}
          dataDirection="banquet"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          dataDirection="banquet"
        />

        <DirectionShowcaseGrid
          heading={data.featuresSection.heading}
          items={showcaseItems}
          dataDirection="banquet"
        />
      </main>
      <Footer />
    </>
  );
}
