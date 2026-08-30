import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactMapSection from "../ContactMapSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("ContactMapSection component", () => {
  it("renders location, contact info, and map iframe", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <ContactMapSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByTitle("DASMIA на карте")).toBeInTheDocument();
    expect(screen.getByText(/Бишкек, ул\. Анкара 2Б/i)).toBeInTheDocument();
  });
});
