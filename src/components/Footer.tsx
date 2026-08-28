"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

/* ── DASMIA SVG Wordmark (Footer) ── */
function DasmiaLogo() {
  return (
    <svg
      viewBox="0 0 260 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DASMIA"
      role="img"
      style={{ height: "36px", width: "auto" }}
    >
      <defs>
        <linearGradient id="goldGradFt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B9965A" />
          <stop offset="60%" stopColor="#C8A96B" />
          <stop offset="100%" stopColor="#B9965A" />
        </linearGradient>
      </defs>
      <path
        d="M4 6 L4 42 L16 42 Q32 42 32 24 Q32 6 16 6 Z M10 12 L15 12 Q24 12 24 24 Q24 36 15 36 L10 36 Z"
        fill="url(#goldGradFt)"
      />
      <path
        d="M44 42 L52 6 L60 6 L68 42 L62 42 L60 34 L52 34 L50 42 Z M53.5 28 L58.5 28 L56 16 Z"
        fill="url(#goldGradFt)"
      />
      <path
        d="M78 34 Q78 42 90 42 Q102 42 102 34 Q102 26 90 24 Q82 22 82 18 Q82 12 90 12 Q98 12 98 18"
        stroke="url(#goldGradFt)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="square"
      />
      <path
        d="M112 42 L112 6 L120 6 L128 26 L136 6 L144 6 L144 42 L138 42 L138 18 L128 38 L118 18 L118 42 Z"
        fill="url(#goldGradFt)"
      />
      <rect x="154" y="6" width="6" height="36" fill="url(#goldGradFt)" />
      <rect x="150" y="6" width="14" height="6" fill="url(#goldGradFt)" />
      <rect x="150" y="36" width="14" height="6" fill="url(#goldGradFt)" />
      <path
        d="M176 42 L184 6 L192 6 L200 42 L194 42 L192 34 L184 34 L182 42 Z M185.5 28 L190.5 28 L188 16 Z"
        fill="url(#goldGradFt)"
      />
      <line
        x1="4"
        y1="45"
        x2="200"
        y2="45"
        stroke="url(#goldGradFt)"
        strokeWidth="0.75"
        opacity="0.4"
      />
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isMainPage = pathname === "/";

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

  const footerDirections = [
    { label: t(language, "directions.banquet.title"), href: "/banquet" },
    { label: t(language, "directions.restaurant.title"), href: "/restaurant" },
    { label: t(language, "directions.chaikhana.title"), href: "/chaikhana" },
    { label: t(language, "directions.fitness.title"), href: "/fitness" },
    { label: t(language, "directions.pools.title"), href: "/pools" },
    { label: t(language, "directions.spa.title"), href: "/spa" },
    { label: t(language, "directions.ethno.title"), href: "/ethno-village" },
    { label: t(language, "directions.events.title"), href: "#directions" },
  ];

  const footerLinks = [
    { label: t(language, "nav.about"), href: "#about" },
    { label: t(language, "nav.corporate"), href: "#corporate" },
    { label: t(language, "nav.history"), href: "#history" },
    { label: t(language, "nav.contact"), href: "#contact" },
  ];

  return (
    <footer
      className="relative border-t"
      style={{
        backgroundColor: "var(--black)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      data-content="footer"
    >
      {/* Decorative top line */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
      />
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <DasmiaLogo />
            </div>
            <p
              className="text-muted-foreground leading-relaxed mb-8"
              style={{ fontSize: "13px", maxWidth: "260px" }}
            >
              {t(language, "footer.desc")}
            </p>
            <address className="not-italic" style={{ fontSize: "12px" }}>
              <p
                className="text-muted-foreground mb-1"
                style={{ letterSpacing: "0.04em" }}
              >
                {t(language, "contact.address.value")}
              </p>
              <a
                href="tel:[CLIENT PHONE]"
                className="text-muted-foreground hover:text-gold transition-colors duration-300 block mb-1"
                style={{ letterSpacing: "0.04em" }}
              >
                [CLIENT PHONE]
              </a>
              <a
                href="mailto:[CLIENT EMAIL]"
                className="text-muted-foreground hover:text-gold transition-colors duration-300 block"
                style={{ letterSpacing: "0.04em" }}
              >
                [CLIENT EMAIL]
              </a>
            </address>
          </div>

          {/* Directions */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="text-label text-gold mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.2em" }}
            >
              {t(language, "footer.directions")}
            </p>
            <ul className="flex flex-col gap-3">
              {footerDirections.map((dir) => (
                <li key={dir.label}>
                  <Link
                    href={getHref(dir.href)}
                    onClick={(e) => dir.href.startsWith("#") ? handleAnchorClick(e, dir.href) : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    style={{ fontSize: "13px" }}
                  >
                    {dir.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-10">
            <p
              className="text-label text-gold mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.2em" }}
            >
              {t(language, "footer.nav")}
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    style={{ fontSize: "13px" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-8">
              <p
                className="text-label text-gold mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                {t(language, "footer.social")}
              </p>
              <div className="flex gap-4">
                {["Instagram", "WhatsApp", "Telegram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                    style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                  >
                    {social.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-muted-foreground"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            {t(language, "footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              style={{ fontSize: "11px", letterSpacing: "0.08em" }}
            >
              {t(language, "footer.privacy")}
            </a>
            <span
              className="text-muted-foreground opacity-30"
              style={{ fontSize: "11px" }}
            >
              ·
            </span>
            <span
              className="text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.08em" }}
            >
              {t(language, "footer.location")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
