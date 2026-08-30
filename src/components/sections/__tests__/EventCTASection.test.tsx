import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EventCTASection from "../EventCTASection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

describe("EventCTASection component", () => {
  it("renders event planning CTA and contact actions", () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <EventCTASection />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText("МЕРОПРИЯТИЯ")).toBeInTheDocument();
    expect(screen.getByText("Ваше событие.")).toBeInTheDocument();
    expect(screen.getByText("ЗАБРОНИРОВАТЬ")).toBeInTheDocument();
  });
});
