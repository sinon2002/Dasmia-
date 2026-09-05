"use client";

import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

interface StripImage {
  url: string;
  alt: string;
  arch?: boolean;
}

interface DirectionShowcaseHeroProps {
  category: string;
  title: string;
  description: string;
  images: StripImage[];
  dataDirection: string;
}

export default function DirectionShowcaseHero({
  category,
  title,
  description,
  images,
  dataDirection,
}: DirectionShowcaseHeroProps) {
  return (
    <section
      className="relative theme-fixed-dark"
      style={{ backgroundColor: "var(--charcoal)", paddingTop: "160px" }}
      aria-label={`${title} — DASMIA`}
      data-direction={dataDirection}
      data-animation="showcase-hero"
    >
      {/* Breadcrumb */}
      <nav
        className="absolute top-28 left-6 lg:left-12 xl:left-16 flex items-center gap-2"
        aria-label="Breadcrumb Navigation"
        style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
      >
        <Link
          href="/"
          className="text-muted-foreground hover:text-gold transition-colors duration-300"
          style={{ fontSize: "10px", letterSpacing: "0.18em" }}
        >
          DASMIA
        </Link>
        <span
          className="text-muted-foreground opacity-40"
          style={{ fontSize: "10px" }}
        >
          /
        </span>
        <span className="text-gold" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
          {category}
        </span>
      </nav>

      {/* Centered title + description */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-16">
        <h1
          className="font-serif"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(38px, 6vw, 68px)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            color: "var(--gold)",
            lineHeight: 1.05,
            animation: "fadeInUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
          }}
        >
          {title}
        </h1>
        <p
          className="text-muted-foreground mt-6 mx-auto"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            lineHeight: 1.7,
            maxWidth: "560px",
            animation: "fadeInUp 0.9s ease-out 0.6s both",
          }}
        >
          {description}
        </p>
      </div>

      {/* Horizontal photo strip — continuous auto-sliding marquee, line-group.kz style */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "min(340px, 52vw)" }}
      >
        <div
          className="flex absolute top-0 left-0 h-full"
          style={{
            width: "max-content",
            gap: "10px",
            animation: `showcaseStrip ${images.length * 6}s linear infinite`,
          }}
        >
          {[...images, ...images, ...images].map((img, i) => (
            <div
              key={img.url + i}
              className="relative shrink-0 h-full"
              style={{
                width: "min(260px, 40vw)",
                borderRadius: img.arch ? "0 9999px 0 0" : "0",
              }}
            >
              <AppImage
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes showcaseStrip {
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
