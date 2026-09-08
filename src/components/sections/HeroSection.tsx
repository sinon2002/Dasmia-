"use client";

import React, { useRef } from "react";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Главный баннер DASMIA"
      data-animation="hero"
    >
      {/* Cinematic Background Video.
          NOTE: place the actual video file at
          public/assets/videos/hero-background.mp4 — until it's added,
          the browser simply keeps showing the poster image below, so
          nothing breaks. */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/IMG_2161.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for legibility of the header sitting on top */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.32)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,11,0.35) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
