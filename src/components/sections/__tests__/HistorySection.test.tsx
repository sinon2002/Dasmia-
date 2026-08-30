import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HistorySection from "../HistorySection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("HistorySection component", () => {
  it("renders history timeline and milestones", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <HistorySection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText("ИСТОРИЯ")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/История/i);
    expect(screen.getByText("1998")).toBeInTheDocument();
    expect(screen.getByText("2005")).toBeInTheDocument();
    expect(screen.getByText("2015")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
  });
});
