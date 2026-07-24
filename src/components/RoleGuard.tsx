"use client"

import { useAuthStore } from "@/store/auth"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useEffect, useRef } from "react"
import { useRoleGuard } from "@/hooks/useRoleGuard"
import { RoleCode } from "@/constants/roles"

export default function RoleGuard({
  children,
  allowedRoles,
  roleCode,
}: {
  children: React.ReactNode
  allowedRoles?: RoleCode[]
  roleCode?: string;
}) {
  const { isInitialized } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthorized } = useRoleGuard(undefined, allowedRoles, roleCode)
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!isInitialized) return
    if (isAuthorized) return
    if (hasRedirected.current) return

    hasRedirected.current = true
    router.replace(`/unauthorized?from=${encodeURIComponent(pathname)}`)
  }, [isInitialized, isAuthorized, pathname, router])

  if (!isInitialized) return null

  if (!isAuthorized) return null

  return <>{children}</>
}
