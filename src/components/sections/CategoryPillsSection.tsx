"use client";

import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const PILLS = [
  {
    label: "РЕСТОРАН",
    image: "/assets/images/IMG_8995.webp",
    href: "/restaurant",
    alt: "Ресторан DASMIA",
  },
  {
    label: "WELLNESS",
    image: "/assets/images/IMG_8911.webp",
    href: "/pools",
    alt: "Бассейны и SPA DASMIA",
  },
  {
    label: "ЭТНО-СЕЛО",
    image: "/assets/images/IMG_2160.webp",
    href: "/ethno-village",
    alt: "Этно-Село DASMIA",
  },
];

export default function CategoryPillsSection() {
  const { language } = useLanguage();

  return (
    <section
      className="relative"
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
      data-content="category-pills"
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Heading text — centered, like line-group.kz intro copy */}
        <p
          className="reveal font-serif text-foreground mb-16"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(22px, 3vw, 34px)",
            lineHeight: 1.35,
            fontWeight: 300,
            maxWidth: "620px",
          }}
        >
          {t(language, "hero.subtitle")}
          {", "}
          {t(language, "directions.desc")}
        </p>

        {/* 3 pill photos — centered, hover scale animation */}
        <div className="flex flex-wrap items-start justify-center gap-5 md:gap-8 w-full">
          {PILLS.map((pill, i) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="group relative overflow-hidden shrink-0"
              style={{
                width: "clamp(140px, 22vw, 220px)",
                height: "clamp(220px, 34vw, 340px)",
                borderRadius: "999px",
                animation: `fadeInScale 0.8s ease-out ${0.15 + i * 0.1}s both`,
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ willChange: "transform" }}
              >
                <AppImage
                  src={pill.image}
                  alt={pill.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
              </div>

              {/* Dark overlay for label legibility */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Vertical rotated label — bottom, like line-group.kz */}
              <span
                className="absolute bottom-8 left-1/2 text-label text-foreground"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  writingMode: "vertical-rl",
                  transform: "translateX(-50%) rotate(180deg)",
                }}
              >
                {pill.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
