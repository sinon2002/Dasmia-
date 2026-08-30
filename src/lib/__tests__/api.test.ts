import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitLead, LeadPayload } from "../api";

describe("submitLead API client", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should successfully submit lead with 201 status", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 201,
      ok: true,
      json: async () => ({ success: true, id: "test-uuid-123" }),
    });

    const payload: LeadPayload = {
      form_type: "banquet",
      name: "Азамат Исаков",
      phone: "+996555123456",
      captcha_token: "test-token-123",
      payload: { guest_count: 150, event_date: "2026-10-10" },
    };

    const res = await submitLead(payload);
    expect(res).toEqual({ success: true });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle response with ok=true and status 200", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ success: true }),
    });

    const res = await submitLead({
      form_type: "feedback",
      name: "Татьяна",
      phone: "+996777000111",
      captcha_token: "valid-token-123",
    });

    expect(res.success).toBe(true);
  });

  it("should return detailed error message when response includes detail", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      json: async () => ({ detail: "Неверный формат телефона" }),
    });

    const res = await submitLead({
      form_type: "contact",
      name: "Тест",
      phone: "123",
      captcha_token: "token",
    });

    expect(res.success).toBe(false);
    expect(res.message).toBe("Неверный формат телефона");
  });

  it("should extract error from non_field_errors", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      json: async () => ({ non_field_errors: ["Обнаружен спам."] }),
    });

    const res = await submitLead({
      form_type: "contact",
      name: "Bot",
      phone: "+996555123456",
      captcha_token: "token",
      website: "http://spam.com",
    });

    expect(res.success).toBe(false);
    expect(res.message).toBe("Обнаружен спам.");
  });

  it("should extract error from first field array", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      json: async () => ({ phone: ["Номер телефона обязателен."] }),
    });

    const res = await submitLead({
      form_type: "feedback",
      name: "Иван",
      phone: "",
      captcha_token: "token",
    });

    expect(res.success).toBe(false);
    expect(res.message).toBe("Номер телефона обязателен.");
  });

  it("should extract error from first string field value", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      json: async () => ({ message: "Ошибка сервера при обработке" }),
    });

    const res = await submitLead({
      form_type: "fitness",
      name: "Иван",
      phone: "+996555123456",
      captcha_token: "token",
    });

    expect(res.success).toBe(false);
    expect(res.message).toBe("Ошибка сервера при обработке");
  });

  it("should fallback to default error message if json parse fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      status: 500,
      ok: false,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    const res = await submitLead({
      form_type: "spa",
      name: "Алена",
      phone: "+996555112233",
      captcha_token: "token",
    });

    expect(res.success).toBe(false);
    expect(res.message).toBe("Произошла ошибка. Попробуйте ещё раз.");
  });

  it("should handle network connection failure gracefully", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network Error / Connection Refused"));

    const res = await submitLead({
      form_type: "chaikhana",
      name: "Нурлан",
      phone: "+996555998877",
      captcha_token: "token",
    });

    expect(res.success).toBe(false);
    expect(res.message).toContain("Не удалось связаться с сервером");
  });
});
