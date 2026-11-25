import { create } from "zustand";
import { UserProfile, UserRole } from "@/types/user.types";
import { MOCK_USERS } from "@/services/mock/users.data";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  savedPropertyIds: string[];
  viewedPropertyIds: string[];
  login: (user: UserProfile) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  toggleSaveProperty: (propertyId: string) => void;
  recordViewProperty: (propertyId: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: MOCK_USERS[0], // default to super-admin for seamless development and testing of all features
  isAuthenticated: true,
  savedPropertyIds: ["prop-101", "prop-103", "prop-106"],
  viewedPropertyIds: ["prop-101", "prop-102", "prop-103", "prop-104"],

  login: (user: UserProfile) => {
    set({
      user,
      isAuthenticated: true,
      savedPropertyIds: user.savedPropertyIds || [],
      viewedPropertyIds: user.viewedPropertyIds || [],
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  switchRole: (role: UserRole) => {
    const found = MOCK_USERS.find((u) => u.role === role);
    if (found) {
      set({ user: found, isAuthenticated: true });
    } else {
      const mockUser: UserProfile = {
        id: `mock-${role}`,
        name: `${role.toUpperCase().replace("-", " ")} USER`,
        email: `${role}@guardianpropertyexpert.com`,
        phone: "+91 98000 00000",
        role,
        isVerified: true,
        createdAt: "2024-01-01",
        city: "Mumbai",
        state: "Maharashtra",
      };
      set({ user: mockUser, isAuthenticated: true });
    }
  },

  toggleSaveProperty: (propertyId: string) => {
    const current = get().savedPropertyIds;
    if (current.includes(propertyId)) {
      set({ savedPropertyIds: current.filter((id) => id !== propertyId) });
    } else {
      set({ savedPropertyIds: [...current, propertyId] });
    }
  },

  recordViewProperty: (propertyId: string) => {
    const current = get().viewedPropertyIds;
    if (!current.includes(propertyId)) {
      set({ viewedPropertyIds: [propertyId, ...current].slice(0, 10) });
    }
  },
}));
