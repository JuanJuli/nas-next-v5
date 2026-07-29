"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <ShieldX className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-6xl font-bold text-foreground">403</h1>
        <p className="text-lg text-muted-foreground">Maaf, Anda tidak memiliki akses ke halaman ini.</p>
        <Link href="/dashboard">
          <Button variant="default">Kembali ke Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
