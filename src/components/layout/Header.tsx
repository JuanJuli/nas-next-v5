'use client';

import { PanelLeftClose, PanelLeftOpen, Sun, Moon, Globe, LogOut, User } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useLogout } from '@/hooks/useLogout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { useTenant } from '../provider/TenantProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export default function Header({ collapsed, onCollapsedChange }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { logout } = useLogout();
  const dataLsp = useTenant();
  const user = useAuthStore((s) => s.user);
  const themeMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const isDark = themeMode === 'dark';

  const handleLogout = () => {
    logout();
  };

  const handleLangToggle = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    const paramsStr = searchParams.toString();
    const targetPath = paramsStr ? `${pathname}?${paramsStr}` : pathname;
    router.replace(targetPath, { locale: newLocale });
  };

  const initials = user?.full_name
    ? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 h-16 border-b-2 border-border bg-background shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange(!collapsed)}
        >
          {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>

        <Button variant="ghost" size="sm" onClick={handleLangToggle}>
          <Globe className="size-4 mr-1" />
          {locale === 'id' ? 'ID' : 'ENG'}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer pl-3 pr-1 py-1 rounded-md hover:bg-accent transition-colors">
            <Avatar size="default">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left max-w-[160px]">
              <span className="text-sm font-medium truncate">{user?.full_name || 'User Name'}</span>
              <span className="text-xs text-muted-foreground truncate">{dataLsp?.lsp_name || ''}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              <User className="size-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut className="size-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
