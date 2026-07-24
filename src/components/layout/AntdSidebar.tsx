'use client';

import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

interface AntdSidebarProps {
  collapsed: boolean;
  menuActive: string;
  menuItems: MenuProps['items'];
  colorPrimary: string;
  onMenuClick: MenuProps['onClick'];
}

export default function AntdSidebar({
  collapsed,
  menuActive,
  menuItems,
  colorPrimary,
  onMenuClick,
}: AntdSidebarProps) {
  const menuStyles: React.CSSProperties & Record<string, any> = {
    borderRight: 'none',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '16px',
    '& .antMenuItem': {
      color: '#ffffff',
    },
    '& .antMenuSubmenuTitle': {
      color: '#ffffff',
    },
  };

  return (
    <Sider
      theme="dark"
      collapsed={collapsed}
      collapsible
      width={300}
      style={{
        background: colorPrimary,
        boxShadow: '2px 0 8px 0 rgba(0, 0, 0, 0.15)',
      }}
      trigger={null}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '64px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            height: collapsed ? '32px' : '40px',
            width: 'auto',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={menuActive ? [menuActive] : []}
        items={menuItems}
        style={menuStyles}
        theme="dark"
        className="custom-sidebar-menu"
        onClick={onMenuClick}
      />
    </Sider>
  );
}
