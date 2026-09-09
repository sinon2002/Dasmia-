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

export interface ApiGalleryImage {
  id: number;
  image: string;
  title: string;
  span: string;
  order: number;
}

export interface ApiDirection {
  id: number;
  slug: string;
  name: string;
  description: string;
  cover_image: string;
  order: number;
  gallery_images: ApiGalleryImage[];
}

export interface ApiMediaAsset {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  created_at: string;
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

export async function fetchDirection(slug: string): Promise<ApiDirection | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/directions/${slug}/`);
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}

export async function fetchMediaAssets(category?: string): Promise<ApiMediaAsset[]> {
  try {
    const url = category
      ? `${API_URL}/api/v1/media-assets/?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/v1/media-assets/`;
    const response = await fetch(url);
    if (!response.ok) return [];
    return await response.json();
  } catch (err) {
    return [];
  }
}
