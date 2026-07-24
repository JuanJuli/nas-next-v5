"use client";

import { readCookie } from "@/app/action";
import { useLogout } from "@/hooks/useLogout";
import { authFetch } from "@/utils/authFetch";
import { useAuthStore } from "@/store/auth";
import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { Me } from "@/types/me";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

export default function AuthProvider({ roleCode, children }: { roleCode?: string | null; children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const setToken = useAuthStore((s) => s.setToken);
  const setRoleCode = useAuthStore((s) => s.setRoleCode);
  const token = useAuthStore((s) => s.token);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const { logout } = useLogout();
  const hasFetchedUser = useRef(false);
  const pathName = usePathname();

  useEffect(() => {
    if (roleCode) {
      setRoleCode(roleCode);
    }

  }, [roleCode, setRoleCode]);

  const fetchUser = async () => {
    try {
      const res = await authFetch("/api/me", { 
        credentials: "include",
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (res.ok) {
        const data: DefaultApiResponse<Me> = await res.json();
        if (data.status === "OK" && data.data) {
          setUser(data.data);
          hasFetchedUser.current = true;
        } else {
          console.error("Invalid user data response:", data);
          logout();
        }
      } else {
        console.error("Failed to fetch user, status:", res.status);
        logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  const getToken = async () => {
    const tokenCook = await readCookie("token");
    if (tokenCook) {
      setToken(tokenCook);
    }
    
    useAuthStore.getState().setInitialized();
  }

  useEffect(() => {
    // Set token first
    if (!token) {
      getToken();
    }

    if (!user && token) {
      fetchUser();
    }

  }, [pathName, token]);

  useEffect(() => {
    // Only fetch user after token is set and if we haven't fetched yet
    if (!isInitialized || !token || hasFetchedUser.current) {
      return;
    }

    fetchUser();
  }, [isInitialized, setUser, logout, token]);

  // Reset fetch flag when token changes
  useEffect(() => {
    if (token) {
      hasFetchedUser.current = false;
    } else {
      hasFetchedUser.current = true; // Don't fetch if no token
    }
  }, [token]);

  return children;
}