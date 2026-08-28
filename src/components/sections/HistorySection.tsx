"use client";

import React, { useState, useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface TimelineConfig {
  year: string;
  titleKey: string;
  descKey: string;
  image: string;
  alt: string;
}

const timelineConfigs: TimelineConfig[] = [
  {
    year: "1998",
    titleKey: "history.t1.title",
    descKey: "history.t1.desc",
    image: "/assets/images/IMG_2161.webp",
    alt: "Основание DASMIA",
  },
  {
    year: "2005",
    titleKey: "history.t2.title",
    descKey: "history.t2.desc",
    image: "/assets/images/IMG_9009.webp",
    alt: "Банкетные залы и ресторан DASMIA",
  },
  {
    year: "2015",
    titleKey: "history.t3.title",
    descKey: "history.t3.desc",
    image: "/assets/images/IMG_8902.webp",
    alt: "Фитнес-клуб и бассейны DASMIA",
  },
  {
    year: "2020",
    titleKey: "history.t4.title",
    descKey: "history.t4.desc",
    image: "/assets/images/IMG_2160.webp",
    alt: "Этно-Село DASMIA",
  },
  {
    year: "2025",
    titleKey: "history.t5.title",
    descKey: "history.t5.desc",
    image: "/assets/images/IMG_9049.webp",
    alt: "DASMIA сегодня",
  },
];

export default function HistorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 120);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = timelineConfigs[activeIndex];

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative border-t"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      data-content="history"
      data-animation="timeline"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3 mb-4 reveal">
          <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
          <span
            className="text-label text-gold"
            style={{ fontSize: "10px", letterSpacing: "0.24em" }}
          >
            {t(language, "history.label")}
          </span>
        </div>
        <h2
          className="reveal delay-100 font-serif text-foreground mb-12"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.02,
            fontWeight: 300,
          }}
        >
          {t(language, "history.title")}{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}>
            {t(language, "history.title.em")}
          </em>
        </h2>

        {/* Horizontal auto-scrolling year ticker — line-group.kz style */}
        <div
          className="relative overflow-hidden mb-12 reveal delay-150"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="flex items-center"
            style={{
              width: "max-content",
              animation: "historyTicker 32s linear infinite",
            }}
          >
            {[...timelineConfigs, ...timelineConfigs, ...timelineConfigs].map(
              (item, i) => (
                <button
                  key={`${item.year}-${i}`}
                  onClick={() => setActiveIndex(i % timelineConfigs.length)}
                  className="flex items-center gap-3 shrink-0 px-8 py-5 transition-colors duration-300"
                  style={{ background: "none", cursor: "pointer" }}
                >
                  <span
                    className="font-serif italic transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(26px, 3vw, 40px)",
                      fontWeight: 300,
                      color:
                        activeIndex === i % timelineConfigs.length
                          ? "var(--gold)"
                          : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "rgba(185,150,90,0.4)" }}
                    aria-hidden="true"
                  />
                </button>
              ),
            )}
          </div>
          <style jsx>{`
            @keyframes historyTicker {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-33.3333%);
              }
            }
          `}</style>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 reveal-left delay-200">
            <div className="flex flex-col">
              {timelineConfigs.map((item, i) => (
                <button
                  key={item.year}
                  onClick={() => setActiveIndex(i)}
                  className="group flex items-center gap-5 py-5 border-b text-left transition-all duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "none",
                    cursor: "pointer",
                  }}
                  aria-label={`${item.year} — ${t(language, item.titleKey)}`}
                  aria-pressed={activeIndex === i}
                >
                  <span
                    className="font-serif transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color:
                        activeIndex === i
                          ? "var(--gold)"
                          : "rgba(255,255,255,0.3)",
                      minWidth: "70px",
                    }}
                  >
                    {item.year}
                  </span>

                  <div className="flex-1">
                    <p
                      className="transition-colors duration-300"
                      style={{
                        fontSize: "13px",
                        color:
                          activeIndex === i
                            ? "var(--foreground)"
                            : "var(--muted-foreground)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t(language, item.titleKey)}
                    </p>
                  </div>

                  <div
                    className="w-1 h-6 transition-opacity duration-300"
                    style={{
                      background: "var(--gold)",
                      opacity: activeIndex === i ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 reveal-right delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div
                className="img-zoom relative"
                style={{ minHeight: "320px", aspectRatio: "4/5" }}
              >
                <AppImage
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div
                  className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                  style={{
                    borderTop: "1px solid var(--gold)",
                    borderLeft: "1px solid var(--gold)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-6 h-px"
                    style={{ background: "var(--gold)" }}
                  />
                  <span
                    className="text-label text-gold"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    {active.year}
                  </span>
                </div>
                <h3
                  className="font-serif text-foreground mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(22px, 2.5vw, 34px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  {t(language, active.titleKey)}
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "14px" }}
                >
                  {t(language, active.descKey)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
