import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategoryPillsSection from "@/components/sections/CategoryPillsSection";
import MetricsSection from "@/components/sections/MetricsSection";
import HistorySection from "@/components/sections/HistorySection";
import CorporateSection from "@/components/sections/CorporateSection";
import EventCTASection from "@/components/sections/EventCTASection";
import ContactMapSection from "@/components/sections/ContactMapSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "DASMIA — Один комплекс. Множество возможностей.",
  description:
    "DASMIA — премиальный многофункциональный комплекс в Бишкеке: банкетные залы, ресторан, чайхана, фитнес-клуб, бассейны, SPA, этно-село и мероприятия.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DASMIA — Один комплекс. Множество возможностей.",
    description:
      "Восемь направлений премиального отдыха и гастрономии под одной крышей в Бишкеке.",
    url: "/",
    siteName: "DASMIA",
    locale: "ru_KG",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Header />

      <main id="main-content">
        {/* 01 Hero */}
        <HeroSection />

        {/* 01b Category Pills */}
        <CategoryPillsSection />

        {/* 03 Key Metrics */}
        <MetricsSection />

        {/* 06 History */}
        <HistorySection />

        {/* 07 Corporate */}
        <CorporateSection />

        {/* 08 Event CTA */}
        <EventCTASection />

        {/* 08b Contact Map */}
        <ContactMapSection />

        {/* 09 Contact Form */}
        <ContactSection />
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DASMIA",
            legalName: "ОсОО «Фирма «Дасмия»",
            url: "https://dasmia.kg",
            logo: "/assets/dasmia-wordmark.svg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Анкара 2Б",
              addressLocality: "Бишкек",
              addressCountry: "KG",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "[CLIENT PHONE]",
              contactType: "customer service",
              availableLanguage: ["Russian", "Kyrgyz", "English"],
            },
            description:
              "Премиальный многофункциональный комплекс в Бишкеке с 8 направлениями: банкетные залы, ресторан, чайхана, фитнес-клуб, бассейны, SPA, этно-село и мероприятия.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "DASMIA — Главная",
            url: "https://dasmia.kg",
            description:
              "Официальный сайт DASMIA — премиального многофункционального комплекса в Бишкеке, Кыргызстан.",
            inLanguage: "ru",
          }),
        }}
      />
    </>
  );
}
