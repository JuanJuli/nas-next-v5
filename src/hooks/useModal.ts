"use client"

import { useEffect, useState } from "react"


export function useModalState() {
  const [data, setData] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<null | string | number>(null)

  const handleResetData = () => {
    setData(null);
  }

  useEffect(() => {
    if (!open && data) {
      handleResetData();
    }
  }, [open]);

  return { data, open, setOpen, setData, id, setId}
}
