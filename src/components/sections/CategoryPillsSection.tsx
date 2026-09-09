"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { directionsContent } from "@/lib/directionsContent";

const PILLS = [
  { slug: "banquet", image: "/assets/images/IMG_9009.webp", href: "/banquet", alt: "Банкетные залы DASMIA" },
  { slug: "restaurant", image: "/assets/images/IMG_8995.webp", href: "/restaurant", alt: "Ресторан DASMIA" },
  { slug: "chaikhana", image: "/assets/images/IMG_9000.webp", href: "/chaikhana", alt: "Чайхана DASMIA" },
  { slug: "fitness", image: "/assets/images/fitness-weights-room.webp", href: "/fitness", alt: "Фитнес-клуб DASMIA" },
  { slug: "pools", image: "/assets/images/IMG_8911.webp", href: "/pools", alt: "Бассейны DASMIA" },
  { slug: "spa", image: "/assets/images/spa-massage-room.webp", href: "/spa", alt: "SPA DASMIA" },
  { slug: "ethno-village", image: "/assets/images/IMG_2160.webp", href: "/ethno-village", alt: "Этно-Село DASMIA" },
  { slug: "events", image: "/assets/images/IMG_9002.webp", href: "/events", alt: "Мероприятия DASMIA" },
];

/**
 * Scroll-linked word fill: as the paragraph scrolls up through the
 * viewport, each word transitions from dim (transparent) to bright
 * (white). Scrolling back down reverses it — fully driven by scroll
 * position, not direction, so it's naturally reversible.
 */
function ScrollFillText({ text }: { text: string }) {
  const wrapperRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0 when block's top is at bottom of viewport,
      // progress 1 when block's bottom has reached ~40% of viewport height.
      const start = vh * 0.95;
      const end = vh * 0.4;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <p
      ref={wrapperRef}
      className="font-serif text-foreground mb-16"
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(22px, 3vw, 34px)",
        lineHeight: 1.35,
        fontWeight: 300,
        maxWidth: "620px",
      }}
    >
      {words.map((word, i) => {
        // Each word gets its own slice of the 0..1 progress range,
        // with a little overlap so the fill feels continuous.
        const span = 1 / words.length;
        const wordStart = i * span * 0.75;
        const wordEnd = wordStart + span * 1.5;
        const local = (progress - wordStart) / (wordEnd - wordStart);
        const opacity = Math.min(1, Math.max(0.16, local));

        return (
          <React.Fragment key={i}>
            <span style={{ opacity, transition: "opacity 0.05s linear" }}>
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
}

export default function CategoryPillsSection() {
  const { language } = useLanguage();
  const heading = `${t(language, "hero.subtitle")}, ${t(language, "directions.desc")}`;

  return (
    <section
      id="directions"
      className="relative scroll-mt-24"
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
      data-content="category-pills"
    >
      <div className="flex flex-col items-center text-center">
        {/* Heading text — scroll-linked fill animation, line-group.kz style */}
        <div className="max-w-4xl mx-auto px-6">
          <ScrollFillText text={heading} />
        </div>

        {/* All 8 directions in a single row — flex-basis grows on hover,
            pushing neighbors, exactly like line-group.kz. Spans the full
            section width, matching the rest of the site's containers. On
            narrow screens the row scrolls horizontally instead of
            squeezing every card down to nothing. */}
        <div className="w-full px-4 md:px-6">
          <div className="flex items-start gap-3 md:gap-5 w-full overflow-x-auto md:overflow-visible pb-2">
          {PILLS.map((pill, i) => {
            const label =
              directionsContent[pill.slug]?.[language]?.hero.category ?? pill.slug;
            return (
              <Link
                key={pill.slug}
                href={pill.href}
                className="group relative overflow-hidden shrink-0"
                style={{
                  flex: "1 1 0%",
                  minWidth: "110px",
                  height: "clamp(220px, 24vw, 320px)",
                  borderRadius: "999px",
                  animation: `fadeInScale 0.8s ease-out ${0.08 + i * 0.05}s both`,
                  transition: "flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  const row = e.currentTarget.parentElement;
                  if (!row) return;
                  Array.from(row.children).forEach((child) => {
                    (child as HTMLElement).style.flexGrow =
                      child === e.currentTarget ? "1.8" : "0.85";
                  });
                }}
                onMouseLeave={(e) => {
                  const row = e.currentTarget.parentElement;
                  if (!row) return;
                  Array.from(row.children).forEach((child) => {
                    (child as HTMLElement).style.flexGrow = "1";
                  });
                }}
              >
                <div className="absolute inset-0">
                  <AppImage
                    src={pill.image}
                    alt={pill.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 220px"
                  />
                </div>

                {/* Dark overlay for label legibility */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Vertical rotated label — bottom, like line-group.kz */}
                <span
                  className="absolute bottom-6 left-1/2 text-label text-foreground text-center whitespace-nowrap"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    writingMode: "vertical-rl",
                    transform: "translateX(-50%) rotate(180deg)",
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
