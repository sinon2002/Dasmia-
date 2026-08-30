import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactSection from "../ContactSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function renderContactSection() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    </ThemeProvider>
  );
}

describe("ContactSection component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders form inputs, headers, and contact information", () => {
    renderContactSection();

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ваше имя")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+996 XXX XXX XXX")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Направление/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Как с вами связаться/i })).toBeInTheDocument();
  });

  it("validates required fields on empty submit and displays errors", async () => {
    const { container } = renderContactSection();

    const submitBtn = container.querySelector('button[type="submit"]')!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Пожалуйста, укажите ваше имя")).toBeInTheDocument();
    expect(screen.getByText("Пожалуйста, укажите телефон")).toBeInTheDocument();
    expect(screen.getAllByText("Выберите направление").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Выберите способ связи").length).toBeGreaterThan(0);
    expect(screen.getByText("Необходимо согласие на обработку данных")).toBeInTheDocument();
  });

  it("validates invalid phone number format", async () => {
    const { container } = renderContactSection();

    const phoneInput = screen.getByPlaceholderText("+996 XXX XXX XXX");
    fireEvent.change(phoneInput, { target: { value: "abc" } });

    const submitBtn = container.querySelector('button[type="submit"]')!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Введите корректный номер телефона")).toBeInTheDocument();
  });

  it("successfully submits form and transitions to success view", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 201,
      ok: true,
      json: async () => ({ success: true, id: "lead-12345" }),
    });

    const { container } = renderContactSection();

    fireEvent.change(screen.getByPlaceholderText("Ваше имя"), { target: { value: "Эрмек" } });
    fireEvent.change(screen.getByPlaceholderText("+996 XXX XXX XXX"), { target: { value: "+996777123456" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Направление/i }), { target: { value: "Банкетные залы" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Как с вами связаться/i }), { target: { value: "WhatsApp" } });
    fireEvent.click(screen.getByRole("checkbox"));

    const submitBtn = container.querySelector('button[type="submit"]')!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("ОТПРАВИТЬ ЕЩЁ ОДНУ ЗАЯВКУ")).toBeInTheDocument();
    });

    // Test sending another request resets form
    fireEvent.click(screen.getByText("ОТПРАВИТЬ ЕЩЁ ОДНУ ЗАЯВКУ"));
    expect(screen.getByPlaceholderText("Ваше имя")).toBeInTheDocument();
  });

  it("displays server error message on submit failure", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      json: async () => ({ detail: "Ошибка отправки в CRM" }),
    });

    const { container } = renderContactSection();

    fireEvent.change(screen.getByPlaceholderText("Ваше имя"), { target: { value: "Эрмек" } });
    fireEvent.change(screen.getByPlaceholderText("+996 XXX XXX XXX"), { target: { value: "+996777123456" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Направление/i }), { target: { value: "Банкетные залы" } });
    fireEvent.change(screen.getByRole("combobox", { name: /Как с вами связаться/i }), { target: { value: "WhatsApp" } });
    fireEvent.click(screen.getByRole("checkbox"));

    const submitBtn = container.querySelector('button[type="submit"]')!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Ошибка отправки в CRM")).toBeInTheDocument();
    });
  });
});
