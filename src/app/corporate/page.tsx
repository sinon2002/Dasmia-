"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppImage from "@/components/ui/AppImage";
import CorporateSection from "@/components/sections/CorporateSection";
import DirectionCTA from "@/components/sections/DirectionCTA";
import ContactMapSection from "@/components/sections/ContactMapSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function CorporatePage() {
  const { language } = useLanguage();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          className="relative min-h-screen flex flex-col justify-between overflow-hidden"
          style={{ minHeight: "100svh" }}
          aria-label={`${t(language, "nav.corporate")} — DASMIA`}
          data-content="corporate-hero"
        >
          <div className="absolute inset-0 z-0">
            <AppImage
              src="/assets/images/IMG_9031.webp"
              alt="Банкетный зал DASMIA для корпоративных приёмов и делегаций"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 z-10"
            style={{ background: "rgba(0,0,0,0.6)" }}
            aria-hidden="true"
          />

          {/* Breadcrumb */}
          <nav
            className="relative z-20 pt-28 px-6 lg:px-12 xl:px-16 flex items-center gap-2"
            aria-label="Breadcrumb Navigation"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
          >
            <Link
              href="/"
              className="text-muted-foreground hover:text-gold transition-colors duration-300"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
            >
              DASMIA
            </Link>
            <span className="text-muted-foreground opacity-40" style={{ fontSize: "10px" }}>
              /
            </span>
            <span className="text-gold" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
              {t(language, "nav.corporate")}
            </span>
          </nav>

          {/* Centered title + description */}
          <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
            <div
              className="flex items-center justify-center gap-3 mb-7"
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}
            >
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-label text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "corporate.label")}
              </span>
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
            </div>
            <h1
              className="font-serif"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(38px, 6vw, 76px)",
                fontWeight: 300,
                letterSpacing: "0.01em",
                color: "var(--foreground)",
                lineHeight: 1.05,
                animation: "fadeInUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both",
              }}
            >
              {t(language, "corporate.title.p1")}{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                {t(language, "corporate.title.em")}
              </em>{" "}
              {t(language, "corporate.title.p2")}
            </h1>
            <p
              className="mt-6 mx-auto"
              style={{
                fontSize: "clamp(13px, 1.3vw, 15px)",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.75)",
                maxWidth: "520px",
                animation: "fadeInUp 0.9s ease-out 0.6s both",
              }}
            >
              {t(language, "corporate.description")}
            </p>
          </div>

          {/* Bottom row — CTA */}
          <div className="relative z-20 px-6 lg:px-12 xl:px-16 pb-12 flex items-center justify-center">
            <a
              href="#contact-cta"
              className="btn-arrow flex items-center gap-3 px-7 py-3.5 font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--black)",
                fontSize: "11px",
                letterSpacing: "0.18em",
              }}
            >
              {t(language, "corporate.cta.quote")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Services grid (already-built B2B section) */}
        <CorporateSection />

        {/* Feedback form */}
        <DirectionCTA
          heading={t(language, "corporate.form.heading")}
          headingItalic={t(language, "corporate.form.heading.em")}
          description={t(language, "corporate.form.description")}
          primaryLabel={t(language, "corporate.cta.quote")}
          dataDirection="corporate"
        />

        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
