import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      setMode: (mode) => set({ mode }),
      toggle: () => set((s) => ({ mode: s.mode === "light" ? "dark" : "light" })),
    }),
    { name: "theme-storage" }
  )
);
