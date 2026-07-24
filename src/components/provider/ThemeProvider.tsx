'use client';

import { ConfigProvider } from "antd";
import { createTenantTheme } from "@/theme";
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

  return (
    <ConfigProvider theme={createTenantTheme(primaryColor, mode)}>
      {children}
    </ConfigProvider>
  );
}
