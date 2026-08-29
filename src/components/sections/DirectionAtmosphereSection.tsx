"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";

interface PreviewImage {
  url: string;
  alt: string;
  caption: string;
}

interface DirectionAtmosphereSectionProps {
  label: string;
  bodyText: string;
  previewImages: PreviewImage[];
  stripImages: { url: string; alt: string }[];
  tagline: string;
  dataDirection: string;
}

function ScrollFillText({ text, style }: { text: string; style?: React.CSSProperties }) {
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
      const end = vh * 0.5;
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
            <span style={{ opacity, transition: "opacity 0.05s linear" }}>{word}</span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
}

export default function DirectionAtmosphereSection({
  label,
  bodyText,
  previewImages,
  stripImages,
  tagline,
  dataDirection,
}: DirectionAtmosphereSectionProps) {
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
        paddingTop: "90px",
        paddingBottom: "60px",
      }}
      data-direction={dataDirection}
      data-content="atmosphere"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3 mb-10 reveal">
          <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-label text-gold" style={{ fontSize: "10px", letterSpacing: "0.24em" }}>
            {label}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Preview arched photo trio — full-width row above the text */}
          <div className="lg:col-span-12 flex gap-5 md:gap-8 reveal delay-100">
            {previewImages.map((img) => (
              <div key={img.url} className="relative flex-1 flex flex-col items-center gap-4">
                <span
                  className="text-center text-foreground"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {img.caption}
                </span>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3 / 4.2", borderRadius: "999px" }}
                >
                  <AppImage
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 30vw, 320px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Body text */}
          <div className="lg:col-span-8 reveal delay-200">
            <ScrollFillText
              text={bodyText}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(19px, 2vw, 26px)",
                lineHeight: 1.55,
                fontWeight: 400,
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 mt-20 mb-8 reveal delay-300">
        <p
          className="text-gold"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Continuous auto-sliding photo strip */}
      <div className="relative w-full overflow-hidden" style={{ height: "min(280px, 42vw)" }}>
        <div
          className="flex absolute top-0 left-0 h-full"
          style={{
            width: "max-content",
            gap: "10px",
            animation: `atmosphereStrip ${stripImages.length * 6}s linear infinite`,
          }}
        >
          {[...stripImages, ...stripImages, ...stripImages].map((img, i) => (
            <div key={img.url + i} className="relative shrink-0 h-full" style={{ width: "min(240px, 38vw)" }}>
              <AppImage src={img.url} alt={img.alt} fill className="object-cover" sizes="240px" />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes atmosphereStrip {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-33.3333%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
