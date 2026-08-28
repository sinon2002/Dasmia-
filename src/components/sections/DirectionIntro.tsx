"use client";

import React, { useRef, useEffect } from "react";

interface DirectionIntroProps {
  label: string;
  heading: string;
  headingItalic?: string;
  body: string;
  details?: { label: string; value: string }[];
  dataDirection: string;
}

export default function DirectionIntro({
  label,
  heading,
  headingItalic,
  body,
  details,
  dataDirection,
}: DirectionIntroProps) {
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
      data-content="intro"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
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
              className="reveal delay-100 font-serif text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 4vw, 58px)",
                lineHeight: 1.0,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {heading}
              {headingItalic && (
                <>
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {headingItalic}
                  </em>
                </>
              )}
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="reveal-right delay-200 text-muted-foreground leading-relaxed mb-10"
              style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.8 }}
            >
              {body}
            </p>

            {details && details.length > 0 && (
              <div
                className="reveal-right delay-300 grid grid-cols-2 gap-6 pt-8 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {details.map((d) => (
                  <div key={d.label}>
                    <p
                      className="text-gold mb-1"
                      style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                    >
                      {d.label}
                    </p>
                    <p className="text-foreground" style={{ fontSize: "14px" }}>
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
