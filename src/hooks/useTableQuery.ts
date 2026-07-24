import { useQuery } from "@tanstack/react-query"
import qs from "query-string"
import { BASE_API_URL } from "@/utils/config"
import { useAuthStore } from "@/store/auth";
import { useMemo } from "react";
import { useDebounce } from "./useDebounce";

export const useTableQuery = (url: string, params: any, additionalParams?: any, enabled?: boolean) => {
  const token = useAuthStore((s) => s.token);
  // Merge additional params dengan main params  
  const query = useMemo(() => {
    const mergedParams = {
      ...params,
      ...additionalParams,
    }

    return qs.stringify(mergedParams)
  }, [params, additionalParams])

  const debounceQuery = useDebounce(query, 500)

  return useQuery({
    queryKey: ["table", url, debounceQuery, token],
    queryFn: async () => {
      const res = await fetch(`${BASE_API_URL}${url}?${debounceQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    },
    enabled: !!token && (enabled ?? true),
  })
}