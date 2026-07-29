'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <Frown className="h-16 w-16 text-muted-foreground mx-auto" />
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-lg text-muted-foreground">Sorry, the page you visited does not exist!</p>
        <Link href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}