"use client";

import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

interface DirectionCenteredHeroProps {
  category: string;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  ctaLabel: string;
  hours: string;
  seats: string;
  phone: string;
  dataDirection: string;
  hoursLabel?: string;
  seatsLabel?: string;
  phoneLabel?: string;
  phoneIsLink?: boolean;
}

export default function DirectionCenteredHero({
  category,
  title,
  description,
  backgroundImage,
  backgroundAlt,
  ctaLabel,
  hours,
  seats,
  phone,
  dataDirection,
  hoursLabel = "ЧАСЫ РАБОТЫ",
  seatsLabel = "МЕСТ",
  phoneLabel = "БРОНИРОВАНИЕ",
  phoneIsLink = true,
}: DirectionCenteredHeroProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label={`${title} — DASMIA`}
      data-direction={dataDirection}
      data-animation="centered-hero"
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.55)" }}
        aria-hidden="true"
      />

      {/* Breadcrumb */}
      <nav
        className="relative z-20 pt-28 px-6 lg:px-12 xl:px-16 flex items-center gap-2"
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
        <span className="text-muted-foreground opacity-40" style={{ fontSize: "10px" }}>
          /
        </span>
        <span className="text-gold" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
          {category}
        </span>
      </nav>

      {/* Centered title + description */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <h1
          className="font-serif"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(44px, 7vw, 84px)",
            fontWeight: 300,
            letterSpacing: "0.03em",
            color: "var(--foreground)",
            lineHeight: 1,
            animation: "fadeInUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
          }}
        >
          {title}
        </h1>
        <p
          className="mt-6 mx-auto"
          style={{
            fontSize: "clamp(13px, 1.3vw, 15px)",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.75)",
            maxWidth: "480px",
            animation: "fadeInUp 0.9s ease-out 0.6s both",
          }}
        >
          {description}
        </p>
      </div>

      {/* Bottom row — CTA left, contact info right */}
      <div className="relative z-20 px-6 lg:px-12 xl:px-16 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <a
          href="#contact-cta"
          className="text-label text-foreground hover:text-gold transition-colors duration-300 border-b pb-1"
          style={{ fontSize: "11px", letterSpacing: "0.2em", borderColor: "rgba(255,255,255,0.3)" }}
        >
          {ctaLabel}
        </a>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-right">
          <div>
            <p className="text-label text-gold mb-1" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
              {hoursLabel}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{hours}</p>
          </div>
          <div>
            <p className="text-label text-gold mb-1" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
              {seatsLabel}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{seats}</p>
          </div>
          <div>
            <p className="text-label text-gold mb-1" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
              {phoneLabel}
            </p>
            {phoneIsLink ? (
              <a
                href={`tel:${phone}`}
                className="hover:text-gold transition-colors duration-300"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}
              >
                {phone}
              </a>
            ) : (
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{phone}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
