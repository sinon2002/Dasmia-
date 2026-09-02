"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C%20%D1%83%D0%BB.%20%D0%90%D0%BD%D0%BA%D0%B0%D1%80%D0%B0%202%D0%91&output=embed";

export default function ContactMapSection() {
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
                setTimeout(() => el.classList.add("revealed"), i * 120);
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative border-t scroll-mt-24"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "90px",
        paddingBottom: "90px",
      }}
      data-content="contact-map"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — title + contact details */}
          <div className="lg:col-span-4 reveal-left">
            <h2
              className="font-serif mb-10"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                lineHeight: 1.05,
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--gold)",
              }}
            >
              {t(language, "contactmap.title.l1")}
              <br />
              {t(language, "contactmap.title.l2")}
            </h2>

            <div className="flex flex-col gap-6">
              <a
                href="tel:[CLIENT PHONE]"
                className="text-foreground hover:text-gold transition-colors duration-300"
                style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
              >
                [CLIENT PHONE]
              </a>

              <address
                className="not-italic text-muted-foreground"
                style={{ fontSize: "16px", lineHeight: 1.6 }}
              >
                {t(language, "contact.address.value")}
              </address>

              <a
                href="mailto:[CLIENT EMAIL]"
                className="text-muted-foreground hover:text-gold transition-colors duration-300"
                style={{ fontSize: "16px" }}
              >
                [CLIENT EMAIL]
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Бишкек,+ул.+Анкара+2Б"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-gold hover:opacity-70 transition-opacity duration-300 border-b pb-1 self-start"
                style={{ fontSize: "11px", letterSpacing: "0.16em", borderColor: "rgba(212,175,55,0.4)" }}
              >
                {t(language, "contactmap.directions")}
              </a>
            </div>
          </div>

          {/* Right — map, square */}
          <div className="lg:col-span-8 reveal-right delay-150">
            <div
              className="relative w-full overflow-hidden mx-auto"
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "12px",
                maxWidth: "760px",
              }}
            >
              <iframe
                src={MAP_EMBED_SRC}
                title="DASMIA на карте"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 border-0"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
