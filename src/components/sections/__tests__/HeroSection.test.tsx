import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "../HeroSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("HeroSection component", () => {
  it("renders hero banner section and cinematic video element", () => {
    const { container } = render(
      <ThemeProvider>
        <LanguageProvider>
          <HeroSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    const section = screen.getByLabelText("Главный баннер DASMIA");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-animation", "hero");

    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("poster", "/assets/images/IMG_2161.webp");
  });
});

