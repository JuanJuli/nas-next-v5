'use client';

import { Link } from '@/i18n/navigation'
import { Smile } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-background">
      <div className="text-center space-y-8">
        <div className="flex flex-col items-center gap-6">
          <Smile className="h-16 w-16 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            SELAMAT DATANG DI NUSANTARA APLIKASI SERTIFIKASI
          </h1>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Masuk ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
