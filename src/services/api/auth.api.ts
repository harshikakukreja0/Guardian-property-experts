import { UserProfile, UserRole } from "@/types/user.types";
import { MOCK_USERS } from "../mock/users.data";
import { ApiClient } from "./client";

const ALLOWED_REGISTRATION_ROLES: UserRole[] = [
  "customer",
  "broker",
  "builder",
  "owner",
];

const LOCAL_USERS_KEY = "gpe-registered-users";

function getLocalRegisteredUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? (JSON.parse(raw) as UserProfile[]) : [];
  } catch {
    return [];
  }
}

function saveLocalRegisteredUser(user: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalRegisteredUsers().filter(
      (u) => u.email.toLowerCase() !== user.email.toLowerCase()
    );
    window.localStorage.setItem(
      LOCAL_USERS_KEY,
      JSON.stringify([user, ...existing])
    );
  } catch {
    // Ignore storage quota errors
  }
}

export const authApi = {
  async login(
    email: string,
    password?: string
  ): Promise<{ user: UserProfile; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await ApiClient.post<{ user: UserProfile; token: string }>(
        "/auth/login",
        { email: normalizedEmail, password }
      );
      ApiClient.setToken(response.data.token);
      return response.data;
    } catch {
      const localUsers = getLocalRegisteredUsers();
      let user =
        localUsers.find((u) => u.email.toLowerCase() === normalizedEmail) ||
        MOCK_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        const rawName = normalizedEmail.split("@")[0] || "Member";
        const formattedName = rawName
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        user = {
          id: `user-${Date.now().toString().slice(-4)}`,
          name: formattedName,
          email: normalizedEmail,
          phone: "",
          role: "customer",
          isVerified: true,
          createdAt: new Date().toISOString(),
          city: "Gurugram",
          state: "Haryana",
        };
      }

      const token = `token-${user.id}-${Date.now()}`;
      ApiClient.setToken(token);
      return { user, token };
    }
  },

  async register(data: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: UserRole;
  }): Promise<{ user: UserProfile; token: string }> {
    // Prevent privilege escalation via public registration
    const safeRole: UserRole = ALLOWED_REGISTRATION_ROLES.includes(data.role)
      ? data.role
      : "customer";

    const payload = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      role: safeRole,
    };

    try {
      const response = await ApiClient.post<{ user: UserProfile; token: string }>(
        "/auth/register",
        payload
      );
      ApiClient.setToken(response.data.token);
      return response.data;
    } catch {
      const newUser: UserProfile = {
        id: `user-${Date.now().toString().slice(-4)}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: safeRole,
        isVerified: false,
        createdAt: new Date().toISOString(),
        city: "Gurugram",
        state: "Haryana",
      };
      saveLocalRegisteredUser(newUser);
      const token = `token-${newUser.id}-${Date.now()}`;
      ApiClient.setToken(token);
      return { user: newUser, token };
    }
  },

  async logout(): Promise<void> {
    ApiClient.setToken(null);
  },
};
