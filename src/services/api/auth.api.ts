import { UserProfile, UserRole } from "@/types/user.types";
import { MOCK_USERS } from "../mock/users.data";
import { ApiClient } from "./client";

export const authApi = {
  async login(email: string, role?: UserRole): Promise<{ user: UserProfile; token: string }> {
    try {
      const response = await ApiClient.post<{ user: UserProfile; token: string }>("/auth/login", { email });
      ApiClient.setToken(response.data.token);
      return response.data;
    } catch {
      // Find matching mock user by email or by selected role
      let user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user && role) {
        user = MOCK_USERS.find((u) => u.role === role);
      }
      if (!user) {
        // Fallback default user with requested role
        user = {
          id: `user-${Date.now().toString().slice(-4)}`,
          name: email.split("@")[0].replace(".", " ").toUpperCase(),
          email,
          phone: "+91 98000 12345",
          role: role || "customer",
          isVerified: true,
          createdAt: new Date().toISOString(),
          city: "Mumbai",
          state: "Maharashtra",
        };
      }
      const token = `token-${user.id}-${Date.now()}`;
      ApiClient.setToken(token);
      return { user, token };
    }
  },

  async register(data: { name: string; email: string; phone: string; role: UserRole }): Promise<{ user: UserProfile; token: string }> {
    try {
      const response = await ApiClient.post<{ user: UserProfile; token: string }>("/auth/register", data);
      ApiClient.setToken(response.data.token);
      return response.data;
    } catch {
      const newUser: UserProfile = {
        id: `user-${Date.now().toString().slice(-4)}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        isVerified: false,
        createdAt: new Date().toISOString(),
        city: "Mumbai",
        state: "Maharashtra",
      };
      const token = `token-${newUser.id}-${Date.now()}`;
      ApiClient.setToken(token);
      return { user: newUser, token };
    }
  },

  async logout(): Promise<void> {
    ApiClient.setToken(null);
  },
};
