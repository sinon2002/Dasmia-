"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppImage from "@/components/ui/AppImage";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, t, Language } from "@/lib/i18n";

/* ── DASMIA Wordmark — bold italic sans-serif, styled after the brand mark ── */
function DasmiaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-none select-none ${className}`}>
      <span
        style={{
          fontFamily:
            "var(--font-sans), 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "26px",
          letterSpacing: "-0.01em",
          transform: "skewX(-6deg)",
          display: "inline-block",
          background:
            "linear-gradient(115deg, #B8924A 0%, #E8D5A3 45%, #C9A96E 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        D&apos;asmia
      </span>
      <span
        className="text-label"
        style={{
          fontSize: "8px",
          letterSpacing: "0.32em",
          color: "var(--gold)",
          opacity: 0.75,
          marginTop: "2px",
          marginLeft: "2px",
        }}
      >
        PREMIUM COMPLEX
      </span>
    </div>
  );
}

/* ── Theme Toggle Icon ── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 hover:border-gold"
      style={{
        borderColor: "rgba(185,150,90,0.35)",
        color: "var(--gold)",
      }}
      aria-label={
        isDark ? t(language, "nav.theme.light") : t(language, "nav.theme.dark")
      }
      title={isDark ? "Light Heritage" : "Dark Signature"}
    >
      {isDark ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="12"
            x2="5"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="19"
            y1="12"
            x2="22"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="4.22"
            y1="4.22"
            x2="6.34"
            y2="6.34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="17.66"
            y1="17.66"
            x2="19.78"
            y2="19.78"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="19.78"
            y1="4.22"
            x2="17.66"
            y2="6.34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="6.34"
            y1="17.66"
            x2="4.22"
            y2="19.78"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

const DIRECTIONS_SUBMENU = [
  { label: "Банкетные залы", href: "/banquet" },
  { label: "Ресторан", href: "/restaurant" },
  { label: "Чайхана", href: "/chaikhana" },
  { label: "Фитнес-клуб", href: "/fitness" },
  { label: "Бассейны", href: "/pools" },
  { label: "SPA", href: "/spa" },
  { label: "Этно-Село", href: "/ethno-village" },
  { label: "Мероприятия", href: "/events" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDirectionsOpen, setMobileDirectionsOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isLight = theme === "light";
  const isMainPage = pathname === "/";

  const getHref = (hash: string) => {
    return isMainPage ? hash : `/${hash}`;
  };

  const openDirections = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDirectionsOpen(true);
  };

  const scheduleCloseDirections = () => {
    closeTimer.current = setTimeout(() => setDirectionsOpen(false), 180);
  };

  const navLinks = [
    { label: t(language, "nav.about"), href: "#about" },
    { label: t(language, "nav.directions"), href: "#directions", hasSubmenu: true },
    { label: t(language, "nav.corporate"), href: "#corporate" },
    { label: t(language, "nav.history"), href: "#history" },
    { label: t(language, "nav.contact"), href: "#contact" },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Smooth scroll when landing on a hash from another page
  useEffect(() => {
    if (isMainPage && typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isMainPage, pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) setMobileDirectionsOpen(false);
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    setMenuOpen(false);
    if (isMainPage) {
      if (hash.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
        }
      }
    } else {
      e.preventDefault();
      router.push(hash.startsWith("#") ? `/${hash}` : hash);
    }
  };

  const scrolledBg = isLight ? "rgba(245,242,235,0.95)" : "rgba(11,11,11,0.92)";

  return (
    <>
      {/* Desktop / Scrolled Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "border-b backdrop-blur-xl"
            : "bg-transparent border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? scrolledBg : "transparent",
          borderColor: scrolled ? "rgba(185,150,90,0.15)" : "transparent",
        }}
        data-content="header"
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo — Refined SVG Wordmark */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="DASMIA — Главная"
            >
              <div
                className="relative select-none transition-opacity duration-300 group-hover:opacity-80"
                style={{ width: "150px", height: "45px" }}
              >
                <AppImage
                  src="/assets/images/dasmia-logo-fitness.webp"
                  alt="DASMIA"
                  fill
                  className="object-contain object-left"
                  sizes="150px"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Основная навигация"
            >
              {navLinks.map((link) =>
                link.hasSubmenu ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openDirections}
                    onMouseLeave={scheduleCloseDirections}
                  >
                    <a
                      href={getHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="nav-link flex items-center gap-1.5 text-label text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors duration-300 border rounded-sm"
                      style={{
                        fontSize: "13px",
                        letterSpacing: "0.14em",
                        padding: "8px 14px",
                        borderColor: "rgba(185,150,90,0.25)",
                      }}
                      aria-haspopup="true"
                      aria-expanded={directionsOpen}
                    >
                      {link.label}
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        className="transition-transform duration-300"
                        style={{
                          transform: directionsOpen
                            ? "rotate(180deg)"
                            : "none",
                        }}
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 3L4 5.5L6.5 3"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    {/* Dropdown submenu — line-group style */}
                    <div
                      className="absolute left-1/2 top-full pt-4 transition-all duration-300"
                      style={{
                        transform: `translateX(-50%) translateY(${directionsOpen ? "0" : "-8px"})`,
                        opacity: directionsOpen ? 1 : 0,
                        visibility: directionsOpen ? "visible" : "hidden",
                        pointerEvents: directionsOpen ? "auto" : "none",
                      }}
                    >
                      <div
                        className="flex flex-col min-w-[220px] py-3 backdrop-blur-xl border"
                        style={{
                          backgroundColor: scrolledBg,
                          borderColor: "rgba(185,150,90,0.15)",
                        }}
                      >
                        {DIRECTIONS_SUBMENU.map((item) => (
                          <a
                            key={item.label}
                            href={getHref(item.href)}
                            onClick={(e) => {
                              setDirectionsOpen(false);
                              handleAnchorClick(e, item.href);
                            }}
                            className="text-label text-muted-foreground hover:text-gold transition-colors duration-200 px-5 py-2.5"
                            style={{ fontSize: "10.5px", letterSpacing: "0.12em" }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="nav-link text-label text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors duration-300 border rounded-sm"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.14em",
                      padding: "8px 14px",
                      borderColor: "rgba(185,150,90,0.25)",
                    }}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switcher — i18n with localStorage persistence */}
              <div className="hidden md:flex items-center gap-1">
                {SUPPORTED_LANGUAGES.map((lang, i) => (
                  <React.Fragment key={lang}>
                    <button
                      onClick={() => setLanguage(lang)}
                      className={`text-label transition-colors duration-200 px-1 py-0.5 ${
                        language === lang
                          ? "text-gold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      style={{ fontSize: "10px", letterSpacing: "0.14em" }}
                      aria-label={`Language: ${LANGUAGE_LABELS[lang]}`}
                      aria-pressed={language === lang}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                    {i < SUPPORTED_LANGUAGES.length - 1 && (
                      <span
                        className="text-muted-foreground opacity-30"
                        style={{ fontSize: "10px" }}
                      >
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA */}
              <a
                href={getHref("#contact")}
                onClick={(e) => handleAnchorClick(e, "#contact")}
                className="hidden md:flex btn-arrow items-center gap-2 border text-label text-foreground px-5 py-2.5 hover:border-gold hover:text-gold transition-all duration-300"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  borderColor: "rgba(185,150,90,0.25)",
                }}
              >
                {t(language, "nav.cta")}
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
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? t(language, "nav.menu.close") : t(language, "nav.menu.open")}
                aria-expanded={menuOpen}
              >
                <span
                  className="block h-px w-6 bg-foreground transition-all duration-300"
                  style={{
                    transform: menuOpen
                      ? "rotate(45deg) translate(4px, 4px)"
                      : "none",
                  }}
                />
                <span
                  className="block h-px w-4 bg-foreground transition-all duration-300"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "none",
                  }}
                />
                <span
                  className="block h-px w-6 bg-foreground transition-all duration-300"
                  style={{
                    transform: menuOpen
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="mobile-menu-panel flex flex-col h-full px-6 pt-20 pb-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label={t(language, "nav.menu.close")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 3L17 17M17 3L3 17"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Nav Links — top-aligned, uppercase, with inline accordion submenu */}
          <nav className="flex flex-col gap-1 mt-4 overflow-y-auto">
            {navLinks.map((link, i) =>
              link.hasSubmenu ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    onClick={() => setMobileDirectionsOpen((v) => !v)}
                    className="flex items-center justify-between gap-2 py-3 text-foreground hover:text-gold transition-colors duration-300 w-full text-left"
                    style={{
                      fontSize: "clamp(15px, 4vw, 17px)",
                      letterSpacing: "0.04em",
                      fontWeight: 500,
                      transitionDelay: `${i * 40}ms`,
                    }}
                    aria-expanded={mobileDirectionsOpen}
                  >
                    {link.label.toUpperCase()}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="transition-transform duration-300 shrink-0"
                      style={{ transform: mobileDirectionsOpen ? "rotate(180deg)" : "none" }}
                      aria-hidden="true"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      maxHeight: mobileDirectionsOpen ? `${DIRECTIONS_SUBMENU.length * 44 + 44}px` : "0px",
                    }}
                  >
                    <div className="flex flex-col pl-4 pb-2">
                      <a
                        href={getHref("#directions")}
                        onClick={(e) => {
                          setMenuOpen(false);
                          handleAnchorClick(e, "#directions");
                        }}
                        className="py-2 text-muted-foreground hover:text-gold transition-colors duration-200"
                        style={{ fontSize: "13px", letterSpacing: "0.06em" }}
                      >
                        {t(language, "nav.directions.all")}
                      </a>
                      {DIRECTIONS_SUBMENU.map((item) => (
                        <a
                          key={item.label}
                          href={getHref(item.href)}
                          onClick={(e) => {
                            setMenuOpen(false);
                            handleAnchorClick(e, item.href);
                          }}
                          className="py-2 text-muted-foreground hover:text-gold transition-colors duration-200"
                          style={{ fontSize: "13px", letterSpacing: "0.06em" }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="py-3 text-foreground hover:text-gold transition-colors duration-300"
                  style={{
                    fontSize: "clamp(15px, 4vw, 17px)",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {link.label.toUpperCase()}
                </a>
              ),
            )}
          </nav>

          <div className="flex-1" />

          {/* Contact icons */}
          <div className="flex items-center gap-3 mb-6">
            <a
              href="tel:[CLIENT PHONE]"
              aria-label="Позвонить"
              className="flex items-center justify-center rounded-full border transition-colors duration-300 hover:border-gold hover:text-gold"
              style={{ width: "40px", height: "40px", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 2h2.5l1 3-1.5 1.2a8 8 0 0 0 4.8 4.8L11 9.5l3 1V13c0 .8-.7 1.4-1.5 1.3C6 13.6 2.4 10 1.7 4.5 1.6 3.7 2.2 3 3 3V2Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="mailto:[CLIENT EMAIL]"
              aria-label="Написать на почту"
              className="flex items-center justify-center rounded-full border transition-colors duration-300 hover:border-gold hover:text-gold"
              style={{ width: "40px", height: "40px", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
                <path d="M2.5 4L8 8.5L13.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mobile CTA */}
          <div
            className="border-t pt-6 flex flex-col gap-4"
            style={{ borderColor: "rgba(185,150,90,0.15)" }}
          >
            <a
              href={getHref("#contact")}
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="btn-arrow flex items-center justify-between border-b pb-4 hover:border-gold transition-colors duration-300"
              style={{ borderColor: "rgba(185,150,90,0.15)" }}
            >
              <span
                className="text-label text-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.2em" }}
              >
                {t(language, "nav.cta")}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="var(--gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="flex items-center gap-3">
              {SUPPORTED_LANGUAGES.map((lang, i) => (
                <React.Fragment key={lang}>
                  <button
                    onClick={() => setLanguage(lang)}
                    className={`text-label transition-colors duration-200 ${language === lang ? "text-gold" : "text-muted-foreground"}`}
                    style={{ fontSize: "11px", letterSpacing: "0.14em" }}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                  {i < SUPPORTED_LANGUAGES.length - 1 && (
                    <span className="text-muted-foreground opacity-30 text-xs">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
