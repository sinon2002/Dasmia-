"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

interface LightboxImage {
  url: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  onClose,
}: ImageLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [closing, setClosing] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 280);
  }, [onClose]);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (animating) return;
      setDirection(dir === "next" ? "left" : "right");
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) =>
          dir === "next"
            ? (c + 1) % images.length
            : (c - 1 + images.length) % images.length,
        );
        setDirection(null);
        setAnimating(false);
      }, 220);
    },
    [animating, images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose, navigate]);

  // Prevent body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      navigate(dx < 0 ? "next" : "prev");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const img = images[current];

  // Slide animation class
  const slideClass = animating
    ? direction === "left"
      ? "lightbox-slide-out-left"
      : "lightbox-slide-out-right"
    : closing
      ? ""
      : "lightbox-slide-in";

  return (
    <div
      className={`lightbox-overlay ${closing ? "lightbox-closing" : "lightbox-opening"}`}
      onClick={handleClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <button
        className="lightbox-close"
        onClick={handleClose}
        aria-label="Close"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="2"
            y1="2"
            x2="18"
            y2="18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="2"
            x2="2"
            y2="18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow--prev"
          onClick={(e) => {
            e.stopPropagation();
            navigate("prev");
          }}
          aria-label="Previous image"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="14,4 7,11 14,18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className={`lightbox-image-wrap ${slideClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt={img.alt}
          className="lightbox-image"
          draggable={false}
        />
        {/* Caption */}
        {img.alt && img.alt !== "[CLIENT DATA]" && (
          <p className="lightbox-caption">{img.alt}</p>
        )}
      </div>

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow--next"
          onClick={(e) => {
            e.stopPropagation();
            navigate("next");
          }}
          aria-label="Next image"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="8,4 15,11 8,18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
          <span style={{ color: "var(--gold)" }}>{current + 1}</span>
          <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 6px" }}>
            /
          </span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            {images.length}
          </span>
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && images.length <= 12 && (
        <div className="lightbox-dots" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`lightbox-dot ${i === current ? "lightbox-dot--active" : ""}`}
              onClick={() => {
                if (!animating) setCurrent(i);
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
