"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollFillTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-linked word fill: as the block scrolls up through the
 * viewport, each word transitions from dim (transparent) to bright
 * (white). Scrolling back down reverses it — fully driven by scroll
 * position, not direction, so it's naturally reversible.
 */
export default function ScrollFillText({ text, className, style }: ScrollFillTextProps) {
  const wrapperRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.95;
      const end = vh * 0.4;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <p ref={wrapperRef} className={className} style={style}>
      {words.map((word, i) => {
        const span = 1 / words.length;
        const wordStart = i * span * 0.75;
        const wordEnd = wordStart + span * 1.5;
        const local = (progress - wordStart) / (wordEnd - wordStart);
        const opacity = Math.min(1, Math.max(0.16, local));

        return (
          <React.Fragment key={i}>
            <span style={{ opacity, transition: "opacity 0.05s linear" }}>{word}</span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
}
