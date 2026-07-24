"use client";

import { useAuthStore } from "@/store/auth";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

export default function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const { isInitialized, token } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;
    if (token) return;
    if (hasRedirected.current) return;

    hasRedirected.current = true;
    const redirect = encodeURIComponent(pathname);
    router.replace(`/login?redirect=${redirect}`);
  }, [isInitialized, token, pathname, router]);

  if (!isInitialized) return null;

  if (!token) return null;

  return <>{children}</>;
}
