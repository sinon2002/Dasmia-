"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionShowcaseHero from "@/components/sections/DirectionShowcaseHero";
import DirectionIntro from "@/components/sections/DirectionIntro";
import DirectionShowcaseGrid from "@/components/sections/DirectionShowcaseGrid";
import DirectionGallery from "@/components/sections/DirectionGallery";
import DirectionCTA from "@/components/sections/DirectionCTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const stripImages = [
  { url: "/assets/images/IMG_9009.webp", alt: "Главный банкетный зал DASMIA", arch: true },
  { url: "/assets/images/IMG_8995.webp", alt: "Сервировка праздничного стола DASMIA" },
  { url: "/assets/images/IMG_9027.webp", alt: "Свадебная сцена DASMIA", arch: true },
  { url: "/assets/images/IMG_9049.webp", alt: "Атмосфера торжества DASMIA" },
  { url: "/assets/images/IMG_9018.webp", alt: "Художественные рельефы DASMIA", arch: true },
  { url: "/assets/images/IMG_9031.webp", alt: "Праздничный вечер DASMIA" },
];

const galleryImages = [
  { url: "/assets/images/IMG_9009.webp", alt: "Главный банкетный зал Айкөл Ордо с мозаичным куполом", span: "wide" as const },
  { url: "/assets/images/IMG_8995.webp", alt: "Сервировка праздничного стола в банкетном зале DASMIA", span: "tall" as const },
  { url: "/assets/images/IMG_9027.webp", alt: "Свадебная сцена и национальные декорации DASMIA" },
  { url: "/assets/images/IMG_9049.webp", alt: "Атмосфера торжества и балкон банкетного зала" },
  { url: "/assets/images/IMG_9018.webp", alt: "Художественные рельефы и лаунж-зона комплекса" },
  { url: "/assets/images/IMG_9031.webp", alt: "Праздничный вечер в банкетном зале DASMIA" },
];

const hallImages = [
  "/assets/images/IMG_9009.webp",
  "/assets/images/IMG_9027.webp",
  "/assets/images/IMG_9049.webp",
];

export default function BanquetPage() {
  const { language } = useLanguage();
  const data = directionsContent.banquet[language] || directionsContent.banquet.ru;

  const showcaseItems = data.featuresSection.features.map((f, i) => ({
    image: hallImages[i] || hallImages[0],
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
          images={stripImages}
          dataDirection="banquet"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="banquet"
        />

        <DirectionShowcaseGrid
          heading={data.featuresSection.heading}
          items={showcaseItems}
          dataDirection="banquet"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="banquet"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="banquet"
        />
      </main>
      <Footer />
    </>
  );
}
