"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { parseParams, buildQueryString, IDefaultPagination } from "@/helper/urlQuery"
import { useRouter } from "@/i18n/navigation"

export const useTableUrlState = (defaultPagination?: IDefaultPagination) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const params = useMemo(() => {
    return parseParams(searchParams, defaultPagination)
  }, [searchParams, defaultPagination])

  const setParams = (newParams: any) => {
    const merged = { ...params, ...newParams }

    const queryString = buildQueryString(merged)

    router.push(`?${queryString}`)
  }

  return {
    params,
    setParams,
  }
}