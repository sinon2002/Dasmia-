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
    url: "/assets/images/IMG_9000.webp",
    alt: "Интерьер чайханы DASMIA с традиционными элементами декора",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_8995.webp",
    alt: "Национальные угощения и дастархан в чайхане DASMIA",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_9005.webp",
    alt: "Уютный зал чайханы DASMIA для бесед и отдыха",
  },
  {
    url: "/assets/images/IMG_9007.webp",
    alt: "Традиционная сервировка стола и детали убранства",
  },
  {
    url: "/assets/images/IMG_8902.webp",
    alt: "Летняя терраса и беседки чайханы на свежем воздухе",
  },
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Декоративные резные панно и этно-мотивы",
  },
];

export default function ChaikhanaPage() {
  const { language } = useLanguage();
  const data = directionsContent.chaikhana[language] || directionsContent.chaikhana.ru;

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
          imageUrl="/assets/images/IMG_9000.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="chaikhana"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="chaikhana"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_9002.webp"
          imageAlt="Традиционный интерьер чайханы DASMIA"
          imageRight={true}
          dataDirection="chaikhana"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="chaikhana"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="chaikhana"
        />
      </main>
      <Footer />
    </>
  );
}
