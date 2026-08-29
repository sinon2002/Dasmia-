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

export default function ChaikhanaPage() {
  const { language } = useLanguage();
  const data = directionsContent.chaikhana[language] || directionsContent.chaikhana.ru;

  const detailsMap = Object.fromEntries(
    data.intro.details.map((d) => [d.label, d.value]),
  );

  const f = data.featuresSection.features;

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
          bigText={data.cta.description}
          smallText1={f[0].description}
          smallText2={f[2].description}
          photoTopLeft={{ image: "/assets/images/IMG_9018.webp", imageAlt: f[0].title }}
          photoTopRight={{ image: "/assets/images/IMG_9007.webp", imageAlt: f[1].title }}
          photoBottomLeft={{ image: "/assets/images/IMG_8902.webp", imageAlt: "Дастархан чайханы DASMIA" }}
          photoBottomRight={{ image: "/assets/images/IMG_9049.webp", imageAlt: f[2].title }}
          dataDirection="chaikhana"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
