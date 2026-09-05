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
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // Mobile: there's no cursor to follow, so instead the row nearest the
  // vertical center of the screen becomes "active" while scrolling, and
  // its photo expands open beneath it — a touch-friendly equivalent of
  // the desktop cursor-following circle.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = rowRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveMobileIndex(idx);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorY(e.clientY - rect.top);
  };

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
          className="reveal delay-100 font-serif mb-16"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.02,
            fontWeight: 400,
            color: "var(--gold)",
            fontStyle: "italic",
          }}
        >
          {t(language, "history.title")} {t(language, "history.title.em")}
        </h2>

        {/* Rows list with cursor-following circular photo — line-group.kz style */}
        <div
          ref={listRef}
          className="relative reveal delay-200"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {timelineConfigs.map((item, i) => (
            <button
              key={item.year}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onFocus={() => setHoveredIndex(i)}
              className="group relative z-10 flex flex-col w-full text-left transition-colors duration-300"
              style={{
                borderTop:
                  i === 0
                    ? `1px solid ${hoveredIndex === 0 ? "var(--gold)" : "rgba(255,255,255,0.1)"}`
                    : "none",
                borderBottom: `1px solid ${
                  hoveredIndex === i || hoveredIndex === i + 1
                    ? "var(--gold)"
                    : "rgba(255,255,255,0.1)"
                }`,
                background:
                  hoveredIndex === i
                    ? "rgba(185,150,90,0.05)"
                    : "transparent",
                padding: "26px 12px",
              }}
            >
              <div className="flex items-center w-full" style={{ gap: "24px" }}>
                <span
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    color: "var(--muted-foreground)",
                    minWidth: "70px",
                  }}
                >
                  {item.year}
                </span>

                <span
                  className="font-serif transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color:
                      hoveredIndex === i
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    flex: 1,
                  }}
                >
                  {t(language, item.titleKey)}
                </span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.25)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Mobile-only: photo expands open below the active row as you scroll */}
              <div
                className="md:hidden w-full overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: activeMobileIndex === i ? "180px" : "0px",
                  opacity: activeMobileIndex === i ? 1 : 0,
                  marginTop: activeMobileIndex === i ? "18px" : "0px",
                }}
              >
                <div
                  className="relative mx-auto overflow-hidden"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <AppImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
              </div>
            </button>
          ))}

          {/* Floating circular photo — follows cursor vertically, fades in/out */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: cursorY,
              right: "12%",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              overflow: "hidden",
              transform: "translate(0, -50%)",
              opacity: hoveredIndex !== null ? 1 : 0,
              transition:
                "opacity 0.35s ease, top 0.12s linear",
              zIndex: 5,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {hoveredIndex !== null && (
              <AppImage
                key={timelineConfigs[hoveredIndex].image}
                src={timelineConfigs[hoveredIndex].image}
                alt={timelineConfigs[hoveredIndex].alt}
                fill
                className="object-cover"
                sizes="260px"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
