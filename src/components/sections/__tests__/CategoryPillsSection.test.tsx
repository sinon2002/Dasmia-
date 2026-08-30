import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CategoryPillsSection from "../CategoryPillsSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("CategoryPillsSection component", () => {
  it("renders direction category pills with links", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <CategoryPillsSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText("РЕСТОРАН")).toBeInTheDocument();
    expect(screen.getByText("WELLNESS")).toBeInTheDocument();
    expect(screen.getByText("ЭТНО-СЕЛО")).toBeInTheDocument();
  });
});
