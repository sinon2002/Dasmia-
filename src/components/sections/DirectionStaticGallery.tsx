"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";

interface GalleryImage {
  url: string;
  alt: string;
}

interface DirectionStaticGalleryProps {
  tagline: string;
  images: GalleryImage[];
  moreLabel?: string;
  dataDirection: string;
}

export default function DirectionStaticGallery({
  tagline,
  images,
  moreLabel = "ПОКАЗАТЬ БОЛЬШЕ ФОТО",
  dataDirection,
}: DirectionStaticGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 80);
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
        paddingBottom: "80px",
      }}
      data-direction={dataDirection}
      data-content="static-gallery"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <p
          className="text-gold mb-10 reveal"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </p>

        <div className="flex gap-2.5 overflow-x-auto lg:overflow-visible lg:flex-wrap pb-2 reveal delay-100">
          {images.map((img, i) => (
            <div
              key={img.url + i}
              className="relative shrink-0"
              style={{
                width: "min(240px, 60vw)",
                aspectRatio: "4 / 3.4",
                borderRadius: "6px",
                overflow: "hidden",
                flex: "1 1 180px",
              }}
            >
              <AppImage
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 240px"
              />
            </div>
          ))}
        </div>

        {moreLabel && (
          <div className="mt-10 text-center reveal delay-200">
            <a
              href="#"
              className="text-label text-gold hover:opacity-70 transition-opacity duration-300 border-b pb-1"
              style={{ fontSize: "10px", letterSpacing: "0.18em", borderColor: "rgba(212,175,55,0.4)" }}
            >
              {moreLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
