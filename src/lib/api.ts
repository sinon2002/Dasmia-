import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export interface LeadPayload {
  form_type: string;
  name: string;
  phone: string;
  payload?: Record<string, unknown>;
  captcha_token: string;
  website?: string; // honeypot — must be empty
}

export interface LeadResponse {
  success: boolean;
  message?: string;
}

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  try {
    const response = await fetch(`${API_URL}/api/v1/leads/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201 || response.ok) {
      return { success: true };
    }

    let message = "Произошла ошибка. Попробуйте ещё раз.";
    try {
      const json = await response.json();
      if (json?.detail) {
        message = json.detail;
      } else if (json?.message) {
        message = json.message;
      } else if (json?.non_field_errors?.[0]) {
        message = json.non_field_errors[0];
      } else if (typeof json === "object" && json !== null) {
        const firstKey = Object.keys(json)[0];
        const val = (json as Record<string, unknown>)[firstKey];
        if (Array.isArray(val) && typeof val[0] === "string") {
          message = val[0];
        } else if (typeof val === "string") {
          message = val;
        }
      }
    } catch {
      // ignore parse errors
    }

    return { success: false, message };
  } catch (error) {
    console.error("submitLead fetch error:", error);
    return {
      success: false,
      message: "Не удалось связаться с сервером. Убедитесь, что бэкенд запущен.",
    };
  }
}

/* ────────────────────────────────────────────────────────────────
 * Directions API (CMS-backed images) — fetches Direction + gallery
 * data from the Django backend, so photos can be managed via the
 * admin panel instead of being hardcoded in the frontend.
 *
 * IMPORTANT: the admin panel is not fully working yet on the backend
 * side, so every call here is wrapped in try/catch and returns null
 * on ANY failure (network error, 404, empty payload, timeout). Every
 * call site must keep using the existing static content from
 * src/lib/directionsContent.ts and public/assets/images/ as a
 * fallback when this returns null — the site must never break or
 * show empty sections just because the backend/admin isn't ready.
 * ──────────────────────────────────────────────────────────────── */

export interface ApiDirectionGalleryImage {
  id: number;
  direction: number;
  direction_slug: string;
  direction_name: string;
  image: string;
  title: string;
  title_ru?: string | null;
  title_ky?: string | null;
  title_en?: string | null;
  span: "wide" | "normal" | string;
  span_display?: string;
  order: number;
  is_active: boolean;
}

export interface ApiDirection {
  id: number;
  slug: string;
  name: string;
  name_ru: string;
  name_ky: string;
  name_en: string;
  description: string;
  cover_image: string;
  is_active: boolean;
  order: number;
  gallery_images: ApiDirectionGalleryImage[];
}

/**
 * Fetches a single direction (with its gallery) by slug, e.g. "banquet".
 * Returns null on any error — callers must fall back to static content.
 */
export async function fetchDirection(slug: string): Promise<ApiDirection | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/directions/${slug}/`, {
      // Don't let a slow/unreachable dev backend hang the page.
      signal: AbortSignal.timeout(5000),
      // Directions rarely change; avoid re-fetching on every navigation.
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ApiDirection;

    if (!data || !data.slug) {
      return null;
    }

    return data;
  } catch (error) {
    console.warn(`fetchDirection("${slug}") failed, falling back to static content:`, error);
    return null;
  }
}

/**
 * Picks the localized name for a direction from the API payload,
 * matching the site's Language type ("ru" | "ky" | "en").
 */
export function getApiDirectionName(direction: ApiDirection, language: string): string {
  if (language === "ky" && direction.name_ky) return direction.name_ky;
  if (language === "en" && direction.name_en) return direction.name_en;
  return direction.name_ru || direction.name;
}

/**
 * Picks the localized caption for a gallery image, falling back to
 * the generic "title" field (then to the direction's name) when a
 * language-specific title hasn't been filled in via the admin yet.
 */
export function getApiGalleryImageTitle(
  image: ApiDirectionGalleryImage,
  language: string,
  fallback: string,
): string {
  if (language === "ky" && image.title_ky) return image.title_ky;
  if (language === "en" && image.title_en) return image.title_en;
  return image.title_ru || image.title || fallback;
}

export interface DirectionGalleryImage {
  url: string;
  alt: string;
  span: "wide" | "normal" | string;
}

/**
 * Shared hook for the direction pages: fetches the direction (with its
 * CMS gallery) by slug, and exposes both the raw API payload and a
 * ready-to-use, order-sorted, localized gallery array.
 *
 * `gallery` is null whenever the backend/admin isn't reachable or has no
 * images yet for this direction — every page must fall back to its own
 * static image arrays in that case, exactly like the /banquet pilot.
 */
export function useDirectionGallery(slug: string, language: string) {
  const [apiDirection, setApiDirection] = useState<ApiDirection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDirection(slug).then((result) => {
      if (!cancelled) setApiDirection(result);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const gallery: DirectionGalleryImage[] | null =
    apiDirection && apiDirection.gallery_images.length > 0
      ? [...apiDirection.gallery_images]
          .sort((a, b) => a.order - b.order)
          .map((img) => ({
            url: img.image,
            alt: getApiGalleryImageTitle(img, language, apiDirection.name),
            span: img.span,
          }))
      : null;

  return { apiDirection, gallery };
}
