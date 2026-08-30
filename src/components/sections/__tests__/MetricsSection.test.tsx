import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MetricsSection from "../MetricsSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("MetricsSection component", () => {
  it("renders complex scale metrics and statistics", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <MetricsSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "DASMIA" })).toBeInTheDocument();
    expect(screen.getByText("НАПРАВЛЕНИЙ")).toBeInTheDocument();
    expect(screen.getByText("ЛЕТ ИСТОРИИ")).toBeInTheDocument();
    expect(screen.getByText("БАНКЕТНЫХ ЗАЛА")).toBeInTheDocument();
  });
});
