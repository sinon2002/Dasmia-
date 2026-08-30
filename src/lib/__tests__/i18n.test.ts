import { describe, it, expect, beforeEach } from "vitest";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
  getStoredLanguage,
  setStoredLanguage,
  getTranslations,
  t,
  Language,
} from "../i18n";

describe("i18n module", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should have correct supported languages and labels", () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["ru", "ky", "en"]);
    expect(DEFAULT_LANGUAGE).toBe("ru");
    expect(LANGUAGE_LABELS.ru).toBe("RU");
    expect(LANGUAGE_LABELS.ky).toBe("KY");
    expect(LANGUAGE_LABELS.en).toBe("EN");
  });

  it("should get DEFAULT_LANGUAGE when localStorage is empty or invalid", () => {
    expect(getStoredLanguage()).toBe("ru");
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "invalid_lang");
    expect(getStoredLanguage()).toBe("ru");
  });

  it("should get and set stored language properly", () => {
    setStoredLanguage("ky");
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("ky");
    expect(getStoredLanguage()).toBe("ky");

    setStoredLanguage("en");
    expect(getStoredLanguage()).toBe("en");
  });

  it("should translate keys correctly for each language", () => {
    expect(t("ru", "nav.about")).toBe("О КОМПЛЕКСЕ");
    expect(t("ky", "nav.about")).toBe("КОМПЛЕКС ЖӨНҮНДӨ");
    expect(t("en", "nav.about")).toBe("ABOUT");
  });

  it("should fallback to default language or key itself when translation is missing", () => {
    const unknownKey = "non_existent.custom_key_12345";
    expect(t("ru", unknownKey)).toBe(unknownKey);
    expect(t("en", unknownKey)).toBe(unknownKey);
  });

  it("should return translation dictionary from getTranslations", () => {
    const ruTranslations = getTranslations("ru");
    expect(ruTranslations).toBeDefined();
    expect(ruTranslations["hero.title"]).toBe("DASMIA");

    const kyTranslations = getTranslations("ky");
    expect(kyTranslations).toBeDefined();
    expect(kyTranslations["hero.title"]).toBe("DASMIA");

    const enTranslations = getTranslations("en");
    expect(enTranslations).toBeDefined();
    expect(enTranslations["hero.title"]).toBe("DASMIA");
  });

  it("should ensure core keys exist in all three languages", () => {
    const coreKeys = [
      "nav.about",
      "nav.directions",
      "nav.corporate",
      "nav.history",
      "nav.contact",
      "nav.cta",
      "hero.title",
      "hero.subtitle",
      "hero.cta.primary",
      "footer.rights",
      "footer.privacy",
      "404.title",
      "contact.error.name",
      "contact.error.phone",
    ];

    SUPPORTED_LANGUAGES.forEach((lang) => {
      const dict = getTranslations(lang);
      coreKeys.forEach((key) => {
        expect(dict[key], `Missing translation for key '${key}' in lang '${lang}'`).toBeDefined();
        expect(dict[key].length).toBeGreaterThan(0);
      });
    });
  });
});
