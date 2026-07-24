"use client"

import { useAuthStore } from "@/store/auth"
import { usePathname } from "@/i18n/navigation"
import { PAGE_ROLES, RoleCode } from "@/constants/roles"

export function useRoleGuard(path?: string, overrideRoles?: RoleCode[]) {
  const roleCode = useAuthStore((s) => s.roleCode)
  const pathname = usePathname()
  const targetPath = path ?? pathname

  if (overrideRoles) {
    const isAuthorized = roleCode ? overrideRoles.includes(roleCode as RoleCode) : false
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
  const isAuthorized = roleCode ? allowedRoles.includes(roleCode as RoleCode) : false

  return { isAuthorized, allowedRoles }
}
