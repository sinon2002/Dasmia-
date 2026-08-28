"use client";

import React, { useRef, useEffect } from "react";
import AppImage from "@/components/ui/AppImage";

interface Feature {
  number: string;
  title: string;
  description: string;
}

interface DirectionFeaturesProps {
  label: string;
  heading: string;
  features: Feature[];
  imageUrl: string;
  imageAlt: string;
  imageRight?: boolean;
  dataDirection: string;
}

export default function DirectionFeatures({
  label,
  heading,
  features,
  imageUrl,
  imageAlt,
  imageRight = false,
  dataDirection,
}: DirectionFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
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

  const contentCol = (
    <div className={`lg:col-span-5 ${imageRight ? "" : "lg:col-start-7"}`}>
      <div className="reveal flex items-center gap-3 mb-7">
        <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
        <span
          className="text-gold"
          style={{ fontSize: "10px", letterSpacing: "0.24em" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="reveal delay-100 font-serif text-foreground mb-10"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(28px, 3.5vw, 48px)",
          lineHeight: 1.05,
          fontWeight: 300,
        }}
      >
        {heading}
      </h2>
      <div className="flex flex-col gap-8">
        {features.map((f, i) => (
          <div
            key={f.number}
            className="reveal flex gap-5 items-start"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              className="font-serif text-gold flex-shrink-0"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                marginTop: "2px",
              }}
            >
              {f.number}
            </span>
            <div>
              <h3
                className="text-foreground mb-2"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                }}
              >
                {f.title}
              </h3>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13px", lineHeight: 1.7 }}
              >
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const imageCol = (
    <div className={`lg:col-span-6 ${imageRight ? "lg:col-start-7" : ""}`}>
      <div
        className="reveal-right relative overflow-hidden"
        style={{ aspectRatio: "4/5" }}
      >
        <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
          <AppImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(11,11,11,0.4) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );

  return (
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
      data-content="features"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {imageRight ? (
            <>
              {contentCol}
              {imageCol}
            </>
          ) : (
            <>
              {imageCol}
              {contentCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
