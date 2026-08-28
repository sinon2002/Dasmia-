"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface MetricConfig {
  target: number;
  suffix: string;
  prefix?: string;
  labelKey: string;
  sublabelKey: string;
  dataAttr: string;
}

const metricConfigs: MetricConfig[] = [
  {
    target: 0,
    suffix: "+",
    labelKey: "metrics.years.label",
    sublabelKey: "metrics.years.sublabel",
    dataAttr: "years",
  },
  {
    target: 0,
    suffix: "",
    labelKey: "metrics.halls.label",
    sublabelKey: "metrics.halls.sublabel",
    dataAttr: "halls",
  },
  {
    target: 0,
    suffix: "+",
    labelKey: "metrics.guests.label",
    sublabelKey: "metrics.guests.sublabel",
    dataAttr: "guests",
  },
  {
    target: 8,
    suffix: "",
    labelKey: "metrics.directions.label",
    sublabelKey: "metrics.directions.sublabel",
    dataAttr: "directions",
  },
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

function MetricItem({
  config,
  started,
  index,
}: {
  config: MetricConfig;
  started: boolean;
  index: number;
}) {
  const { language } = useLanguage();
  const count = useCounter(config.target, 1800, started);
  const display = config.target === 0 ? "XX" : count.toLocaleString();

  return (
    <div
      className="reveal flex flex-col border-b md:border-b-0 md:border-r last:border-0 py-10 md:py-0 md:px-8 first:pl-0 last:pr-0"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        transitionDelay: `${index * 120}ms`,
      }}
      data-counter-target={config.dataAttr}
    >
      <div className="flex items-end gap-1 mb-3">
        <span
          className="font-serif italic text-foreground"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(52px, 6.5vw, 88px)",
            lineHeight: 0.9,
            fontWeight: 300,
            color:
              config.target === 0
                ? "rgba(255,255,255,0.3)"
                : "var(--foreground)",
          }}
          aria-live="polite"
        >
          {display}
        </span>
        <span
          className="font-serif italic"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 3vw, 44px)",
            lineHeight: 1,
            color: "var(--gold)",
            marginBottom: "6px",
          }}
        >
          {config.suffix}
        </span>
      </div>
      <p
        className="text-label text-foreground mb-1"
        style={{ fontSize: "10px", letterSpacing: "0.2em" }}
      >
        {t(language, config.labelKey)}
      </p>
      <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
        {t(language, config.sublabelKey)}
      </p>
    </div>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
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
        paddingTop: "64px",
        paddingBottom: "64px",
      }}
      data-animation="counters"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {metricConfigs.map((config, i) => (
            <MetricItem
              key={config.dataAttr}
              config={config}
              started={started}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
