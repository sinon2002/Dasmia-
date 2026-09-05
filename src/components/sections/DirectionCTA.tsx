"use client";

import React, { useRef, useEffect, useState } from "react";
import { submitLead } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface DirectionCTAProps {
  heading: string;
  headingItalic?: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  dataDirection: string;
}

export default function DirectionCTA({
  heading,
  headingItalic,
  description,
  primaryLabel,
  secondaryLabel,
  dataDirection,
}: DirectionCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t(language, "contact.error.name"));
      return;
    }
    if (!phone.trim()) {
      setError(t(language, "contact.error.phone"));
      return;
    }
    if (!/^[\+\d\s\-\(\)]{7,}$/.test(phone.trim())) {
      setError(t(language, "contact.error.phone_invalid"));
      return;
    }
    setError("");
    setLoading(true);
    const result = await submitLead({
      form_type: dataDirection,
      name: name.trim(),
      phone: phone.trim(),
      payload: { direction: dataDirection },
      captcha_token: "frontend-token",
      website: honeypot,
    });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message || t(language, "contact.error.general"));
    }
  };

  const resolvedPrimaryLabel = primaryLabel || t(language, "page.book_now");
  const resolvedSecondaryLabel = secondaryLabel || t(language, "page.call_us");

  return (
    <section
      id="contact-cta"
      ref={sectionRef}
      className="relative border-b theme-fixed-dark"
      style={{
        backgroundColor: "var(--charcoal)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
      data-direction={dataDirection}
      data-content="cta"
    >
      {/* Decorative gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="lg:col-span-6">
            <div className="reveal flex items-center gap-3 mb-7">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "contact.label")}
              </span>
            </div>
            <h2
              className="reveal delay-100 font-serif text-foreground mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 4.5vw, 64px)",
                lineHeight: 1.0,
                fontWeight: 300,
              }}
            >
              {heading}
              {headingItalic && (
                <>
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {headingItalic}
                  </em>
                </>
              )}
            </h2>
            <p
              className="reveal delay-200 text-muted-foreground leading-relaxed"
              style={{ fontSize: "14px", maxWidth: "420px", lineHeight: 1.8 }}
            >
              {description}
            </p>
          </div>

          {/* Right — inline mini form */}
          <div className="lg:col-span-5 lg:col-start-8">
            {submitted ? (
              <div
                className="border-l pl-10 opacity-100 transition-all duration-700 ease-out"
                style={{ borderColor: "rgba(185,150,90,0.25)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-6 h-px"
                    style={{ background: "var(--gold)" }}
                  />
                  <span
                    className="text-gold"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    {t(language, "contact.sent.label")}
                  </span>
                </div>
                <h3
                  className="font-serif text-foreground mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(22px, 2.5vw, 34px)",
                    fontWeight: 300,
                  }}
                >
                  {t(language, "contact.success")}
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {t(language, "contact.success.em")}
                  </em>
                </h3>
                <p
                  className="text-muted-foreground mb-6"
                  style={{ fontSize: "13px", lineHeight: 1.7 }}
                >
                  {t(language, "contact.success.desc")}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("");
                  }}
                  className="text-muted-foreground hover:text-gold transition-colors duration-300 border-b pb-1"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    background: "none",
                    borderColor: "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                  }}
                >
                  {t(language, "contact.send_another")}
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="reveal-right delay-200 border-l pl-10 flex flex-col gap-6"
                style={{ borderColor: "rgba(185,150,90,0.25)" }}
                data-form="direction-cta"
                data-direction={dataDirection}
              >
                {/* Honeypot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`cta-name-${dataDirection}`}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {t(language, "contact.name")} <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id={`cta-name-${dataDirection}`}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t(language, "contact.name.placeholder")}
                    autoComplete="name"
                    style={{
                      backgroundColor: "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      color: "var(--foreground)",
                      fontSize: "14px",
                      padding: "10px 0",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`cta-phone-${dataDirection}`}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {t(language, "contact.phone")} <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id={`cta-phone-${dataDirection}`}
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t(language, "contact.phone.placeholder")}
                    autoComplete="tel"
                    style={{
                      backgroundColor: "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      color: "var(--foreground)",
                      fontSize: "14px",
                      padding: "10px 0",
                      outline: "none",
                    }}
                  />
                </div>
                {error && (
                  <p style={{ fontSize: "11px", color: "#e57373" }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-arrow flex items-center gap-3 px-7 py-3.5 font-medium transition-all duration-300 hover:opacity-90 self-start mt-2"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    border: "none",
                  }}
                >
                  {loading ? t(language, "contact.submitting") : resolvedPrimaryLabel}
                  {!loading && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
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
                  )}
                </button>
                {resolvedSecondaryLabel && (
                  <a
                    href="tel:[CLIENT PHONE]"
                    className="text-muted-foreground hover:text-gold transition-colors duration-300 border-b pb-1 self-start"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    {resolvedSecondaryLabel}
                  </a>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
