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
    expect(screen.getByText("ИСТОРИЯ")).toBeInTheDocument();
    expect(screen.getByText("КОНТАКТЫ")).toBeInTheDocument();
  });

  it("submits footer contact form successfully", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 201,
      ok: true,
      json: async () => ({ success: true }),
    });

    const { container } = renderFooter();

    const nameInput = screen.getByPlaceholderText("Ваше имя");
    const phoneInput = screen.getByPlaceholderText("+996 (000) 000-000");
    const select = container.querySelector("select")!;
    const checkbox = container.querySelector('input[type="checkbox"]')!;
    const submitBtn = screen.getByRole("button", { name: "Оставить заявку" });

    fireEvent.change(nameInput, { target: { value: "Тестовый Пользователь" } });
    fireEvent.change(phoneInput, { target: { value: "+996555123456" } });
    fireEvent.change(select, { target: { value: "WhatsApp" } });
    fireEvent.click(checkbox);

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Заявка отправлена/i)).toBeInTheDocument();
    });
  });

  it("shows error message if form submitted without required fields", async () => {
    const { container } = renderFooter();

    const submitBtn = screen.getByRole("button", { name: "Оставить заявку" });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Заполните все поля/i)).toBeInTheDocument();
    });
  });
});
