import { Me } from "@/types/me";
import { create } from "zustand";

interface AuthState {
  user: Me | null;
  token: string | null;
  roleCode?: string | null;
  isInitialized: boolean;
  setUser: (user: Me) => void;
  setToken: (token: string | null) => void;
  setRoleCode: (roleCode: string | null) => void;
  setInitialized: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  setToken: (token) => set({ token }),
  roleCode: null,
  setRoleCode: (roleCode: string | null) => set({ roleCode }),
  isInitialized: false,
  setInitialized: () => set({ isInitialized: true }),
  logout: () => set({ user: null, token: null, roleCode: null, isInitialized: false }),
}));