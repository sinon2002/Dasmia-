import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "../HeroSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("HeroSection component", () => {
  it("renders brand headline and direction actions", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <HeroSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DASMIA");
    expect(screen.getByText("СМОТРЕТЬ ВСЕ")).toBeInTheDocument();
  });
});
