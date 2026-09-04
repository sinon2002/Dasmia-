"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

/* Slider slides — DASMIA directions (line-group.kz rotating banner) */
const HERO_SLIDES = [
  {
    image: "/assets/images/IMG_2161.webp",
    title: "DASMIA",
    address: "Бишкек, ул. Анкара 2Б",
    href: "#directions",
    alt: "Комплекс DASMIA",
  },
  {
    image: "/assets/images/IMG_9009.webp",
    title: "Банкетные залы",
    address: "Бишкек, ул. Анкара 2Б",
    href: "/banquet",
    alt: "Банкетный зал DASMIA",
  },
  {
    image: "/assets/images/IMG_8995.webp",
    title: "Ресторан",
    address: "Бишкек, ул. Анкара 2Б",
    href: "/restaurant",
    alt: "Ресторан DASMIA",
  },
  {
    image: "/assets/images/IMG_9000.webp",
    title: "Чайхана",
    address: "Бишкек, ул. Анкара 2Б",
    href: "/chaikhana",
    alt: "Чайхана DASMIA",
  },
  {
    image: "/assets/images/IMG_8911.webp",
    title: "Бассейны",
    address: "Бишкек, ул. Анкара 2Б",
    href: "/pools",
    alt: "Бассейны DASMIA",
  },
  {
    image: "/assets/images/IMG_2160.webp",
    title: "Этно-Село",
    address: "Бишкек, ул. Анкара 2Б",
    href: "/ethno-village",
    alt: "Этно-Село DASMIA",
  },
];

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = 900;
      const progress = Math.min(scrollY / maxScroll, 1);
      const brightness = 1 - progress * 0.5;
      const scale = 1 + progress * 0.05;
      bgRef.current.style.filter = `brightness(${brightness})`;
      bgRef.current.style.transform = `scale(${scale})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const current = HERO_SLIDES[activeSlide];
  const next = HERO_SLIDES[(activeSlide + 1) % HERO_SLIDES.length];

  const goTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    index: number,
  ) => {
    setActiveSlide(index);
    if (href.startsWith("#")) handleAnchorClick(e, href);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Главный баннер DASMIA"
      data-animation="hero"
    >
      {/* Cinematic Background Slider — crossfading images */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          willChange: "transform, filter",
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: i === activeSlide ? 1 : 0,
              transitionDuration: "1400ms",
            }}
          >
            <AppImage
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for legibility — line-group.kz style */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.42)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.15) 35%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Centered logo — replaces the plain "DASMIA" text wordmark */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6">
        <h1
          className="text-center"
          style={{
            animation: "fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
          }}
        >
          <span className="sr-only">{t(language, "hero.title")}</span>
          <span
            aria-hidden="true"
            className="relative block mx-auto"
            style={{
              width: "clamp(220px, 34vw, 560px)",
              aspectRatio: "700 / 111",
            }}
          >
            <AppImage
              src="/assets/images/logos/dasmia-wordmark.webp"
              alt=""
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 60vw, 560px"
            />
          </span>
        </h1>
      </div>

      {/* Bottom bar — "СМОТРЕТЬ ВСЕ" left, current + next slide info right, exactly like line-group.kz */}
      <div className="relative z-20 w-full px-6 lg:px-12 xl:px-16 pb-10 md:pb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* СМОТРЕТЬ ВСЕ — bottom-left */}
          <a
            href="#directions"
            onClick={(e) => handleAnchorClick(e, "#directions")}
            className="text-label text-foreground hover:text-gold transition-colors duration-300 order-2 md:order-1"
            style={{ fontSize: "11px", letterSpacing: "0.2em" }}
          >
            {t(language, "hero.directions.cta")}
          </a>

          {/* Current + next slide preview — bottom-right, line-group.kz two-column style */}
          <div className="flex items-start gap-10 md:gap-16 order-1 md:order-2">
            <Link
              key={`current-${current.title}`}
              href={current.href.startsWith("#") ? "/" : current.href}
              onClick={(e) => goTo(e, current.href, activeSlide)}
              className="group flex flex-col gap-2"
              style={{ animation: "fadeInUp 0.6s ease-out both" }}
            >
              <span
                className="font-serif text-foreground transition-colors duration-300 group-hover:text-gold"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(22px, 2.6vw, 34px)",
                  fontWeight: 300,
                }}
              >
                {current.title}
              </span>
            </Link>

            <Link
              key={`next-${next.title}`}
              href={next.href.startsWith("#") ? "/" : next.href}
              onClick={(e) =>
                goTo(e, next.href, (activeSlide + 1) % HERO_SLIDES.length)
              }
              className="group hidden sm:flex flex-col gap-2 opacity-45 hover:opacity-80 transition-opacity duration-300"
              style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
            >
              <span
                className="font-serif text-foreground"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 300,
                }}
              >
                {next.title}
              </span>
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              onClick={() => setActiveSlide(i)}
              aria-label={`Слайд ${i + 1}: ${slide.title}`}
              className="transition-all duration-300"
              style={{
                width: i === activeSlide ? "20px" : "6px",
                height: "2px",
                background:
                  i === activeSlide ? "var(--gold)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
