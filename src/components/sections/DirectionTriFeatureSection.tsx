"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import ScrollFillText from "@/components/ui/ScrollFillText";

interface ScrapbookFeature {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface AccentPhoto {
  image: string;
  imageAlt: string;
}

interface Ornament {
  src: string;
  alt: string;
  size: number;
  duration: number;
  reverse?: boolean;
}

const DEFAULT_ORNAMENTS: Ornament[] = [
  { src: "/assets/images/ornament-kyrgyz-gold.webp", alt: "Кыргызский орнамент", size: 108, duration: 24 },
  { src: "/assets/images/ornament-kyrgyz-navy.webp", alt: "Кыргызский орнамент", size: 82, duration: 16, reverse: true },
];

interface DirectionTriFeatureSectionProps {
  heading: string;
  features: [ScrapbookFeature, ScrapbookFeature, ScrapbookFeature];
  accentPhotos?: [AccentPhoto, AccentPhoto];
  ornaments?: Ornament[];
  variant?: "arch" | "compact" | "heritage";
  dataDirection: string;
}

export default function DirectionTriFeatureSection({
  heading,
  features,
  accentPhotos,
  ornaments = DEFAULT_ORNAMENTS,
  variant = "arch",
  dataDirection,
}: DirectionTriFeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [f1, f2, f3] = features;

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
      className="relative border-t theme-fixed-dark"
      style={{
        backgroundColor: "var(--charcoal)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "90px",
        paddingBottom: "110px",
      }}
      data-direction={dataDirection}
      data-content="tri-feature"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3 mb-10 reveal">
          <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-label text-gold" style={{ fontSize: "10px", letterSpacing: "0.24em" }}>
            {heading}
          </span>
        </div>

        {/* Big intro paragraph — feature 1, full width, dot indicator, scroll-linked fill (arch variant only) */}
        {variant === "arch" && (
          <div className="flex items-start gap-4 mb-16 lg:mb-20 reveal delay-100">
            <span
              className="mt-3 shrink-0 rounded-full"
              style={{ width: "6px", height: "6px", background: "var(--gold)" }}
              aria-hidden="true"
            />
            <div>
              <p
                className="text-label text-gold mb-4"
                style={{ fontSize: "9px", letterSpacing: "0.2em" }}
              >
                {f1.number} — {f1.title}
              </p>
              <ScrollFillText
                text={f1.description}
                className="font-serif text-foreground"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(22px, 2.6vw, 32px)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  maxWidth: "760px",
                }}
              />
            </div>
          </div>
        )}

        {variant === "heritage" && (
          <div className="reveal delay-100">
            <div className="lg:flex lg:gap-10 lg:items-start">
              {/* Left: tall photo with arch top-left corner, caption below */}
              <div className="lg:w-[26%] shrink-0">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 5.4", borderRadius: "90px 16px 16px 16px" }}
                >
                  <AppImage
                    src={f1.image}
                    alt={f1.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 300px"
                  />
                </div>
                <div className="mt-6">
                  <p
                    className="text-label text-gold mb-3"
                    style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}
                  >
                    {f3.number} — {f3.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                    {f3.description}
                  </p>
                </div>
              </div>

              {/* Right: big text + single ornament, then caption, then 2 photos in a row */}
              <div className="flex-1 mt-10 lg:mt-0">
                <div className="flex items-start justify-between gap-6">
                  <ScrollFillText
                    text={f1.description}
                    className="font-serif text-foreground"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(24px, 2.8vw, 34px)",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      maxWidth: "560px",
                    }}
                  />
                  {ornaments[0] && (
                    <div
                      className="relative shrink-0 hidden sm:block"
                      style={{
                        width: `${ornaments[0].size}px`,
                        height: `${ornaments[0].size}px`,
                        animation: `spinSlow ${ornaments[0].duration}s linear infinite${ornaments[0].reverse ? " reverse" : ""}`,
                      }}
                    >
                      <AppImage
                        src={ornaments[0].src}
                        alt={ornaments[0].alt}
                        fill
                        className="object-contain"
                        sizes={`${ornaments[0].size + 20}px`}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-8 max-w-[280px]">
                  <p
                    className="text-label mb-3"
                    style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
                  >
                    {f2.number} — {f2.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                    {f2.description}
                  </p>
                </div>

                <div className="flex gap-4 mt-10">
                  <div
                    className="relative flex-1 overflow-hidden"
                    style={{ aspectRatio: "4 / 3.4", borderRadius: "70px 12px 12px 12px" }}
                  >
                    <AppImage
                      src={f2.image}
                      alt={f2.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 45vw, 320px"
                    />
                  </div>
                  <div
                    className="relative flex-1 overflow-hidden"
                    style={{ aspectRatio: "4 / 3.4", borderRadius: "70px 12px 12px 12px" }}
                  >
                    <AppImage
                      src={f3.image}
                      alt={f3.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 45vw, 320px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes spinSlow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        )}

        {variant === "compact" && (
          <div className="lg:flex lg:gap-14 lg:items-start">
            {/* Left column: small photo + big text, then two captions, then ornament row */}
            <div className="lg:w-[44%] flex flex-col gap-12 lg:gap-14">
              <div className="flex gap-6 items-start reveal delay-100">
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ width: "34%", aspectRatio: "4 / 3.6", borderRadius: "20px" }}
                >
                  <AppImage
                    src={f1.image}
                    alt={f1.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 220px"
                  />
                </div>
                <ScrollFillText
                  text={f1.description}
                  className="font-serif text-foreground flex-1"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(24px, 2.9vw, 36px)",
                    lineHeight: 1.45,
                    fontWeight: 400,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 reveal delay-150">
                <div>
                  <p
                    className="text-label mb-3"
                    style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
                  >
                    {f2.number} — {f2.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                    {f2.description}
                  </p>
                </div>
                <div>
                  <p
                    className="text-label text-gold mb-3"
                    style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}
                  >
                    {f3.number} — {f3.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                    {f3.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-6 reveal delay-200">
                {ornaments.map((o) => (
                  <div
                    key={o.src}
                    className="relative shrink-0"
                    style={{
                      width: `${o.size}px`,
                      height: `${o.size}px`,
                      animation: `spinSlow ${o.duration}s linear infinite${o.reverse ? " reverse" : ""}`,
                    }}
                  >
                    <AppImage
                      src={o.src}
                      alt={o.alt}
                      fill
                      className="object-contain"
                      sizes={`${o.size + 20}px`}
                    />
                  </div>
                ))}
              </div>
              <style jsx>{`
                @keyframes spinSlow {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
            </div>

            {/* Right column: single large photo */}
            <div className="lg:w-[52%] mt-12 lg:mt-16 reveal delay-250">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 3.6", borderRadius: "24px" }}
              >
                <AppImage
                  src={f3.image}
                  alt={f3.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 560px"
                />
              </div>
            </div>
          </div>
        )}

        {variant === "arch" && (
          <div className="lg:flex lg:gap-10 lg:items-start">
            {/* Photo A — feature 1, large arch photo, left column */}
            <div className="lg:w-[27%] shrink-0 reveal delay-100">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3 / 4.2", borderRadius: "140px 16px 16px 16px" }}
              >
                <AppImage
                  src={f1.image}
                  alt={f1.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 320px"
                />
              </div>
            </div>

            {/* Big text + feature 2 caption — middle column */}
            <div className="lg:w-[32%] flex flex-col gap-12 mt-10 lg:mt-0 reveal delay-150">
              <div>
                <p
                  className="text-label text-gold mb-4"
                  style={{ fontSize: "9px", letterSpacing: "0.2em" }}
                >
                  {f1.number} — {f1.title}
                </p>
                <ScrollFillText
                  text={f1.description}
                  className="font-serif text-foreground"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(22px, 2.6vw, 32px)",
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                />
              </div>
              <div>
                <p
                  className="text-label mb-3"
                  style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
                >
                  {f2.number} — {f2.title}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                  {f2.description}
                </p>
              </div>
            </div>

            {/* Ornament + two medium photos + feature 3 caption — right column */}
            <div className="lg:w-[35%] flex flex-col gap-6 mt-10 lg:mt-0 reveal delay-200">
              <div className="flex justify-end">
                <div
                  className="relative shrink-0"
                  style={{
                    width: `${ornaments[0].size}px`,
                    height: `${ornaments[0].size}px`,
                    animation: `spinSlow ${ornaments[0].duration}s linear infinite${ornaments[0].reverse ? " reverse" : ""}`,
                  }}
                >
                  <AppImage
                    src={ornaments[0].src}
                    alt={ornaments[0].alt}
                    fill
                    className="object-contain"
                    sizes={`${ornaments[0].size + 20}px`}
                  />
                </div>
              </div>
              <style jsx>{`
                @keyframes spinSlow {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}</style>

              <div className="flex gap-4">
                <div
                  className="relative flex-1 overflow-hidden"
                  style={{ aspectRatio: "1 / 1.05", borderRadius: "16px" }}
                >
                  <AppImage
                    src={f2.image}
                    alt={f2.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 220px"
                  />
                </div>
                <div
                  className="relative flex-1 overflow-hidden"
                  style={{ aspectRatio: "1 / 1.05", borderRadius: "16px" }}
                >
                  <AppImage
                    src={f3.image}
                    alt={f3.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 220px"
                  />
                </div>
              </div>

              <div>
                <p
                  className="text-label text-gold mb-3"
                  style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}
                >
                  {f3.number} — {f3.title}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.85 }}>
                  {f3.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
