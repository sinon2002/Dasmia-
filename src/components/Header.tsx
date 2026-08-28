"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, t, Language } from "@/lib/i18n";

/* ── DASMIA Refined SVG Wordmark ── */
function DasmiaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DASMIA"
      role="img"
    >
      <defs>
        <linearGradient id="goldGradH" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A96E" />
          <stop offset="45%" stopColor="#E8D5A3" />
          <stop offset="100%" stopColor="#B8924A" />
        </linearGradient>
        <linearGradient id="goldGradH2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8924A" />
          <stop offset="50%" stopColor="#E8D5A3" />
          <stop offset="100%" stopColor="#B8924A" />
        </linearGradient>
      </defs>

      {/* Decorative diamond ornament left */}
      <path
        d="M6 28 L10 24 L14 28 L10 32 Z"
        fill="url(#goldGradH)"
        opacity="0.7"
      />
      <line
        x1="14"
        y1="28"
        x2="22"
        y2="28"
        stroke="url(#goldGradH2)"
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* D */}
      <path
        d="M26 12 L26 44 L38 44 Q54 44 54 28 Q54 12 38 12 Z M32 18 L37 18 Q46 18 46 28 Q46 38 37 38 L32 38 Z"
        fill="url(#goldGradH)"
      />
      {/* A */}
      <path
        d="M66 44 L74 12 L82 12 L90 44 L84 44 L82.5 37 L73.5 37 L72 44 Z M75 31 L81 31 L78 19 Z"
        fill="url(#goldGradH)"
      />
      {/* S */}
      <path
        d="M100 36 Q100 44 112 44 Q124 44 124 36 Q124 28 112 26 Q104 24 104 20 Q104 14 112 14 Q120 14 120 20"
        stroke="url(#goldGradH)"
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* M */}
      <path
        d="M134 44 L134 12 L142 12 L150 30 L158 12 L166 12 L166 44 L160 44 L160 22 L150 40 L140 22 L140 44 Z"
        fill="url(#goldGradH)"
      />
      {/* I */}
      <rect x="176" y="12" width="6" height="32" fill="url(#goldGradH)" />
      <rect x="172" y="12" width="14" height="5" fill="url(#goldGradH)" />
      <rect x="172" y="39" width="14" height="5" fill="url(#goldGradH)" />
      {/* A (final) */}
      <path
        d="M198 44 L206 12 L214 12 L222 44 L216 44 L214.5 37 L205.5 37 L204 44 Z M207 31 L213 31 L210 19 Z"
        fill="url(#goldGradH)"
      />

      {/* Decorative diamond ornament right */}
      <line
        x1="222"
        y1="28"
        x2="230"
        y2="28"
        stroke="url(#goldGradH2)"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M230 28 L234 24 L238 28 L234 32 Z"
        fill="url(#goldGradH)"
        opacity="0.7"
      />

      {/* Ultra-thin baseline rule */}
      <line
        x1="26"
        y1="47.5"
        x2="222"
        y2="47.5"
        stroke="url(#goldGradH2)"
        strokeWidth="0.5"
        opacity="0.35"
      />
    </svg>
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
  { label: "Мероприятия", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
              <DasmiaLogo className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80" />
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
                      className="nav-link flex items-center gap-1.5 text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
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
                    className="nav-link text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
                    style={{ fontSize: "10px", letterSpacing: "0.18em" }}
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
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-12">
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

          {/* Nav Links */}
          <nav className="flex-1 flex flex-col justify-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={getHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-display font-serif italic text-foreground hover:text-gold transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(32px, 6vw, 52px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div
            className="border-t pt-8 flex flex-col gap-4"
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
