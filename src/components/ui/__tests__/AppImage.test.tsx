import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppImage from "../AppImage";

describe("AppImage component", () => {
  it("renders with given src and alt text", () => {
    render(<AppImage src="/assets/images/banquet.jpg" alt="Banquet Hall" width={500} height={300} />);
    const img = screen.getByAltText("Banquet Hall");
    expect(img).toBeInTheDocument();
  });

  it("renders in fill mode inside relative container", () => {
    const { container } = render(<AppImage src="/assets/images/hero.jpg" alt="Hero background" fill />);
    const wrapper = container.querySelector(".relative");
    expect(wrapper).toBeInTheDocument();
    const img = screen.getByAltText("Hero background");
    expect(img).toBeInTheDocument();
  });

  it("falls back to fallbackSrc on image load error", () => {
    render(
      <AppImage
        src="/assets/images/broken.jpg"
        alt="Broken Test"
        fallbackSrc="/assets/images/no_image.png"
      />
    );
    const img = screen.getByAltText("Broken Test");
    fireEvent.error(img);
    expect(img.getAttribute("src")).toContain("no_image.png");
  });

  it("handles onClick handler", () => {
    const handleClick = vi.fn();
    render(<AppImage src="/test.jpg" alt="Clickable" onClick={handleClick} />);
    const img = screen.getByAltText("Clickable");
    fireEvent.click(img);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
