import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "../Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function renderFooter() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

describe("Footer component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders footer brand and main navigation links", () => {
    renderFooter();

    expect(screen.getByAltText("DASMIA")).toBeInTheDocument();
    expect(screen.getByText("О КОМПЛЕКСЕ")).toBeInTheDocument();
    expect(screen.getByText("НАПРАВЛЕНИЯ")).toBeInTheDocument();
    expect(screen.getByText("КОРПОРАТИВНЫМ")).toBeInTheDocument();
    expect(screen.getByText("ИСТОРИЯ")).toBeInTheDocument();
    expect(screen.getByText("КОНТАКТЫ")).toBeInTheDocument();
  });

  it("renders direction category links in footer", () => {
    renderFooter();

    expect(screen.getByText("Банкетные залы")).toBeInTheDocument();
    expect(screen.getByText("Ресторан")).toBeInTheDocument();
    expect(screen.getByText("Чайхана")).toBeInTheDocument();
    expect(screen.getByText("Фитнес-клуб")).toBeInTheDocument();
    expect(screen.getByText("Бассейны")).toBeInTheDocument();
    expect(screen.getByText("SPA")).toBeInTheDocument();
    expect(screen.getByText("Этно-Село")).toBeInTheDocument();
  });

  it("renders privacy policy link", () => {
    renderFooter();

    expect(screen.getByText("Политика конфиденциальности")).toBeInTheDocument();
  });
});

