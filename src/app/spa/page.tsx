"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectionHero from "@/components/sections/DirectionHero";
import DirectionIntro from "@/components/sections/DirectionIntro";
import DirectionFeatures from "@/components/sections/DirectionFeatures";
import DirectionGallery from "@/components/sections/DirectionGallery";
import DirectionCTA from "@/components/sections/DirectionCTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { directionsContent } from "@/lib/directionsContent";

const galleryImages = [
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Релакс-зона SPA DASMIA с авторскими барельефами из дерева и камня",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_9000.webp",
    alt: "Уютная комната отдыха и восстановления SPA",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_8902.webp",
    alt: "Павильоны для отдыха на свежем воздухе",
  },
  {
    url: "/assets/images/IMG_8920.webp",
    alt: "Парковая территория вокруг SPA-центра",
  },
  {
    url: "/assets/images/IMG_2160.webp",
    alt: "Этно-бани и юрты для оздоровительных процедур",
  },
  {
    url: "/assets/images/IMG_9005.webp",
    alt: "Зона чайных церемоний и травяных сборов после процедур",
  },
];

export default function SpaPage() {
  const { language } = useLanguage();
  const data = directionsContent.spa[language] || directionsContent.spa.ru;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <DirectionHero
          category={data.hero.category}
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          description={data.hero.description}
          imageUrl="/assets/images/IMG_9018.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="spa"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="spa"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_9000.webp"
          imageAlt="Кабинет массажа и релаксации SPA DASMIA"
          imageRight={false}
          dataDirection="spa"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="spa"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="spa"
        />
      </main>
      <Footer />
    </>
  );
}
