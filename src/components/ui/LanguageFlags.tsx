import React from "react";
import type { Language } from "@/lib/i18n";

/**
 * Real vector flag icons — used instead of Unicode flag emoji.
 * Emoji flags (🇷🇺🇰🇬🇬🇧) rely on the operating system's font to render
 * a flag glyph; on Windows there is no such glyph, so the two-letter
 * region code is shown as plain text instead of a flag. These SVGs
 * render identically on every OS/browser.
 */

function RuFlag() {
  return (
    <svg
      viewBox="0 0 3 2"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <rect width="3" height="2" fill="#FFFFFF" />
      <rect width="3" height="1.3333" y="0.6667" fill="#0039A6" />
      <rect width="3" height="0.6667" y="1.3333" fill="#D52B1E" />
    </svg>
  );
}

function KgFlag() {
  const rays = Array.from({ length: 40 }, (_, i) => {
    const angle = (i * 9 * Math.PI) / 180;
    const x1 = 1.5 + Math.cos(angle) * 0.4;
    const y1 = 1 + Math.sin(angle) * 0.4;
    const x2 = 1.5 + Math.cos(angle) * 0.56;
    const y2 = 1 + Math.sin(angle) * 0.56;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#E8112D"
        strokeWidth="0.018"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 3 2"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <rect width="3" height="2" fill="#E8112D" />
      <circle cx="1.5" cy="1" r="0.42" fill="#FFEF00" />
      {rays}
      <circle
        cx="1.5"
        cy="1"
        r="0.15"
        fill="none"
        stroke="#E8112D"
        strokeWidth="0.03"
      />
      <line x1="1.35" y1="1" x2="1.65" y2="1" stroke="#E8112D" strokeWidth="0.02" />
      <line x1="1.5" y1="0.85" x2="1.5" y2="1.15" stroke="#E8112D" strokeWidth="0.02" />
    </svg>
  );
}

function GbFlag() {
  return (
    <svg
      viewBox="0 0 60 36"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <rect width="60" height="36" fill="#00247D" />
      <g clipPath="url(#kg-gb-clip)">
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#FFFFFF" strokeWidth="7.2" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#CF142B" strokeWidth="2.4" />
      </g>
      <path d="M30,0 V36 M0,18 H60" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M30,0 V36 M0,18 H60" stroke="#CF142B" strokeWidth="7.2" />
      <defs>
        <clipPath id="kg-gb-clip">
          <rect width="60" height="36" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function LanguageFlag({
  lang,
  className = "",
}: {
  lang: Language;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "block", width: "100%", height: "100%" }}>
      {lang === "ru" && <RuFlag />}
      {lang === "ky" && <KgFlag />}
      {lang === "en" && <GbFlag />}
    </span>
  );
}

export default LanguageFlag;
