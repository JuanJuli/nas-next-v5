import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_API_URL } from "@/utils/config"
import { useAuthStore } from "@/store/auth"

interface MutateOptions {
  method?: "POST" | "PUT" | "PATCH" | "DELETE" | "GET"
  headers?: Record<string, string>
  invalidateQueries?: string[]
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export const useMutate = (url: string, options?: MutateOptions) => {
  const token = useAuthStore((s) => s.token)
  const queryClient = useQueryClient()

  const {
    method = "POST",
    headers: customHeaders,
    invalidateQueries,
    onSuccess,
    onError,
  } = options || {}

  return useMutation({
    mutationFn: async (data: any) => {
      const isFormData = data instanceof FormData

      const defaultHeaders: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      }

      // Jika bukan FormData, tambahkan Content-Type JSON
      if (!isFormData) {
        defaultHeaders["Content-Type"] = "application/json"
      }

      const mergedHeaders = {
        ...defaultHeaders,
        ...customHeaders,
      }

      let bodyData = data
      // check if data is DataWithId
      if (data && typeof data === "object" && "url" in data) {
        url = `${url}${data.url}`
        bodyData = data.data
      }

      let urlSet = `${BASE_API_URL}${url}`;
      if (method === "GET" && data) {
        urlSet += `${data}`
      }

      const res = await fetch(urlSet, {
        method,
        headers: mergedHeaders,
        body: method === "GET" ? undefined : isFormData ? data : JSON.stringify(bodyData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw error
      }

      return res.json()
    },
    onSuccess: (data) => {
      // Invalidate queries jika ada
      if (invalidateQueries && invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      }

      // Call custom onSuccess callback
      if (onSuccess) {
        onSuccess(data)
      }
    },
    onError: (error) => {
      // Call custom onError callback
      if (onError) {
        onError(error)
      }
    },
  })
}

// Hook khusus untuk POST
export const usePost = (url: string, options?: Omit<MutateOptions, "method">) => {
  return useMutate(url, { ...options, method: "POST" })
}

export const usePostGet = (url: string, options?: Omit<MutateOptions, "method">) => {
    return useMutate(url, { ...options, method: "GET" })
}

// Hook khusus untuk PUT
export const usePut = (url: string, options?: Omit<MutateOptions, "method">) => {
  return useMutate(url, { ...options, method: "PUT" })
}

// Hook khusus untuk PATCH
export const usePatch = (url: string, options?: Omit<MutateOptions, "method">) => {
  return useMutate(url, { ...options, method: "PATCH" })
}

// Hook khusus untuk DELETE
export const useDelete = (url: string, options?: Omit<MutateOptions, "method">) => {
  return useMutate(url, { ...options, method: "DELETE" })
}
