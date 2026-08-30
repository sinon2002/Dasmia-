import { describe, it, expect } from "vitest";
import robots from "../robots";
import sitemap from "../sitemap";

describe("SEO Metadata Generation", () => {
  it("generates correct robots.txt configuration", () => {
    const res = robots();
    expect(res).toBeDefined();
    expect(res.rules).toBeDefined();
    expect(Array.isArray(res.rules)).toBe(true);

    const rules = Array.isArray(res.rules) ? res.rules[0] : res.rules;
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toEqual(["/api/", "/_next/", "/admin/"]);
    expect(res.sitemap).toContain("/sitemap.xml");
  });

  it("generates valid sitemap entries with canonical URLs and priorities", () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);

    const homeEntry = entries.find((e) => !e.url.includes("#"));
    expect(homeEntry).toBeDefined();
    expect(homeEntry?.priority).toBe(1.0);
    expect(homeEntry?.changeFrequency).toBe("weekly");

    entries.forEach((entry) => {
      expect(entry.url).toMatch(/^https?:\/\//);
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});
