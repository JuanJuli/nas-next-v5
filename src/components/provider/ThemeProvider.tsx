'use client';

import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";

export default function ThemeProvider({
  primaryColor,
  children,
}: {
  primaryColor: string;
  children: React.ReactNode;
}) {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const setPrimaryColor = useThemeStore((s) => s.setPrimaryColor)

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("theme-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.mode) {
          const html = document.documentElement;
          if (parsed.state.mode === "dark") {
            html.classList.add("dark");
          } else {
            html.classList.remove("dark");
          }
          return;
        }
      }
    } catch {}

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  }, [setMode]);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [mode]);

  useEffect(() => {
    const html = document.documentElement;
    html.style.setProperty("--primary", primaryColor);
    const setPrimaryColorC = (color: string) => {
      setPrimaryColor(color)
    }
  
    setPrimaryColorC(primaryColor)
  }, [primaryColor]);

  return <>{children}</>;
}
