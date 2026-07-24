"use client"

import Link from "next/link"
import { Button, Result } from "antd"

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Result
        status="403"
        title="403"
        subTitle="Maaf, Anda tidak memiliki akses ke halaman ini."
        extra={
          <Link href="/dashboard">
            <Button type="primary">Kembali ke Dashboard</Button>
          </Link>
        }
      />
    </div>
  )
}
