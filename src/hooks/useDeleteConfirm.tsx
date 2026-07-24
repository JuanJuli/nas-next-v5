"use client"

import { DeleteFilled } from "@ant-design/icons"
import { useDelete } from "./useMutate"
import { modal, message } from "@/service/antdStatic"

interface UseDeleteConfirmOptions {
  invalidateQueries?: string[]
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
}

export function useDeleteConfirm(url: string, options?: UseDeleteConfirmOptions) {
  const { invalidateQueries, onSuccess, onError } = options || {}
  const deleteMutation = useDelete(url, { invalidateQueries })

  const confirmDelete = (id: string | number) => {
    modal.confirm({
      icon: null,
      content: (
        <div style={{ textAlign: "center" }} className="flex justify-center align-middle flex-col pt-5">
          <div className="p-4 rounded-full bg-red-100 self-center w-[30%]">
            <DeleteFilled style={{ color: "red", fontSize: 48 }} />
          </div>
          <h2 className="font-bold! mt-4">Hapus Data?</h2>
          <p style={{ marginTop: 16 }}>Setelah data dihapus maka informasi yang terkait dengan data ini akan hilang.?</p>
        </div>
      ),
      okText: "Ya",
      cancelText: "Tidak",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteMutation.mutateAsync({ url: `/${id}` })
          if (onSuccess) {
            onSuccess(undefined)
          }
        } catch (error) {
          message.error("Gagal menghapus data")
          if (onError) {
            onError(error)
          }
        }
      },
    })
  }

  return { confirmDelete }
}
