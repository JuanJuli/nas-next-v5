"use client"

import { usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useHistoryStore } from "@/store/history"
import { navMode } from "@/helper/navMode"

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  const search = searchParams.toString()

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const { stack } = useHistoryStore.getState()
      if (stack.length === 0) {
        useHistoryStore.getState().push({ pathname, search })
      }
      return
    }

    if (navMode.current) {
      navMode.current = null
      return
    }

    const { stack } = useHistoryStore.getState()
    const prev = stack.length >= 2 ? stack[stack.length - 2] : null
    if (prev && prev.pathname === pathname && prev.search === search) {
      useHistoryStore.getState().pop()
    } else {
      useHistoryStore.getState().push({ pathname, search })
    }
  }, [pathname, search])

  return children
}
