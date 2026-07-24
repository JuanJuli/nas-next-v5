import { useAuthStore } from "@/store/auth";

let isLoggingOut = false;

export async function destroySession(disabledRedirect = false) {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    useAuthStore.getState().logout();

    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Session cleanup error:", error);
  } finally {
    const currentPath = window.location.pathname;
    const loginUrl = currentPath.includes('/login') ||  disabledRedirect
      ? '/login'
      : `/login?redirect=${encodeURIComponent(currentPath)}`;
    window.location.href = loginUrl;
  }
}
