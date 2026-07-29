"use client"

import { useDelete } from "./useMutate"
import { toast } from "sonner"

interface UseDeleteConfirmOptions {
  invalidateQueries?: string[]
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
}

export function useDeleteConfirm(url: string, options?: UseDeleteConfirmOptions) {
  const { invalidateQueries, onSuccess, onError } = options || {}
  const deleteMutation = useDelete(url, { invalidateQueries })

  const confirmDelete = (id: string | number) => {
    const confirmed = window.confirm(
      "Hapus Data?\n\nSetelah data dihapus maka informasi yang terkait dengan data ini akan hilang."
    )
    if (!confirmed) return

    deleteMutation.mutateAsync({ url: `/${id}` })
      .then(() => {
        if (onSuccess) onSuccess(undefined)
      })
      .catch((error: unknown) => {
        toast.error("Gagal menghapus data")
        if (onError) onError(error)
      })
  }

  return { confirmDelete }
}
