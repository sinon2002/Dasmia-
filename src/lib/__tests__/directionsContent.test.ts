import { describe, it, expect } from "vitest";
import { directionsContent } from "../directionsContent";
import { SUPPORTED_LANGUAGES } from "../i18n";

describe("directionsContent data integrity", () => {
  const expectedDirections = [
    "banquet",
    "restaurant",
    "fitness",
    "pools",
    "spa",
    "chaikhana",
    "ethno-village",
  ];

  it("should contain all expected direction slugs", () => {
    expectedDirections.forEach((slug) => {
      expect(directionsContent[slug], `Missing direction content for slug: ${slug}`).toBeDefined();
    });
  });

  it("should provide complete localized content for all supported languages", () => {
    Object.entries(directionsContent).forEach(([slug, langMap]) => {
      SUPPORTED_LANGUAGES.forEach((lang) => {
        const data = langMap[lang];
        expect(data, `Missing language '${lang}' for direction '${slug}'`).toBeDefined();

        // Check hero section
        expect(data.hero.title).toBeTruthy();
        expect(data.hero.category).toBeTruthy();
        expect(data.hero.description).toBeTruthy();

        // Check intro section
        expect(data.intro.label).toBeTruthy();
        expect(data.intro.heading).toBeTruthy();
        expect(data.intro.body).toBeTruthy();
        expect(Array.isArray(data.intro.details)).toBe(true);
        expect(data.intro.details.length).toBeGreaterThan(0);

        // Check features section
        expect(data.featuresSection.heading).toBeTruthy();
        expect(Array.isArray(data.featuresSection.features)).toBe(true);
        expect(data.featuresSection.features.length).toBeGreaterThan(0);

        data.featuresSection.features.forEach((feature) => {
          expect(feature.number).toBeTruthy();
          expect(feature.title).toBeTruthy();
          expect(feature.description).toBeTruthy();
        });

        // Check CTA
        expect(data.cta.heading).toBeTruthy();
        expect(data.cta.description).toBeTruthy();
        expect(data.cta.primaryLabel).toBeTruthy();
      });
    });
  });
});
