'use client';

import { Layout, theme } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import SidebarAlternative from '@/components/layout/SidebarAlternative';
import Header from '@/components/layout/Header';
import HistoryProvider from '@/components/provider/HistoryProvider';
import { useState } from 'react';

const { Content } = Layout;
const { useToken } = theme;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState(false);
  
  // Konfigurasi sidebar:
  // - useAlternative: true = menggunakan SidebarAlternative, false = menggunakan Sidebar original
  // - variant: 'tailwind' = styling Tailwind CSS, 'antd' = menggunakan Antd component
  const useAlternative = true;
  const variant: 'antd' | 'tailwind' = 'tailwind';

  // Untuk tailwind variant, perlu margin karena menggunakan fixed positioning
  const needsMargin = useAlternative && variant === 'tailwind';
  const marginLeft = needsMargin ? (collapsed ? '80px' : '300px') : '0';

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      {useAlternative ? (
        <SidebarAlternative collapsed={collapsed} variant={variant} />
      ) : (
        <Sidebar collapsed={collapsed} />
      )}
      <Layout style={{ marginLeft, transition: 'margin-left 0.3s ease-in-out' }}>
        <Header collapsed={collapsed} onCollapsedChange={setCollapsed} />
        <Content style={{ background: token.colorBgContainer }}>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </Content>
      </Layout>
    </Layout>
  );
}
