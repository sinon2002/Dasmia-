import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DirectionHero from "../DirectionHero";
import DirectionCenteredHero from "../DirectionCenteredHero";
import DirectionFeatures from "../DirectionFeatures";
import DirectionCTA from "../DirectionCTA";
import DirectionIntro from "../DirectionIntro";
import DirectionGallery from "../DirectionGallery";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function wrap(ui: React.ReactNode) {
  return render(
    <ThemeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>
  );
}

describe("Direction Sections Components", () => {
  it("renders DirectionHero with category, title, description, and action buttons", () => {
    wrap(
      <DirectionHero
        category="БАНКЕТНЫЕ ЗАЛЫ"
        title="БАНКЕТНЫЕ"
        subtitle="ЗАЛЫ"
        description="Пространство для грандиозных событий"
        imageUrl="/assets/images/banquet.jpg"
        imageAlt="Banquet Hall"
        dataDirection="banquet"
      />
    );

    expect(screen.getAllByText(/БАНКЕТНЫЕ/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Пространство для грандиозных событий")).toBeInTheDocument();
    expect(screen.getByAltText("Banquet Hall")).toBeInTheDocument();
  });

  it("renders DirectionCenteredHero with centered headings", () => {
    wrap(
      <DirectionCenteredHero
        category="СПА & САУНЫ"
        title="DASMIA SPA"
        description="Гармония тела и духа в премиальном SPA-комплексе"
        backgroundImage="/assets/images/spa.jpg"
        backgroundAlt="SPA Complex"
        ctaLabel="ЗАБРОНИРОВАТЬ"
        hours="10:00 — 23:00"
        seats="До 50 гостей"
        phone="+996 (312) 54-88-88"
        dataDirection="spa"
      />
    );

    expect(screen.getByText("СПА & САУНЫ")).toBeInTheDocument();
    expect(screen.getAllByText("DASMIA SPA").length).toBeGreaterThan(0);
    expect(screen.getByText("Гармония тела и духа в премиальном SPA-комплексе")).toBeInTheDocument();
  });

  it("renders DirectionIntro with details cards", () => {
    wrap(
      <DirectionIntro
        label="КОНЦЕПЦИЯ"
        heading="Традиции и"
        headingItalic="современность"
        body="Уникальное пространство в Бишкеке"
        details={[
          { label: "ВМЕСТИМОСТЬ", value: "до 1000 гостей" },
          { label: "ПЛОЩАДЬ", value: "2500 м²" },
        ]}
        dataDirection="banquet"
      />
    );

    expect(screen.getByText("КОНЦЕПЦИЯ")).toBeInTheDocument();
    expect(screen.getByText("Традиции и")).toBeInTheDocument();
    expect(screen.getByText("современность")).toBeInTheDocument();
    expect(screen.getByText("до 1000 гостей")).toBeInTheDocument();
    expect(screen.getByText("2500 м²")).toBeInTheDocument();
  });

  it("renders DirectionFeatures with feature cards", () => {
    wrap(
      <DirectionFeatures
        label="ПРЕИМУЩЕСТВА"
        heading="Почему выбирают нас"
        features={[
          { number: "01", title: "Премиальный сервис", description: "Индивидуальный подход к каждому гостю" },
          { number: "02", title: "Шеф-повара", description: "Авторская кухня высшего уровня" },
        ]}
        imageUrl="/assets/images/features.jpg"
        imageAlt="Features"
        dataDirection="banquet"
      />
    );

    expect(screen.getByText("ПРЕИМУЩЕСТВА")).toBeInTheDocument();
    expect(screen.getByText("Почему выбирают нас")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Премиальный сервис")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Шеф-повара")).toBeInTheDocument();
  });

  it("renders DirectionCTA with booking actions", () => {
    wrap(
      <DirectionCTA
        heading="Забронируйте"
        headingItalic="ваш праздник"
        description="Свяжитесь с нами для индивидуального расчета"
        primaryLabel="ОСТАВИТЬ ЗАЯВКУ"
        secondaryLabel="СКАЧАТЬ ПРЕЗЕНТАЦИЮ"
        dataDirection="banquet"
      />
    );

    expect(screen.getByText("Забронируйте")).toBeInTheDocument();
    expect(screen.getByText("ваш праздник")).toBeInTheDocument();
    expect(screen.getByText("Свяжитесь с нами для индивидуального расчета")).toBeInTheDocument();
    expect(screen.getByText("ОСТАВИТЬ ЗАЯВКУ")).toBeInTheDocument();
  });

  it("renders DirectionGallery with bento grid images", () => {
    wrap(
      <DirectionGallery
        label="ГАЛЕРЕЯ"
        heading="Атмосфера комплекса"
        images={[
          { url: "/assets/img1.jpg", alt: "Фото 1", span: "wide" },
          { url: "/assets/img2.jpg", alt: "Фото 2", span: "normal" },
        ]}
        dataDirection="banquet"
      />
    );

    expect(screen.getByText("ГАЛЕРЕЯ")).toBeInTheDocument();
    expect(screen.getByText("Атмосфера комплекса")).toBeInTheDocument();
    expect(screen.getByAltText("Фото 1")).toBeInTheDocument();
    expect(screen.getByAltText("Фото 2")).toBeInTheDocument();
  });
});
