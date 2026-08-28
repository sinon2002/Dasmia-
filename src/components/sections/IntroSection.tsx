"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(
                ".reveal, .reveal-left, .reveal-right, .reveal-scale",
              )
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 120);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "96px",
        paddingBottom: "80px",
      }}
      data-content="intro"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left — Image collage */}
          <div className="lg:col-span-6 reveal-left">
            <div className="mx-auto" style={{ maxWidth: "480px" }}>
              {/* Image A — arched top, main shot */}
              <div
                className="img-zoom relative overflow-hidden reveal-scale"
                style={{
                  width: "64%",
                  aspectRatio: "0.9/1",
                  borderRadius: "50% 50% 14px 14px",
                }}
              >
                <AppImage
                  src="/assets/images/IMG_9009.webp"
                  alt="Архитектурный интерьер DASMIA — грандиозный купол Айкөл Ордо с мозаикой и тёплым освещением"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 64vw, 32vw"
                />

                {/* Gold corner accent */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "14px",
                    left: "14px",
                    width: "28px",
                    height: "28px",
                    borderTop: "2px solid var(--gold)",
                    borderLeft: "2px solid var(--gold)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Number accent + Image B row */}
              <div className="flex items-end justify-between gap-4 mt-6">
                <div className="reveal delay-200 pb-2">
                  <span
                    className="block font-serif italic text-gold"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(40px, 4.2vw, 60px)",
                      lineHeight: 1,
                      fontWeight: 300,
                    }}
                  >
                    8
                  </span>
                  <span
                    className="block text-label text-foreground mt-2"
                    style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                  >
                    {t(language, "metrics.directions.label")}
                  </span>
                  <span
                    className="block text-muted-foreground mt-1"
                    style={{ fontSize: "12px" }}
                  >
                    {t(language, "metrics.directions.sublabel")}
                  </span>
                </div>

                <div
                  className="img-zoom relative overflow-hidden reveal-scale delay-200 shrink-0"
                  style={{
                    width: "46%",
                    aspectRatio: "1/1",
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <AppImage
                    src="/assets/images/IMG_8995.webp"
                    alt="Праздничная сервировка стола DASMIA — гастрономия и банкетное обслуживание"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 46vw, 24vw"
                  />
                </div>
              </div>

              {/* Image C — circle */}
              <div
                className="img-zoom relative overflow-hidden reveal-scale delay-300 ml-auto mr-0"
                style={{
                  width: "60%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  marginTop: "-8%",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                }}
              >
                <AppImage
                  src="/assets/images/IMG_9031.webp"
                  alt="Декоративное золотое панно с национальным орнаментом в интерьере DASMIA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 60vw, 30vw"
                />
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="lg:col-span-6 lg:col-start-7">
            {/* Label */}
            <div className="reveal flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-label text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "intro.label")}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="reveal font-serif text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 4.5vw, 62px)",
                lineHeight: 1.02,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {t(language, "intro.title")}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                {t(language, "intro.title.em")}
              </em>
            </h2>

            {/* Divider */}
            <div
              className="reveal w-16 h-px my-8 delay-100"
              style={{ background: "var(--gold)" }}
            />

            {/* Body text */}
            <div className="reveal delay-200 space-y-5">
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
              >
                {t(language, "intro.p1")}
              </p>
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
              >
                {t(language, "intro.p2")}
              </p>
            </div>

            {/* Architectural ornament quote */}
            <div
              className="reveal delay-300 mt-10 pl-6 border-l"
              style={{ borderColor: "var(--gold)" }}
            >
              <p
                className="font-serif italic text-foreground"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontWeight: 300,
                  lineHeight: 1.4,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {t(language, "intro.quote")}
              </p>
            </div>

            {/* CTA link */}
            <div className="reveal delay-400 mt-10">
              <a
                href="#directions"
                className="btn-arrow inline-flex items-center gap-3 border-b pb-2 text-foreground hover:text-gold hover:border-gold transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                }}
              >
                {t(language, "intro.cta")}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
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
      </div>

      {/* Subtle Kyrgyz geometric ornament */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none opacity-3"
        style={{ opacity: 0.03 }}
        aria-hidden="true"
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="160" cy="160" r="140" stroke="white" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="100" stroke="white" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="60" stroke="white" strokeWidth="0.5" />
          <path
            d="M160 20 L160 300 M20 160 L300 160 M55 55 L265 265 M265 55 L55 265"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      </div>
    </section>
  );
}
