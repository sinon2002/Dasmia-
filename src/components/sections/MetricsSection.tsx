"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface MetricConfig {
  target: number;
  suffix: string;
  labelKey: string;
  sublabelKey: string;
}

const metricConfigs: MetricConfig[] = [
  { target: 8, suffix: "", labelKey: "metrics.directions.label", sublabelKey: "metrics.directions.sublabel" },
  { target: 0, suffix: "+", labelKey: "metrics.years.label", sublabelKey: "metrics.years.sublabel" },
  { target: 0, suffix: "", labelKey: "metrics.halls.label", sublabelKey: "metrics.halls.sublabel" },
];

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function BigNumber({ config, started }: { config: MetricConfig; started: boolean }) {
  const { language } = useLanguage();
  const count = useCounter(config.target, 1600, started);
  const display = config.target === 0 ? "XX" : count.toLocaleString();
  return (
    <div>
      <div className="flex items-end gap-1">
        <span
          className="font-serif"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(48px, 6vw, 80px)",
            lineHeight: 0.9,
            fontWeight: 400,
            color:
              config.target === 0 ? "rgba(255,255,255,0.3)" : "var(--gold)",
          }}
        >
          {display}
        </span>
        {config.suffix && (
          <span
            className="font-serif"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(24px, 2.6vw, 40px)",
              color: "var(--gold)",
              marginBottom: "6px",
            }}
          >
            {config.suffix}
          </span>
        )}
      </div>
      <p
        className="text-label text-foreground mt-2"
        style={{ fontSize: "10px", letterSpacing: "0.18em" }}
      >
        {t(language, config.labelKey)}
      </p>
      <p className="text-muted-foreground mt-1" style={{ fontSize: "12px" }}>
        {t(language, config.sublabelKey)}
      </p>
    </div>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 100);
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

  return (
    <section
      ref={sectionRef}
      className="relative border-t overflow-hidden"
      style={{
        backgroundColor: "var(--charcoal)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "100px",
        paddingBottom: "120px",
      }}
      data-animation="counters"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Eyebrow title, like "LINE GROUP" on line-group.kz */}
        <h2
          className="reveal font-serif mb-20"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: "var(--gold)",
          }}
        >
          DASMIA
        </h2>

        {/* Scattered scrapbook grid — asymmetric positions, arched photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 lg:gap-y-0">
          {/* Arched portrait photo — top left */}
          <div className="lg:col-span-4 reveal-left">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "9999px 9999px 0 0",
                maxWidth: "420px",
              }}
            >
              <AppImage
                src="/assets/images/IMG_9009.webp"
                alt="Банкетный зал DASMIA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>

          {/* Text block — aligned with photo top, offset right */}
          <div className="lg:col-span-4 lg:col-start-6 reveal delay-150 flex flex-col justify-start pt-2 lg:pt-8">
            <p
              className="text-foreground"
              style={{ fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.7 }}
            >
              {t(language, "intro.p1")}
            </p>
          </div>

          {/* Big number 1 — offset lower, right column */}
          <div className="lg:col-span-3 lg:col-start-10 reveal delay-200 lg:pt-24">
            <BigNumber config={metricConfigs[0]} started={started} />
          </div>

          {/* Landscape photo — mid row, staggered lower */}
          <div className="lg:col-span-4 lg:col-start-3 reveal delay-250 lg:mt-24">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 11",
                borderRadius: "0 0 9999px 0",
                maxWidth: "460px",
              }}
            >
              <AppImage
                src="/assets/images/IMG_8995.webp"
                alt="Ресторан DASMIA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 460px"
              />
            </div>
          </div>

          {/* Big number 2 — beside landscape photo */}
          <div className="lg:col-span-3 lg:col-start-8 reveal delay-300 lg:mt-24 lg:pt-10">
            <BigNumber config={metricConfigs[1]} started={started} />
          </div>

          {/* Big number 3 — full width center, largest */}
          <div className="lg:col-span-6 lg:col-start-4 reveal delay-350 text-center lg:mt-32">
            <BigNumber config={metricConfigs[2]} started={started} />
          </div>

          {/* Arched photo bottom — closing visual, offset left */}
          <div className="lg:col-span-5 lg:col-start-5 reveal delay-400 lg:mt-16">
            <div
              className="relative w-full overflow-hidden mx-auto"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "9999px 9999px 0 0",
                maxWidth: "380px",
              }}
            >
              <AppImage
                src="/assets/images/IMG_2160.webp"
                alt="Этно-Село DASMIA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
