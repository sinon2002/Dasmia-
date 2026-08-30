import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider, useTheme } from "../ThemeContext";

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("provides default theme 'dark'", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
  });

  it("toggles theme and updates documentElement classes and localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initial state dark
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);

    // Toggle to light
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
    expect(document.documentElement.classList.contains("theme-dark")).toBe(false);
    expect(localStorage.getItem("dasmia-theme")).toBe("light");

    // Toggle back to dark
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
    expect(document.documentElement.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("dasmia-theme")).toBe("dark");
  });

  it("initializes from stored theme in localStorage", () => {
    localStorage.setItem("dasmia-theme", "light");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
  });
});
