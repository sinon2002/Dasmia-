import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppIcon from "../AppIcon";

describe("AppIcon component", () => {
  it("renders known outline icon", () => {
    const { container } = render(<AppIcon name="PhoneIcon" size={32} className="custom-class" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
    expect(svg?.getAttribute("class")).toContain("custom-class");
  });

  it("renders solid variant icon", () => {
    const { container } = render(<AppIcon name="CheckIcon" variant="solid" size={20} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "20");
  });

  it("renders QuestionMarkCircleIcon fallback for unknown icon", () => {
    const { container } = render(<AppIcon name="NonExistentIconXYZ" size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("class")).toContain("text-gray-400");
  });

  it("handles onClick event when not disabled", () => {
    const handleClick = vi.fn();
    const { container } = render(<AppIcon name="EnvelopeIcon" onClick={handleClick} />);
    const svg = container.querySelector("svg");
    if (svg) fireEvent.click(svg);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick when disabled", () => {
    const handleClick = vi.fn();
    const { container } = render(<AppIcon name="EnvelopeIcon" onClick={handleClick} disabled={true} />);
    const svg = container.querySelector("svg");
    if (svg) fireEvent.click(svg);
    expect(handleClick).not.toHaveBeenCalled();
    expect(svg?.getAttribute("class")).toContain("opacity-50 cursor-not-allowed");
  });
});
