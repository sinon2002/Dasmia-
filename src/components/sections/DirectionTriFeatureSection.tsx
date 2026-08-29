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
        paddingTop: "80px",
        paddingBottom: "100px",
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 lg:gap-y-0">
          {/* Big text — feature 1 */}
          <div className="lg:col-span-6 reveal delay-100">
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
                fontSize: "clamp(20px, 2.2vw, 27px)",
                lineHeight: 1.5,
                fontWeight: 400,
                maxWidth: "480px",
              }}
            >
              {f1.description}
            </p>
          </div>

          {/* Photo A — top right, landscape arch */}
          <div className="lg:col-span-5 lg:col-start-8 reveal delay-150">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "5 / 6", borderRadius: "0 9999px 0 0" }}
            >
              <AppImage src={f1.image} alt={f1.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 420px" />
            </div>
          </div>

          {/* Small dim text — feature 2, mid-left */}
          <div className="lg:col-span-4 lg:mt-24 reveal delay-200">
            <p
              className="text-label mb-3"
              style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              {f2.number} — {f2.title}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "12.5px", lineHeight: 1.8, maxWidth: "300px" }}
            >
              {f2.description}
            </p>
          </div>

          {/* Decorative rotating Kyrgyz ornaments */}
          <div className="hidden lg:flex lg:col-span-2 lg:col-start-6 lg:mt-24 flex-col items-center gap-6 reveal delay-250">
            <div
              className="relative"
              style={{ width: "58px", height: "58px", animation: "spinSlow 18s linear infinite" }}
            >
              <AppImage src="/assets/images/ornament-1.png" alt="Кыргызский орнамент" fill className="object-contain" sizes="58px" />
            </div>
            <div
              className="relative"
              style={{ width: "42px", height: "42px", animation: "spinSlow 12s linear infinite reverse" }}
            >
              <AppImage src="/assets/images/ornament-2.png" alt="Кыргызский орнамент" fill className="object-contain" sizes="42px" />
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

          {/* Photo B — bottom left, tall, rounded on the right edge */}
          <div className="lg:col-span-4 lg:mt-8 reveal delay-300">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 4.6", borderRadius: "0 9999px 9999px 0" }}
            >
              <AppImage src={f2.image} alt={f2.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 340px" />
            </div>
          </div>

          {/* Caption text — feature 3, bottom middle */}
          <div className="lg:col-span-3 lg:col-start-6 lg:mt-auto lg:self-end reveal delay-350">
            <p
              className="text-label text-gold mb-3"
              style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}
            >
              {f3.number} — {f3.title}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "260px" }}
            >
              {f3.description}
            </p>
          </div>

          {/* Photo C — bottom right, portrait, top-right rounded */}
          <div className="lg:col-span-3 lg:col-start-10 reveal delay-400">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 4.2", borderRadius: "0 9999px 0 0" }}
            >
              <AppImage src={f3.image} alt={f3.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 300px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
