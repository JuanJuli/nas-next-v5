"use client"

import { useRouter } from "@/i18n/navigation"
import { useHistoryStore } from "@/store/history"
import { navMode } from "@/helper/navMode"
import { useCallback } from "react"

function parseHref(href: string, currentPathname: string) {
  if (href.startsWith("?")) {
    return { pathname: currentPathname, search: href.slice(1) }
  }

  const qIndex = href.indexOf("?")
  if (qIndex === -1) {
    return { pathname: href, search: "" }
  }

  return {
    pathname: href.slice(0, qIndex),
    search: href.slice(qIndex + 1),
  }
}

function buildUrl(entry: { pathname: string; search: string }) {
  return entry.search ? `${entry.pathname}?${entry.search}` : entry.pathname
}

export function useHistoryRouter() {
  const router = useRouter()
  const pushEntry = useHistoryStore((s) => s.push)
  const replaceTop = useHistoryStore((s) => s.replaceTop)
  const pop = useHistoryStore((s) => s.pop)
  const getHardBackTarget = useHistoryStore((s) => s.getHardBackTarget)
  const trimTo = useHistoryStore((s) => s.trimTo)

  const push = useCallback(
    (href: string) => {
      const currentPathname = window.location.pathname
      const entry = parseHref(href, currentPathname)
      pushEntry(entry)
      navMode.current = "push"
      router.push(href)
    },
    [pushEntry, router]
  )

  const replace = useCallback(
    (href: string) => {
      const currentPathname = window.location.pathname
      const entry = parseHref(href, currentPathname)
      replaceTop(entry)
      navMode.current = "replace"
      router.replace(href)
    },
    [replaceTop, router]
  )

  const back = useCallback(() => {
    const target = pop()
    if (!target) {
      navMode.current = "back"
      router.push("/dashboard")
      return
    }
    navMode.current = "back"
    router.push(buildUrl(target))
  }, [pop, router])

  const hardBack = useCallback(() => {
    const currentBasePath = window.location.pathname
    const target = getHardBackTarget(currentBasePath)
    if (!target) {
      navMode.current = "hardBack"
      router.push("/dashboard")
      return
    }
    trimTo(target.index)
    navMode.current = "hardBack"
    router.push(buildUrl(target.entry))
  }, [getHardBackTarget, trimTo, router])

  return { ...router, push, replace, back, hardBack }
}
