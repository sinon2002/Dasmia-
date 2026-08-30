import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppLogo from "../AppLogo";

describe("AppLogo component", () => {
  it("renders logo image when src is provided", () => {
    render(<AppLogo src="/assets/dasmia-wordmark.svg" size={80} className="test-logo" />);
    const logoImg = screen.getByAltText("Logo");
    expect(logoImg).toBeInTheDocument();
  });

  it("renders icon when src is empty", () => {
    const { container } = render(<AppLogo src="" iconName="SparklesIcon" size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("supports click interactions", () => {
    const handleClick = vi.fn();
    const { container } = render(<AppLogo src="/test-logo.svg" onClick={handleClick} />);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.click(wrapper);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
