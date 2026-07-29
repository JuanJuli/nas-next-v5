import { useAuthStore } from "@/store/auth";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALE_PATTERN = /^\/(en|id)(\/|$)/;

let isLoggingOut = false;

export function stripLocale(path: string): string {
  return path.replace(LOCALE_PATTERN, '/');
}

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
    const currentPath = stripLocale(window.location.pathname);
    const loginUrl = currentPath.includes('/login') ||  disabledRedirect
      ? '/login'
      : `/login?redirect=${encodeURIComponent(currentPath)}`;
    window.location.href = loginUrl;
  }
}

export function useSession() {
  const pathname = usePathname();
  const router = useRouter();

  const destroy = async (disabledRedirect = false) => {
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
      if (pathname === '/login' || disabledRedirect) {
        router.replace('/login');
      } else {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  };

  return { destroy };
}
