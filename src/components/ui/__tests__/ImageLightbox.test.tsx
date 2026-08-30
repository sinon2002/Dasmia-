import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ImageLightbox from "../ImageLightbox";

describe("ImageLightbox component", () => {
  const images = [
    { url: "/img1.jpg", alt: "First Image Caption" },
    { url: "/img2.jpg", alt: "Second Image Caption" },
    { url: "/img3.jpg", alt: "Third Image Caption" },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial image, counter, and caption", () => {
    render(<ImageLightbox images={images} initialIndex={0} onClose={vi.fn()} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/img1.jpg");
    expect(screen.getByText("First Image Caption")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("navigates to next and previous images on button click", () => {
    render(<ImageLightbox images={images} initialIndex={0} onClose={vi.fn()} />);

    const nextBtn = screen.getByLabelText("Next image");
    fireEvent.click(nextBtn);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole("img")).toHaveAttribute("src", "/img2.jpg");
    expect(screen.getByText("Second Image Caption")).toBeInTheDocument();

    const prevBtn = screen.getByLabelText("Previous image");
    fireEvent.click(prevBtn);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole("img")).toHaveAttribute("src", "/img1.jpg");
  });

  it("responds to keyboard events ArrowRight, ArrowLeft, and Escape", () => {
    const handleClose = vi.fn();
    render(<ImageLightbox images={images} initialIndex={1} onClose={handleClose} />);

    // Next on ArrowRight
    fireEvent.keyDown(window, { key: "ArrowRight" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img3.jpg");

    // Prev on ArrowLeft
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img2.jpg");

    // Close on Escape
    fireEvent.keyDown(window, { key: "Escape" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(handleClose).toHaveBeenCalled();
  });

  it("triggers close when clicking the close button", () => {
    const handleClose = vi.fn();
    render(<ImageLightbox images={images} initialIndex={0} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText("Close");
    fireEvent.click(closeBtn);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleClose).toHaveBeenCalled();
  });

  it("switches image when dot indicator is clicked", () => {
    render(<ImageLightbox images={images} initialIndex={0} onClose={vi.fn()} />);

    const dot3 = screen.getByLabelText("Go to image 3");
    fireEvent.click(dot3);

    expect(screen.getByRole("img")).toHaveAttribute("src", "/img3.jpg");
  });
});
