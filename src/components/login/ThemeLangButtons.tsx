'use client';

import { Button, Space } from 'antd';
import { Globe, Moon, Sun } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useThemeStore } from '@/store/theme';

export default function ThemeLangButtons() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const isDark = themeMode === 'dark';

  const handleLangToggle = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    const paramsStr = searchParams.toString();
    const targetPath = paramsStr ? `${pathname}?${paramsStr}` : pathname;
    router.replace(targetPath, { locale: newLocale });
  };

  return (
    <Space size="small">
      <Button
        type="text"
        size="small"
        icon={isDark ? <Moon /> : <Sun />}
        onClick={toggleTheme}
      />
      <Button
        type="text"
        size="small"
        icon={<Globe />}
        onClick={handleLangToggle}
      >
        {locale === 'id' ? 'ID' : 'ENG'}
      </Button>
    </Space>
  );
}
