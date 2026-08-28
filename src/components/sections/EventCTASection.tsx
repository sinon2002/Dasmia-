"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function EventCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 130);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        minHeight: "520px",
      }}
      data-content="event-cta"
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/assets/images/IMG_9009.webp"
          alt="Грандиозный зал торжеств и конференций DASMIA"
          fill
          className="object-cover"
          priority={false}
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.7) 50%, rgba(11,11,11,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="reveal flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="text-label text-gold"
              style={{ fontSize: "10px", letterSpacing: "0.24em" }}
            >
              {t(language, "event_cta.label")}
            </span>
          </div>

          <h2
            className="reveal delay-100 font-serif text-foreground mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 5.5vw, 76px)",
              lineHeight: 0.92,
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            {t(language, "event_cta.title")}
            <br />
            <em
              style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}
            >
              {t(language, "event_cta.title.em")}
            </em>
          </h2>

          <div
            className="reveal delay-200 w-16 h-px my-7"
            style={{ background: "var(--gold)" }}
          />

          <p
            className="reveal delay-300 text-muted-foreground leading-relaxed mb-10"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)", maxWidth: "440px" }}
          >
            {t(language, "event_cta.description")}
          </p>

          <div className="reveal delay-400 flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="btn-arrow flex items-center gap-3 px-7 py-3.5 font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--black)",
                fontSize: "10px",
                letterSpacing: "0.18em",
              }}
              data-form="event-cta"
            >
              {t(language, "event_cta.book")}
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 10L10 1M10 1H3M10 1V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="btn-arrow flex items-center gap-3 px-7 py-3.5 border text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
              style={{
                borderColor: "rgba(255,255,255,0.25)",
                fontSize: "10px",
                letterSpacing: "0.18em",
              }}
            >
              {t(language, "event_cta.organize")}
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 10L10 1M10 1H3M10 1V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
