import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "../page";
import BanquetPage from "../banquet/page";
import RestaurantPage from "../restaurant/page";
import ChaikhanaPage from "../chaikhana/page";
import FitnessPage from "../fitness/page";
import PoolsPage from "../pools/page";
import SpaPage from "../spa/page";
import EthnoVillagePage from "../ethno-village/page";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function renderPage(ui: React.ReactNode) {
  return render(
    <ThemeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>
  );
}

describe("App Router Pages", () => {
  it("renders HomePage without errors", () => {
    renderPage(<HomePage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText("DASMIA").length).toBeGreaterThan(0);
  });

  it("renders BanquetPage direction page", () => {
    renderPage(<BanquetPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/БАНКЕТНЫЕ/i).length).toBeGreaterThan(0);
  });

  it("renders RestaurantPage direction page", () => {
    renderPage(<RestaurantPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/РЕСТОРАН/i).length).toBeGreaterThan(0);
  });

  it("renders ChaikhanaPage direction page", () => {
    renderPage(<ChaikhanaPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/ЧАЙХАНА/i).length).toBeGreaterThan(0);
  });

  it("renders FitnessPage direction page", () => {
    renderPage(<FitnessPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/ФИТНЕС/i).length).toBeGreaterThan(0);
  });

  it("renders PoolsPage direction page", () => {
    renderPage(<PoolsPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/БАССЕЙН/i).length).toBeGreaterThan(0);
  });

  it("renders SpaPage direction page", () => {
    renderPage(<SpaPage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/SPA/i).length).toBeGreaterThan(0);
  });

  it("renders EthnoVillagePage direction page", () => {
    renderPage(<EthnoVillagePage />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(within(main).getAllByText(/ЭТНО/i).length).toBeGreaterThan(0);
  });
});
