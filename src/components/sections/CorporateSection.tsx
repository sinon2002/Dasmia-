"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface CorporateServiceConfig {
  labelKey: string;
  descKey: string;
}

const corporateServiceConfigs: CorporateServiceConfig[] = [
  {
    labelKey: "corporate.s1.label",
    descKey: "corporate.s1.desc",
  },
  {
    labelKey: "corporate.s2.label",
    descKey: "corporate.s2.desc",
  },
  {
    labelKey: "corporate.s3.label",
    descKey: "corporate.s3.desc",
  },
  {
    labelKey: "corporate.s4.label",
    descKey: "corporate.s4.desc",
  },
  {
    labelKey: "corporate.s5.label",
    descKey: "corporate.s5.desc",
  },
  {
    labelKey: "corporate.s6.label",
    descKey: "corporate.s6.desc",
  },
];

export default function CorporateSection() {
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
                setTimeout(() => el.classList.add("revealed"), i * 100);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="corporate"
      ref={sectionRef}
      className="relative border-t"
      style={{
        backgroundColor: "var(--charcoal)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      data-content="corporate"
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 opacity-3"
          style={{
            opacity: 0.03,
            width: "40vw",
            height: "40vw",
            maxWidth: "600px",
          }}
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="0.5" />
          <path
            d="M200 20 L200 380 M20 200 L380 200 M75 75 L325 325 M325 75 L75 325"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      </div>

      <div className="relative max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="reveal flex items-center gap-3 mb-7">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-label text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "corporate.label")}
              </span>
            </div>

            <h2
              className="reveal delay-100 font-serif text-foreground mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 1.0,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {t(language, "corporate.title.p1")}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                {t(language, "corporate.title.em")}
              </em>
              <br />
              {t(language, "corporate.title.p2")}
            </h2>

            <p
              className="reveal delay-200 text-muted-foreground leading-relaxed mb-10"
              style={{
                fontSize: "clamp(13px, 1.2vw, 15px)",
                maxWidth: "380px",
              }}
            >
              {t(language, "corporate.description")}
            </p>

            <div className="reveal delay-300 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-arrow flex items-center justify-center gap-3 px-7 py-3.5 font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--black)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-sans)",
                }}
                data-form="corporate-cta"
              >
                {t(language, "corporate.cta.quote")}
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
                href="tel:[CLIENT PHONE]"
                className="btn-arrow flex items-center justify-center gap-3 px-7 py-3.5 border text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                }}
              >
                [CLIENT PHONE]
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {corporateServiceConfigs.map((service, i) => (
                <div
                  key={service.labelKey}
                  className="reveal reveal-scale card-gold-hover border p-5 transition-all duration-400 hover:border-gold group"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="w-3 h-px mt-2.5 flex-shrink-0"
                      style={{ background: "var(--gold)" }}
                    />
                    <p
                      className="text-foreground group-hover:text-gold transition-colors duration-300"
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {t(language, service.labelKey)}
                    </p>
                  </div>
                  <p
                    className="text-muted-foreground pl-6"
                    style={{ fontSize: "12px" }}
                  >
                    {t(language, service.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
