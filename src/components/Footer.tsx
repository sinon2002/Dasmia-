"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

/* ── DASMIA Wordmark (Footer) — bold italic sans-serif ── */
function DasmiaLogo() {
  return (
    <div className="flex flex-col leading-none select-none">
      <span
        style={{
          fontFamily:
            "var(--font-sans), 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "24px",
          letterSpacing: "-0.01em",
          transform: "skewX(-6deg)",
          display: "inline-block",
          background:
            "linear-gradient(115deg, #B9965A 0%, #E8D5A3 45%, #B9965A 100%)",
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
          fontSize: "7px",
          letterSpacing: "0.3em",
          color: "var(--gold)",
          opacity: 0.7,
          marginTop: "2px",
          marginLeft: "2px",
        }}
      >
        PREMIUM COMPLEX
      </span>
    </div>
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
