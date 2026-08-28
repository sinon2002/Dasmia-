"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface DirectionDef {
  number: string;
  categoryKey: string;
  titleKey: string;
  descKey: string;
  href: string;
  image: string;
  alt: string;
  dataDirection: string;
  colSpan?: string;
}

const directionDefs: DirectionDef[] = [
  {
    number: "01",
    categoryKey: "directions.cat.celebration",
    titleKey: "directions.banquet.title",
    descKey: "directions.banquet.desc",
    href: "/banquet",
    image: "/assets/images/IMG_9009.webp",
    alt: "Банкетный комплекс DASMIA",
    dataDirection: "banquet",
    colSpan: "md:col-span-2",
  },
  {
    number: "02",
    categoryKey: "directions.cat.gastronomy",
    titleKey: "directions.restaurant.title",
    descKey: "directions.restaurant.desc",
    href: "/restaurant",
    image: "/assets/images/IMG_8995.webp",
    alt: "Ресторан DASMIA",
    dataDirection: "restaurant",
  },
  {
    number: "03",
    categoryKey: "directions.cat.culture",
    titleKey: "directions.chaikhana.title",
    descKey: "directions.chaikhana.desc",
    href: "/chaikhana",
    image: "/assets/images/IMG_9000.webp",
    alt: "Чайхана DASMIA",
    dataDirection: "chaikhana",
  },
  {
    number: "04",
    categoryKey: "directions.cat.sport",
    titleKey: "directions.fitness.title",
    descKey: "directions.fitness.desc",
    href: "/fitness",
    image: "/assets/images/IMG_8902.webp",
    alt: "Фитнес-клуб DASMIA",
    dataDirection: "fitness",
  },
  {
    number: "05",
    categoryKey: "directions.cat.wellness",
    titleKey: "directions.pools.title",
    descKey: "directions.pools.desc",
    href: "/pools",
    image: "/assets/images/IMG_8911.webp",
    alt: "Бассейны DASMIA",
    dataDirection: "pools",
    colSpan: "md:col-span-2",
  },
  {
    number: "06",
    categoryKey: "directions.cat.wellness",
    titleKey: "directions.spa.title",
    descKey: "directions.spa.desc",
    href: "/spa",
    image: "/assets/images/IMG_9018.webp",
    alt: "SPA DASMIA",
    dataDirection: "spa",
  },
  {
    number: "07",
    categoryKey: "directions.cat.heritage",
    titleKey: "directions.ethno.title",
    descKey: "directions.ethno.desc",
    href: "/ethno-village",
    image: "/assets/images/IMG_2160.webp",
    alt: "Этно-Село DASMIA",
    dataDirection: "ethno-village",
  },
  {
    number: "08",
    categoryKey: "directions.cat.business",
    titleKey: "directions.events.title",
    descKey: "directions.events.desc",
    href: "#contact",
    image: "/assets/images/IMG_9049.webp",
    alt: "Мероприятия DASMIA",
    dataDirection: "events",
  },
];

function DirectionCard({ dir, index }: { dir: DirectionDef; index: number }) {
  const { language } = useLanguage();

  return (
    <Link
      href={dir.href}
      className={`dir-card card-gold-hover relative overflow-hidden block group ${dir.colSpan || ""}`}
      style={{
        aspectRatio: dir.colSpan ? "16/7" : "4/5",
        animation: `fadeInScale 0.8s ease-out ${0.1 + index * 0.08}s both`,
      }}
      data-direction={dir.dataDirection}
      data-gallery={dir.dataDirection}
    >
      <div className="absolute inset-0">
        <AppImage
          src={dir.image}
          alt={dir.alt}
          fill
          className="dir-card-img object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-90"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,11,0.9) 0%, rgba(11,11,11,0.4) 50%, rgba(11,11,11,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out"
        style={{ width: "0", background: "var(--gold)" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between">
          <span
            className="text-label text-gold"
            style={{ fontSize: "10px", letterSpacing: "0.2em" }}
          >
            {dir.number}
          </span>
          <span
            className="text-label px-2 py-1 border"
            style={{
              fontSize: "9px",
              letterSpacing: "0.16em",
              borderColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {t(language, dir.categoryKey)}
          </span>
        </div>

        <div>
          <h3
            className="font-serif text-foreground mb-2 transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            {t(language, dir.titleKey)}
          </h3>
          <p
            className="text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ fontSize: "12px", maxWidth: "260px" }}
          >
            {t(language, dir.descKey)}
          </p>
          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span
              className="text-label text-gold"
              style={{ fontSize: "10px", letterSpacing: "0.16em" }}
            >
              {t(language, "directions.more")}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="var(--gold)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DirectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 100);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="directions"
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      data-content="directions"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-label text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "directions.label")}
              </span>
            </div>
            <h2
              className="reveal font-serif text-foreground delay-100"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(30px, 4vw, 56px)",
                lineHeight: 1.02,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {t(language, "directions.title")}
              <br />
              <em
                style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}
              >
                {t(language, "directions.title.em")}
              </em>
            </h2>
          </div>
          <p
            className="reveal reveal-right text-muted-foreground delay-200"
            style={{ fontSize: "14px", maxWidth: "340px", lineHeight: 1.7 }}
          >
            {t(language, "directions.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {directionDefs.map((dir, i) => (
            <DirectionCard key={dir.dataDirection} dir={dir} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
