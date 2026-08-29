"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";

interface PhotoItem {
  image: string;
  imageAlt: string;
}

interface DirectionScrapbookSectionProps {
  bigText: string;
  smallText1: string;
  smallText2: string;
  photoTopLeft: PhotoItem;
  photoTopRight: PhotoItem;
  photoBottomLeft: PhotoItem;
  photoBottomRight: PhotoItem;
  dataDirection: string;
}

export default function DirectionScrapbookSection({
  bigText,
  smallText1,
  smallText2,
  photoTopLeft,
  photoTopRight,
  photoBottomLeft,
  photoBottomRight,
  dataDirection,
}: DirectionScrapbookSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 90);
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
        paddingBottom: "100px",
      }}
      data-direction={dataDirection}
      data-content="scrapbook"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-y-0">
          {/* Big intro text — top left */}
          <div className="lg:col-span-6 reveal">
            <p
              className="font-serif text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.4,
                fontWeight: 400,
                maxWidth: "540px",
              }}
            >
              {bigText}
            </p>
          </div>

          {/* Spinning ornaments — top right */}
          <div className="hidden lg:flex lg:col-span-2 lg:col-start-11 flex-col items-center gap-6 reveal delay-100">
            <div
              className="relative"
              style={{ width: "70px", height: "54px", animation: "spinSlow 20s linear infinite" }}
            >
              <AppImage src="/assets/images/ornament-yurt.png" alt="Орнамент юрты" fill className="object-contain" sizes="70px" />
            </div>
            <div
              className="relative"
              style={{ width: "64px", height: "58px", animation: "spinSlow 14s linear infinite reverse" }}
            >
              <AppImage src="/assets/images/ornament-sun.png" alt="Солнечный орнамент" fill className="object-contain" sizes="64px" />
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

          {/* Photo top-left — portrait, top-left corner arched */}
          <div className="lg:col-span-3 lg:mt-10 reveal delay-150">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 3.8", borderRadius: "9999px 0 0 0" }}
            >
              <AppImage src={photoTopLeft.image} alt={photoTopLeft.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 300px" />
            </div>
          </div>

          {/* Photo top-right — landscape, top-right corner arched */}
          <div className="lg:col-span-5 lg:col-start-5 lg:mt-24 reveal delay-200">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16 / 9", borderRadius: "0 9999px 0 0" }}
            >
              <AppImage src={photoTopRight.image} alt={photoTopRight.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 480px" />
            </div>
          </div>

          {/* Small text 1 — below top-left photo */}
          <div className="lg:col-span-3 reveal delay-250">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "260px" }}
            >
              {smallText1}
            </p>
          </div>

          {/* Photo bottom-left — mostly rectangular */}
          <div className="lg:col-span-4 lg:col-start-1 lg:mt-16 reveal delay-300">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4 / 3", borderRadius: "12px" }}
            >
              <AppImage src={photoBottomLeft.image} alt={photoBottomLeft.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 400px" />
            </div>
          </div>

          {/* Small text 2 — middle */}
          <div className="lg:col-span-3 lg:col-start-6 lg:mt-16 reveal delay-350">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "260px" }}
            >
              {smallText2}
            </p>
          </div>

          {/* Photo bottom-right — portrait, bottom-right corner arched */}
          <div className="lg:col-span-3 lg:col-start-10 reveal delay-400">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 4", borderRadius: "0 0 9999px 0" }}
            >
              <AppImage src={photoBottomRight.image} alt={photoBottomRight.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 300px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
