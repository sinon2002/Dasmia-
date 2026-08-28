"use client";

import React, { useRef, useEffect, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface GalleryImage {
  url: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

interface DirectionGalleryProps {
  label: string;
  heading: string;
  images: GalleryImage[];
  dataDirection: string;
}

export default function DirectionGallery({
  label,
  heading,
  images,
  dataDirection,
}: DirectionGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
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
    <>
      <section
        ref={sectionRef}
        className="relative border-b"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "rgba(255,255,255,0.06)",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
        data-direction={dataDirection}
        data-gallery={dataDirection}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="reveal flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-px"
                  style={{ background: "var(--gold)" }}
                />
                <span
                  className="text-gold"
                  style={{ fontSize: "10px", letterSpacing: "0.24em" }}
                >
                  {label}
                </span>
              </div>
              <h2
                className="reveal delay-100 font-serif text-foreground"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  lineHeight: 1.05,
                  fontWeight: 300,
                }}
              >
                {heading}
              </h2>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px]">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`reveal relative overflow-hidden group cursor-pointer text-left ${
                  img.span === "wide" ? "col-span-2" : ""
                } ${img.span === "tall" ? "row-span-2" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open image: ${img.alt}`}
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <AppImage
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,11,11,0.7) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                {/* Expand icon on hover */}
                <div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "rgba(11,11,11,0.65)",
                      border: "1px solid rgba(185,150,90,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 4V1h3M8 1h3v3M11 8v3H8M4 11H1V8"
                        stroke="#B9965A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {/* Gold border on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "var(--gold)" }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
