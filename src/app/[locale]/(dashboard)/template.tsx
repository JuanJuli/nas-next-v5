'use client';

import SidebarAlternative from '@/components/layout/SidebarAlternative';
import Header from '@/components/layout/Header';
import HistoryProvider from '@/components/provider/HistoryProvider';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const useAlternative = true;
  const variant: 'antd' | 'tailwind' = 'tailwind';

  const showSidebar = useAlternative && variant === 'tailwind'

  return (
    <div className="min-h-screen">
      <div
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          showSidebar
            ? collapsed
              ? 'w-20'
              : 'w-[300px]'
            : 'w-0 overflow-hidden'
        }`}
      >
        {showSidebar && (
          <SidebarAlternative collapsed={collapsed} variant={variant} />
        )}
      </div>
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          showSidebar
            ? collapsed
              ? 'ml-20'
              : 'ml-[300px]'
            : 'ml-0'
        }`}
      >
        <Header collapsed={collapsed} onCollapsedChange={setCollapsed} />
        <main className="flex-1 bg-muted/30 overflow-y-auto overflow-x-auto min-h-0">
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </main>
      </div>
    </div>
  );
}
