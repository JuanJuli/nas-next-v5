'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { Settings, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const LOGIN_TYPES = [1, 2, 3];
const BUTTON_GAP = 56; // jarak antar tombol (px), sesuaikan dgn ukuran tombol + spacing

export default function FloatChangeLogin() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fixLoginType = useMemo(() => {
    let currLoginType = 1;
    const loginTypeParams = searchParams.get('loginType');
    if (loginTypeParams) {
      const parseLtp = parseInt(loginTypeParams);
      if (parseLtp > 0) {
        currLoginType = parseLtp;
      }
    }
    return currLoginType;
  }, [searchParams]);

  const options = useMemo(
    () => LOGIN_TYPES.filter((type) => type !== fixLoginType),
    [fixLoginType]
  );

  const handleClick = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('loginType', `${value}`);
    router.push(`${pathName}?${params.toString()}`);
    setOpen(false);
  };

  // Tutup saat klik di luar area komponen
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      <div className="relative h-12 w-12">
        {options.map((type, index) => (
          <button
            key={type}
            type="button"
            onClick={() => handleClick(type)}
            aria-label={`Switch to login type ${type}`}
            className={cn(
              'absolute inset-x-0 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-sm font-medium shadow-md transition-all duration-200 ease-out hover:bg-accent hover:text-accent-foreground'
            )}
            style={{
              // negatif = ke atas dari tombol utama
              bottom: open ? `${(index + 1) * BUTTON_GAP}px` : 0,
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${index * 40}ms` : '0ms',
              pointerEvents: open ? 'auto' : 'none',
            }}
          >
            {type}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Change login type'}
          className="absolute inset-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}