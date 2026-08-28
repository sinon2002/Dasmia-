"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface DirectionHeroProps {
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  dataDirection: string;
}

export default function DirectionHero({
  category,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  dataDirection,
}: DirectionHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = 700;
      const progress = Math.min(scrollY / maxScroll, 1);
      bgRef.current.style.filter = `blur(${progress * 14}px) brightness(${1 - progress * 0.5})`;
      bgRef.current.style.transform = `scale(${1 + progress * 0.05})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative flex flex-col items-start justify-end overflow-hidden"
      style={{ minHeight: "80svh" }}
      aria-label={`${title} — DASMIA`}
      data-direction={dataDirection}
      data-animation="hero"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          willChange: "transform, filter",
          transformOrigin: "center center",
        }}
        role="img"
        aria-label={imageAlt}
      >
        <AppImage
          src={imageUrl}
          alt={imageAlt}
          fill
          priority={true}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,11,0.96) 0%, rgba(11,11,11,0.5) 45%, rgba(11,11,11,0.2) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(11,11,11,0.55) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Breadcrumb */}
      <nav
        className="absolute top-28 left-6 lg:left-12 xl:left-16 z-20 flex items-center gap-2"
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
        <span
          className="text-muted-foreground opacity-40"
          style={{ fontSize: "10px" }}
        >
          /
        </span>
        <span
          className="text-gold"
          style={{ fontSize: "10px", letterSpacing: "0.18em" }}
        >
          {category}
        </span>
      </nav>

      {/* Content */}
      <div className="relative z-20 max-w-8xl mx-auto w-full px-6 lg:px-12 xl:px-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeInUp 0.9s ease-out 0.4s both" }}
          >
            <div className="w-10 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="text-gold"
              style={{ fontSize: "10px", letterSpacing: "0.28em" }}
            >
              {category}
            </span>
          </div>

          <h1
            className="font-serif text-foreground"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(52px, 9vw, 120px)",
              lineHeight: "0.88",
              letterSpacing: "-0.02em",
              fontWeight: 300,
              animation:
                "fadeInUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both",
            }}
          >
            {title}
            {subtitle && (
              <>
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {subtitle}
                </em>
              </>
            )}
          </h1>

          <p
            className="text-muted-foreground mt-6 leading-relaxed"
            style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              maxWidth: "480px",
              animation: "fadeInUp 0.9s ease-out 0.9s both",
            }}
          >
            {description}
          </p>

          <div
            className="flex flex-wrap items-center gap-4 mt-10"
            style={{ animation: "fadeInUp 0.9s ease-out 1.1s both" }}
          >
            <a
              href="#contact-cta"
              className="btn-arrow flex items-center gap-3 px-7 py-3.5 font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--black)",
                fontSize: "11px",
                letterSpacing: "0.16em",
              }}
              data-form="direction-cta"
            >
              {t(language, "page.book_now")}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              href="/"
              className="btn-arrow flex items-center gap-3 px-7 py-3.5 border text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
              style={{
                borderColor: "rgba(255,255,255,0.25)",
                fontSize: "11px",
                letterSpacing: "0.16em",
              }}
            >
              {t(language, "page.all_directions")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
