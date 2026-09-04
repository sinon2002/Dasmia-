"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppImage from "@/components/ui/AppImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { submitLead } from "@/lib/api";

/* ── DASMIA Wordmark (Footer) — actual logo file ── */
function DasmiaLogo() {
  return (
    <div className="relative select-none" style={{ width: "150px", height: "24px" }}>
      <AppImage
        src="/assets/images/logos/dasmia-wordmark.webp"
        alt="DASMIA"
        fill
        className="object-contain object-left"
        sizes="150px"
      />
    </div>
  );
}

const contactMethods = ["Telegram", "WhatsApp", "Позвоните мне"];

export default function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isMainPage = pathname === "/";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return isMainPage ? href : `/${href}`;
    }
    return href;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      if (isMainPage) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else {
        e.preventDefault();
        router.push(`/${href}`);
      }
    }
  };

  const navCategories = [
    { label: t(language, "nav.about"), href: "#about" },
    { label: t(language, "nav.directions"), href: "#directions" },
    { label: t(language, "nav.corporate"), href: "/corporate" },
    { label: t(language, "nav.history"), href: "#history" },
    { label: t(language, "nav.contact"), href: "#contact" },
  ];

  const directionsColA = [
    { label: t(language, "directions.banquet.title"), href: "/banquet" },
    { label: t(language, "directions.restaurant.title"), href: "/restaurant" },
    { label: t(language, "directions.chaikhana.title"), href: "/chaikhana" },
    { label: t(language, "directions.fitness.title"), href: "/fitness" },
  ];
  const directionsColB = [
    { label: t(language, "directions.pools.title"), href: "/pools" },
    { label: t(language, "directions.spa.title"), href: "/spa" },
    { label: t(language, "directions.ethno.title"), href: "/ethno-village" },
    { label: t(language, "directions.events.title"), href: "#directions" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !contactMethod || !agreed) {
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus("idle");
    const result = await submitLead({
      form_type: "footer",
      name: name.trim(),
      phone: phone.trim(),
      payload: { contact_method: contactMethod },
      captcha_token: "frontend-token",
      website: "",
    });
    setLoading(false);
    if (result.success) {
      setStatus("success");
      setName("");
      setPhone("");
      setContactMethod("");
      setAgreed(false);
    } else {
      setStatus("error");
    }
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.14em",
    color: "#8a8a8a",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.18)",
    padding: "10px 0",
    fontSize: "15px",
    color: "#1a1a1a",
    outline: "none",
  };

  return (
    <footer
      className="relative"
      style={{ backgroundColor: "#F2EEE4", color: "#1a1a1a" }}
      data-content="footer"
    >
      {/* Kyrgyz ornament pattern — tiled full width, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/images/ornament-tile.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "170px 170px",
          opacity: 0.07,
        }}
        aria-hidden="true"
      />
      <style jsx>{`
        .footer-nav-link {
          position: relative;
        }
        .footer-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          height: 1px;
          background-color: #1a1a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-10 md:py-12 relative z-10">
        {/* Top row — logo+nav / request form, line-group.kz layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo + nav categories */}
          <div className="lg:col-span-4 flex flex-col gap-7">
            <DasmiaLogo />
            <nav className="flex flex-col gap-5">
              {navCategories.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="footer-nav-link uppercase w-fit transition-opacity duration-300 hover:opacity-70"
                  style={{
                    fontSize: "15px",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                    color: "#1a1a1a",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mini request form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="mb-8"
              style={{ fontSize: "17px", lineHeight: 1.6, color: "#3a3a3a" }}
            >
              {t(language, "footer.form.intro")}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <input
                  type="text"
                  placeholder={t(language, "footer.form.name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="+996 (000) 000-000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>
                  {t(language, "footer.form.contactMethod")}
                </label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">—</option>
                  {contactMethods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#F2EEE4",
                  padding: "16px 28px",
                  fontSize: "14px",
                  letterSpacing: "0.04em",
                }}
              >
                {loading
                  ? t(language, "footer.form.sending")
                  : t(language, "footer.form.submit")}
              </button>

              <label
                className="flex items-start gap-2 cursor-pointer"
                style={{ fontSize: "12px", color: "#6b6b6b" }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  {t(language, "footer.form.consent")}{" "}
                  <a
                    href="#"
                    className="underline hover:opacity-70"
                    style={{ color: "#1a1a1a" }}
                  >
                    {t(language, "footer.privacy")}
                  </a>
                </span>
              </label>

              {status === "success" && (
                <p style={{ fontSize: "13px", color: "#3a7d44" }}>
                  {t(language, "footer.form.success")}
                </p>
              )}
              {status === "error" && (
                <p style={{ fontSize: "13px", color: "#b3452f" }}>
                  {t(language, "footer.form.error")}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Directions — two-column mini list, line-group.kz style */}
        <div
          className="mt-8 pt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 border-t"
          style={{ borderColor: "rgba(0,0,0,0.1)" }}
        >
          {directionsColA.map((dir) => (
            <Link
              key={dir.label}
              href={getHref(dir.href)}
              onClick={(e) =>
                dir.href.startsWith("#") ? handleAnchorClick(e, dir.href) : undefined
              }
              className="uppercase transition-opacity duration-300 hover:opacity-60"
              style={{ fontSize: "12px", letterSpacing: "0.06em", color: "#3a3a3a" }}
            >
              {dir.label}
            </Link>
          ))}
          {directionsColB.map((dir) => (
            <Link
              key={dir.label}
              href={getHref(dir.href)}
              onClick={(e) =>
                dir.href.startsWith("#") ? handleAnchorClick(e, dir.href) : undefined
              }
              className="uppercase transition-opacity duration-300 hover:opacity-60"
              style={{ fontSize: "12px", letterSpacing: "0.06em", color: "#3a3a3a" }}
            >
              {dir.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-6 pt-4 flex items-start md:items-center border-t"
          style={{ borderColor: "rgba(0,0,0,0.1)" }}
        >
          <a
            href="#"
            className="hover:opacity-60 transition-opacity duration-300"
            style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#6b6b6b" }}
          >
            {t(language, "footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
