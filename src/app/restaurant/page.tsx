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
    url: "/assets/images/IMG_8995.webp",
    alt: "Сервировка и гастрономические блюда ресторана DASMIA",
    span: "wide" as const,
  },
  {
    url: "/assets/images/IMG_9000.webp",
    alt: "VIP-зал ресторана с национальным убранством",
    span: "tall" as const,
  },
  {
    url: "/assets/images/IMG_9049.webp",
    alt: "Просторный зал ресторана с балконом",
  },
  {
    url: "/assets/images/IMG_8902.webp",
    alt: "Летняя веранда ресторана в парковой зоне",
  },
  {
    url: "/assets/images/IMG_9018.webp",
    alt: "Интерьерные панно и атмосфера ресторана DASMIA",
  },
  {
    url: "/assets/images/IMG_9009.webp",
    alt: "Панорамный вид на обеденную зону комплекса",
  },
];

export default function RestaurantPage() {
  const { language } = useLanguage();
  const data = directionsContent.restaurant[language] || directionsContent.restaurant.ru;

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
          imageUrl="/assets/images/IMG_8995.webp"
          imageAlt={data.hero.imageAlt}
          dataDirection="restaurant"
        />

        <DirectionIntro
          label={data.intro.label}
          heading={data.intro.heading}
          headingItalic={data.intro.headingItalic}
          body={data.intro.body}
          details={data.intro.details}
          dataDirection="restaurant"
        />

        <DirectionFeatures
          label={data.featuresSection.label}
          heading={data.featuresSection.heading}
          features={data.featuresSection.features}
          imageUrl="/assets/images/IMG_8997.webp"
          imageAlt="Авторские блюда шеф-повара ресторана DASMIA"
          imageRight={false}
          dataDirection="restaurant"
        />

        <DirectionGallery
          label={data.gallery.label}
          heading={data.gallery.heading}
          images={galleryImages}
          dataDirection="restaurant"
        />

        <DirectionCTA
          heading={data.cta.heading}
          headingItalic={data.cta.headingItalic}
          description={data.cta.description}
          primaryLabel={data.cta.primaryLabel}
          secondaryLabel={data.cta.secondaryLabel}
          dataDirection="restaurant"
        />
      </main>
      <Footer />
    </>
  );
}
