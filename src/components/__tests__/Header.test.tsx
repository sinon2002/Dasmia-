import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function renderHeader() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </ThemeProvider>
  );
}

describe("Header component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders brand logo and main navigation links", () => {
    renderHeader();

    expect(screen.getByText("D'asmia")).toBeInTheDocument();
    expect(screen.getByText("PREMIUM COMPLEX")).toBeInTheDocument();
    expect(screen.getAllByText("О КОМПЛЕКСЕ").length).toBeGreaterThan(0);
    expect(screen.getAllByText("НАПРАВЛЕНИЯ").length).toBeGreaterThan(0);
    expect(screen.getAllByText("КОРПОРАТИВНЫМ").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ИСТОРИЯ").length).toBeGreaterThan(0);
    expect(screen.getAllByText("КОНТАКТЫ").length).toBeGreaterThan(0);
  });

  it("renders language switcher and allows switching language", () => {
    renderHeader();

    const enButton = screen.getAllByText("EN")[0];
    fireEvent.click(enButton);

    expect(screen.getAllByText(/ABOUT/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CONTACT/i).length).toBeGreaterThan(0);
  });

  it("toggles mobile menu drawer on hamburger button click", () => {
    renderHeader();

    const menuOpenButton = screen.getByLabelText("Открыть меню");
    expect(menuOpenButton).toBeInTheDocument();

    fireEvent.click(menuOpenButton);

    const menuCloseButtons = screen.getAllByLabelText("Закрыть меню");
    expect(menuCloseButtons.length).toBeGreaterThan(0);

    fireEvent.click(menuCloseButtons[0]);
    expect(screen.getByLabelText("Открыть меню")).toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    renderHeader();

    const themeToggle = screen.getByRole("button", { name: /Переключить на/i });
    expect(themeToggle).toBeInTheDocument();

    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
  });
});
