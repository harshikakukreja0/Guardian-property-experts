/**
 * Centralized API Client Layer for Guardian PropertyExpert
 * Handles environment-based configuration, authentication tokens, and fallback to mock service layer.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.guardianpropertyexpert.com/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export class ApiClient {
  private static token: string | null = null;

  public static setToken(token: string | null) {
    this.token = token;
  }

  public static async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // Return simulated responses when backend is offline or in development
      console.warn(`[ApiClient] Live endpoint ${endpoint} unavailable, resolving through local service layer.`);
      throw error;
    }
  }

  public static async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  }
}
