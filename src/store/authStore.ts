import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, UserRole } from "@/types/user.types";
import { MOCK_USERS } from "@/services/mock/users.data";
import { authApi } from "@/services/api/auth.api";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      savedPropertyIds: [],
      viewedPropertyIds: [],

      login: (user: UserProfile) => {
        set({
          user,
          isAuthenticated: true,
          savedPropertyIds: user.savedPropertyIds || [],
          viewedPropertyIds: user.viewedPropertyIds || [],
        });
      },

      logout: () => {
        void authApi.logout();
        set({
          user: null,
          isAuthenticated: false,
          savedPropertyIds: [],
          viewedPropertyIds: [],
        });
      },

      switchRole: (role: UserRole) => {
        const currentUser = get().user;
        if (!currentUser || currentUser.role !== "super-admin") {
          return;
        }
        const found = MOCK_USERS.find((u) => u.role === role);
        if (found) {
          set({ user: found, isAuthenticated: true });
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
    }),
    {
      name: "gpe-auth-session",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        savedPropertyIds: state.savedPropertyIds,
        viewedPropertyIds: state.viewedPropertyIds,
      }),
    }
  )
);
