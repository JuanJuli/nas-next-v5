"use client"

import { useAuthStore } from "@/store/auth"
import { usePathname } from "@/i18n/navigation"
import { PAGE_ROLES, RoleCode } from "@/constants/roles"
import { useMemo } from "react"

export function useRoleGuard(path?: string, overrideRoles?: RoleCode[], roleCodeParams?: string) {
  const roleCode = useAuthStore((s) => s.roleCode)
  const pathname = usePathname()

  const targetPath = useMemo(() => {
    return path ?? pathname
  }, [path, pathname])

  const currentRoleCode = useMemo(() => {
    return roleCode ?? roleCodeParams;
  }, [roleCode, roleCodeParams])

  if (overrideRoles) {
    const isAuthorized = currentRoleCode ? overrideRoles.includes(currentRoleCode as RoleCode) : false
    return { isAuthorized, allowedRoles: overrideRoles }
  }

  const matched = Object.entries(PAGE_ROLES).find(([prefix]) => {
    if (targetPath === prefix) return true
    if (targetPath.startsWith(prefix + "/")) return true
    return false
  })

  if (!matched) {
    return { isAuthorized: true, allowedRoles: null }
  }

  const allowedRoles = matched[1]
  const isAuthorized = currentRoleCode ? allowedRoles.includes(currentRoleCode as RoleCode) : false

  return { isAuthorized, allowedRoles }
}
