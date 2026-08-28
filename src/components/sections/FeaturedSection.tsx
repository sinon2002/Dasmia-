"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface FeaturedBlockConfig {
  number: string;
  categoryKey: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featureKeys: string[];
  image: string;
  alt: string;
  imageLeft: boolean;
  dataDirection: string;
}

const featuredConfigs: FeaturedBlockConfig[] = [
  {
    number: "01",
    categoryKey: "featured.b1.category",
    titleKey: "featured.b1.title",
    subtitleKey: "featured.b1.subtitle",
    descriptionKey: "featured.b1.description",
    featureKeys: [
      "featured.b1.f1",
      "featured.b1.f2",
      "featured.b1.f3",
      "featured.b1.f4",
    ],
    image: "/assets/images/IMG_9009.webp",
    alt: "Банкетный зал Айкөл Ордо DASMIA",
    imageLeft: false,
    dataDirection: "banquet",
  },
  {
    number: "02",
    categoryKey: "featured.b2.category",
    titleKey: "featured.b2.title",
    subtitleKey: "featured.b2.subtitle",
    descriptionKey: "featured.b2.description",
    featureKeys: [
      "featured.b2.f1",
      "featured.b2.f2",
      "featured.b2.f3",
      "featured.b2.f4",
    ],
    image: "/assets/images/IMG_8995.webp",
    alt: "Ресторан и гастрономия DASMIA",
    imageLeft: true,
    dataDirection: "restaurant",
  },
  {
    number: "03",
    categoryKey: "featured.b3.category",
    titleKey: "featured.b3.title",
    subtitleKey: "featured.b3.subtitle",
    descriptionKey: "featured.b3.description",
    featureKeys: [
      "featured.b3.f1",
      "featured.b3.f2",
      "featured.b3.f3",
      "featured.b3.f4",
    ],
    image: "/assets/images/IMG_2160.webp",
    alt: "Этно-комплекс и юрты DASMIA",
    imageLeft: false,
    dataDirection: "ethno-village",
  },
];

function FeaturedBlock({
  config,
  index,
}: {
  config: FeaturedBlockConfig;
  index: number;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 150);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  const textContent = (
    <div className="flex flex-col justify-center h-full">
      <div
        className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} flex items-center gap-3 mb-7`}
      >
        <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
        <span
          className="text-label text-gold"
          style={{ fontSize: "10px", letterSpacing: "0.24em" }}
        >
          {t(language, config.categoryKey)}
        </span>
      </div>

      <div className="relative mb-4">
        <span
          className="editorial-number"
          style={{
            fontFamily: "var(--font-cormorant)",
            position: "absolute",
            top: "-30px",
            left: "-20px",
            fontSize: "clamp(80px, 10vw, 140px)",
            color: "var(--gold)",
            opacity: 0.08,
            fontStyle: "italic",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {config.number}
        </span>
        <h2
          className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} delay-100 font-serif text-foreground relative`}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3.8vw, 52px)",
            lineHeight: 1.05,
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}
        >
          {t(language, config.titleKey)}
        </h2>
      </div>

      <p
        className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} delay-200 font-serif italic text-muted-foreground mb-5`}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(16px, 1.6vw, 22px)",
          fontWeight: 300,
        }}
      >
        {t(language, config.subtitleKey)}
      </p>

      <p
        className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} delay-300 text-muted-foreground leading-relaxed mb-8`}
        style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "420px" }}
      >
        {t(language, config.descriptionKey)}
      </p>

      <ul
        className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} delay-400 flex flex-col gap-2.5 mb-10`}
      >
        {config.featureKeys.map((featKey) => (
          <li key={featKey} className="flex items-center gap-3">
            <div
              className="w-4 h-px flex-shrink-0"
              style={{ background: "var(--gold)" }}
            />
            <span
              className="text-muted-foreground"
              style={{ fontSize: "13px" }}
            >
              {t(language, featKey)}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={`reveal ${config.imageLeft ? "reveal-right" : "reveal-left"} delay-500`}
      >
        <a
          href="#contact"
          className="btn-arrow inline-flex items-center gap-3 border-b pb-2 text-foreground hover:text-gold hover:border-gold transition-all duration-300"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            fontSize: "10px",
            letterSpacing: "0.18em",
          }}
          data-direction={config.dataDirection}
        >
          {t(language, "featured.cta")}
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 10L10 1M10 1H3M10 1V8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );

  const imageContent = (
    <div className="reveal-scale h-full" style={{ minHeight: "520px" }}>
      <div className="img-zoom relative h-full" style={{ minHeight: "520px" }}>
        <AppImage
          src={config.image}
          alt={config.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
          style={{
            borderTop: "1px solid var(--gold)",
            borderLeft: "1px solid var(--gold)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
          style={{
            borderBottom: "1px solid var(--gold)",
            borderRight: "1px solid var(--gold)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );

  return (
    <div
      ref={blockRef}
      className="border-t"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {config.imageLeft ? (
            <>
              <div>{imageContent}</div>
              <div>{textContent}</div>
            </>
          ) : (
            <>
              <div>{textContent}</div>
              <div>{imageContent}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSection() {
  return (
    <section
      className="relative"
      style={{ backgroundColor: "var(--charcoal)" }}
      data-content="featured"
    >
      {featuredConfigs.map((config, i) => (
        <FeaturedBlock key={config.dataDirection} config={config} index={i} />
      ))}
    </section>
  );
}
