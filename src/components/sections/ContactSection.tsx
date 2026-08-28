"use client";

import React, { useState, useRef, useEffect } from "react";
import { submitLead } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface FormData {
  name: string;
  phone: string;
  direction: string;
  contactMethod: string;
  comment: string;
  privacy: boolean;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  phone?: string;
  direction?: string;
  contactMethod?: string;
  privacy?: string;
}

const directionKeys = [
  "directions.banquet.title",
  "directions.restaurant.title",
  "directions.chaikhana.title",
  "directions.fitness.title",
  "directions.pools.title",
  "directions.spa.title",
  "directions.ethno.title",
  "directions.events.title",
  "corporate.label",
];

const contactMethods = ["Telegram", "WhatsApp", "Позвоните мне"];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    direction: "",
    contactMethod: "",
    comment: "",
    privacy: false,
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t(language, "contact.error.name");
    if (!formData.phone.trim()) {
      newErrors.phone = t(language, "contact.error.phone");
    } else if (!/^[\+\d\s\-\(\)]{7,}$/.test(formData.phone.trim())) {
      newErrors.phone = t(language, "contact.error.phone_invalid");
    }
    if (!formData.direction) newErrors.direction = t(language, "contact.error.direction");
    if (!formData.contactMethod)
      newErrors.contactMethod = "Выберите способ связи";
    if (!formData.privacy)
      newErrors.privacy = t(language, "contact.error.privacy");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    const result = await submitLead({
      form_type: "contact",
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      payload: {
        direction: formData.direction,
        contact_method: formData.contactMethod,
        message: formData.comment,
      },
      captcha_token: "frontend-token",
      website: formData.website,
    });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setApiError(result.message || t(language, "contact.error.general"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyle = {
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    color: "var(--foreground)",
    fontSize: "14px",
    padding: "10px 0",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "0.18em",
    color: "var(--muted-foreground)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative border-t"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      data-content="contact"
      data-form="main"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left info */}
          <div className="lg:col-span-4">
            <div className="reveal flex items-center gap-3 mb-7">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="text-label text-gold"
                style={{ fontSize: "10px", letterSpacing: "0.24em" }}
              >
                {t(language, "contact.label")}
              </span>
            </div>

            <h2
              className="reveal delay-100 font-serif text-foreground mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: 1.05,
                fontWeight: 300,
              }}
            >
              {t(language, "contact.title")}
              <br />
              <em
                style={{ fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}
              >
                {t(language, "contact.title.em")}
              </em>
            </h2>

            <div className="reveal delay-200 space-y-6 mt-10">
              <div>
                <p
                  className="text-label text-gold mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  {t(language, "contact.address.label")}
                </p>
                <address
                  className="not-italic text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {t(language, "contact.address.value")}
                </address>
              </div>
              <div>
                <p
                  className="text-label text-gold mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  {t(language, "contact.phone.label")}
                </p>
                <a
                  href="tel:[CLIENT PHONE]"
                  className="text-foreground hover:text-gold transition-colors duration-300"
                  style={{ fontSize: "14px" }}
                >
                  [CLIENT PHONE]
                </a>
              </div>
              <div>
                <p
                  className="text-label text-gold mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  {t(language, "contact.email.label")}
                </p>
                <a
                  href="mailto:[CLIENT EMAIL]"
                  className="text-foreground hover:text-gold transition-colors duration-300"
                  style={{ fontSize: "14px" }}
                >
                  [CLIENT EMAIL]
                </a>
              </div>
              <div>
                <p
                  className="text-label text-gold mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  {t(language, "contact.hours.label")}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px" }}
                >
                  {t(language, "contact.hours.value")}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <div
                className="flex flex-col items-start justify-center h-full py-16 border-l pl-10 opacity-100 transition-all duration-700 ease-out"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-px"
                    style={{ background: "var(--gold)" }}
                  />
                  <span
                    className="text-label text-gold"
                    style={{ fontSize: "10px", letterSpacing: "0.24em" }}
                  >
                    {t(language, "contact.sent.label")}
                  </span>
                </div>
                <h3
                  className="font-serif text-foreground mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(24px, 3vw, 38px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  {t(language, "contact.success")}
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {t(language, "contact.success.em")}
                  </em>
                </h3>
                <p
                  className="text-muted-foreground mb-8"
                  style={{
                    fontSize: "14px",
                    maxWidth: "360px",
                    lineHeight: 1.7,
                  }}
                >
                  {t(language, "contact.success.desc")}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      direction: "",
                      contactMethod: "",
                      comment: "",
                      privacy: false,
                      website: "",
                    });
                  }}
                  className="btn-arrow inline-flex items-center gap-3 border-b pb-2 text-foreground hover:text-gold hover:border-gold transition-all duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    background: "none",
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
                className="reveal-right delay-200 border-l pl-10"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                data-form="contact"
              >
                {/* Honeypot — hidden from real users */}
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
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-label text-muted-foreground"
                      style={labelStyle}
                    >
                      {t(language, "contact.name")} <span className="text-gold">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t(language, "contact.name.placeholder")}
                      autoComplete="name"
                      style={inputStyle}
                    />
                    {errors.name && (
                      <span style={{ fontSize: "11px", color: "#e57373" }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-label text-muted-foreground"
                      style={labelStyle}
                    >
                      {t(language, "contact.phone")} <span className="text-gold">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t(language, "contact.phone.placeholder")}
                      autoComplete="tel"
                      style={inputStyle}
                    />
                    {errors.phone && (
                      <span style={{ fontSize: "11px", color: "#e57373" }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direction */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label
                    htmlFor="contact-direction"
                    className="text-label text-muted-foreground"
                    style={labelStyle}
                  >
                    {t(language, "contact.direction")} <span className="text-gold">*</span>
                  </label>
                  <select
                    id="contact-direction"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "var(--charcoal)" }}
                    >
                      {t(language, "contact.direction.placeholder")}
                    </option>
                    {directionKeys.map((key) => {
                      const label = t(language, key);
                      return (
                        <option
                          key={key}
                          value={label}
                          style={{ backgroundColor: "var(--charcoal)" }}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                  {errors.direction && (
                    <span style={{ fontSize: "11px", color: "#e57373" }}>
                      {errors.direction}
                    </span>
                  )}
                </div>

                {/* Contact method — Telegram / WhatsApp / Позвоните мне */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label
                    htmlFor="contact-method"
                    className="text-label text-muted-foreground"
                    style={labelStyle}
                  >
                    Как с вами связаться <span className="text-gold">*</span>
                  </label>
                  <select
                    id="contact-method"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "var(--charcoal)" }}
                    >
                      Выберите способ связи
                    </option>
                    {contactMethods.map((method) => (
                      <option
                        key={method}
                        value={method}
                        style={{ backgroundColor: "var(--charcoal)" }}
                      >
                        {method}
                      </option>
                    ))}
                  </select>
                  {errors.contactMethod && (
                    <span style={{ fontSize: "11px", color: "#e57373" }}>
                      {errors.contactMethod}
                    </span>
                  )}
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label
                    htmlFor="contact-message"
                    className="text-label text-muted-foreground"
                    style={labelStyle}
                  >
                    {t(language, "contact.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder={t(language, "contact.message.placeholder")}
                    rows={4}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                {/* Privacy */}
                <div className="flex flex-col gap-2 mb-10">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      id="contact-privacy"
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="mt-0.5 flex-shrink-0"
                      style={{
                        accentColor: "var(--gold)",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                    <span
                      className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      style={{ fontSize: "12px", lineHeight: 1.6 }}
                    >
                      {t(language, "contact.privacy")}
                    </span>
                  </label>
                  {errors.privacy && (
                    <span style={{ fontSize: "11px", color: "#e57373" }}>
                      {errors.privacy}
                    </span>
                  )}
                </div>

                {/* API Error */}
                {apiError && (
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "12px",
                      color: "#e57373",
                      lineHeight: 1.6,
                    }}
                  >
                    {apiError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-arrow flex items-center gap-3 px-8 py-4 font-medium transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    fontFamily: "var(--font-sans)",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    border: "none",
                  }}
                >
                  {loading ? t(language, "contact.submitting") : t(language, "contact.submit")}
                  {!loading && (
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
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
