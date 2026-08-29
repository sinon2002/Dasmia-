"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";

/**
 * Scroll-linked word fill: each word transitions from dim to bright
 * as the paragraph scrolls through the viewport, reversible both ways.
 */
function ScrollFillText({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const wrapperRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.95;
      const end = vh * 0.55;
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
    <p ref={wrapperRef} style={style}>
      {words.map((word, i) => {
        const span = 1 / words.length;
        const wordStart = i * span * 0.75;
        const wordEnd = wordStart + span * 1.5;
        const local = (progress - wordStart) / (wordEnd - wordStart);
        const opacity = Math.min(1, Math.max(0.2, local));
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

interface ShowcaseItem {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  linkLabel: string;
}

interface DirectionShowcaseGridProps {
  heading: string;
  items: ShowcaseItem[];
  dataDirection: string;
}

export default function DirectionShowcaseGrid({
  heading,
  items,
  dataDirection,
}: DirectionShowcaseGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
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

  return (
    <section
      ref={sectionRef}
      className="relative border-t"
      style={{
        backgroundColor: "var(--charcoal)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "80px",
        paddingBottom: "100px",
      }}
      data-direction={dataDirection}
      data-content="showcase-grid"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2
          className="text-center reveal mb-16"
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            letterSpacing: "0.16em",
            color: "var(--gold)",
          }}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="reveal flex flex-col"
              style={{
                marginTop: i % 2 === 1 ? "56px" : "0",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="relative w-full overflow-hidden group"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius:
                    i % 2 === 0 ? "0 9999px 0 0" : "0 0 0 9999px",
                }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <AppImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, 45vw"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-6 left-6 text-foreground"
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </span>
              </div>

              <ScrollFillText
                text={item.description}
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  maxWidth: "340px",
                  marginTop: "20px",
                  color: "var(--foreground)",
                }}
              />

              <a
                href="#contact-cta"
                className="btn-arrow inline-flex items-center gap-2 mt-4 text-gold hover:text-foreground transition-colors duration-300 w-fit"
                style={{ fontSize: "11px", letterSpacing: "0.12em" }}
              >
                {item.linkLabel}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
          ))}
        </div>
      </div>
    </section>
  );
}
