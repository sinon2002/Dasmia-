import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguageProvider, useLanguage } from "../LanguageContext";
import { LANGUAGE_STORAGE_KEY } from "@/lib/i18n";

function TestComponent() {
  const { language, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <button onClick={() => setLanguage("ky")}>Set Kyrgyz</button>
      <button onClick={() => setLanguage("en")}>Set English</button>
      <button onClick={() => setLanguage("ru")}>Set Russian</button>
    </div>
  );
}

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("provides default language 'ru'", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("ru");
  });

  it("updates language and persists to localStorage", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText("Set English"));
    expect(screen.getByTestId("current-lang").textContent).toBe("en");
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en");

    fireEvent.click(screen.getByText("Set Kyrgyz"));
    expect(screen.getByTestId("current-lang").textContent).toBe("ky");
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("ky");
  });

  it("initializes from localStorage if valid language is stored", () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "en");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("en");
  });

  it("attempts backend language sync if NEXT_PUBLIC_API_URL is set", () => {
    const originalEnv = process.env.NEXT_PUBLIC_API_URL;
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000";
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText("Set English"));
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/set-language/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ language: "en" }),
      })
    );

    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });
});
