"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";

interface ScrapbookFeature {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface DirectionTriFeatureSectionProps {
  heading: string;
  features: [ScrapbookFeature, ScrapbookFeature, ScrapbookFeature];
  dataDirection: string;
}

export default function DirectionTriFeatureSection({
  heading,
  features,
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
      className="relative border-t"
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

        {/* Big intro paragraph — feature 1, full width, dot indicator */}
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
            <p
              className="font-serif text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.5,
                fontWeight: 400,
                maxWidth: "760px",
              }}
            >
              {f1.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 lg:gap-y-0">
          {/* Photo A — feature 1, medium rounded rectangle, arch top-left */}
          <div className="lg:col-span-5 reveal delay-150">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4 / 3.3", borderRadius: "110px 20px 20px 20px" }}
            >
              <AppImage
                src={f1.image}
                alt={f1.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            </div>
          </div>

          {/* Small caption — feature 2, beside Photo A */}
          <div className="lg:col-span-4 lg:col-start-6 lg:mt-6 reveal delay-200">
            <p
              className="text-label mb-3"
              style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              {f2.number} — {f2.title}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "13px", lineHeight: 1.85, maxWidth: "320px" }}
            >
              {f2.description}
            </p>
          </div>

          {/* Rotating Kyrgyz ornaments — vertical duo */}
          <div className="flex lg:col-span-1 lg:col-start-10 flex-row lg:flex-col items-center justify-center gap-6 lg:gap-8 reveal delay-250 col-span-1 lg:mt-6">
            <div
              className="relative shrink-0"
              style={{ width: "72px", height: "72px", animation: "spinSlow 22s linear infinite" }}
            >
              <AppImage
                src="/assets/images/ornament-kyrgyz-red.webp"
                alt="Кыргызский орнамент"
                fill
                className="object-contain"
                sizes="90px"
              />
            </div>
            <div
              className="relative shrink-0"
              style={{ width: "58px", height: "58px", animation: "spinSlow 15s linear infinite reverse" }}
            >
              <AppImage
                src="/assets/images/ornament-kyrgyz-blue.webp"
                alt="Кыргызский орнамент"
                fill
                className="object-contain"
                sizes="74px"
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

          {/* Small caption — feature 3, lower-left, under the big paragraph column */}
          <div className="lg:col-span-4 lg:col-start-1 lg:mt-10 reveal delay-300 order-last lg:order-none">
            <p
              className="text-label text-gold mb-3"
              style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}
            >
              {f3.number} — {f3.title}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "13px", lineHeight: 1.85, maxWidth: "320px" }}
            >
              {f3.description}
            </p>
          </div>

          {/* Photo B — feature 3, tall, rounded pill on the left edge, sits lower than Photo A */}
          <div className="lg:col-span-4 lg:col-start-9 lg:mt-20 reveal delay-350">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 4.4", borderRadius: "9999px 0 0 9999px" }}
            >
              <AppImage
                src={f3.image}
                alt={f3.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
