'use client';

import { Layout, Dropdown, Avatar, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import { theme } from 'antd';
import type { MenuProps } from 'antd';
import { useLogout } from '@/hooks/useLogout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { useTenant } from '../provider/TenantProvider';

const { Header: AntHeader } = Layout;
const { useToken } = theme;

interface HeaderProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export default function Header({ collapsed, onCollapsedChange }: HeaderProps) {
  const router = useRouter();
  const { token } = useToken();
  const { logout } = useLogout();
  const dataLsp = useTenant();
  const user = useAuthStore((s) => s.user);
  const themeMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const handleLogout = () => {
    logout();
  };

  const isDark = themeMode === 'dark';

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'theme-toggle',
      icon: isDark ? <MoonOutlined /> : <SunOutlined />,
      label: isDark ? 'Light Mode' : 'Dark Mode',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      handleLogout();
    } else if (key === 'profile') {
      router.push('/dashboard/profile');
    } else if (key === 'theme-toggle') {
      toggleTheme();
    }
  };

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined style={{ color: token.colorPrimary }} /> : <MenuFoldOutlined style={{ color: token.colorPrimary }} />}
        onClick={() => onCollapsedChange(!collapsed)}
        size="large"
        style={{ color: token.colorText }}
      />

      <Dropdown menu={{ items: menuItems, onClick: (e) => handleMenuClick(e.key) }} className='max-h-[64px]'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: token.colorText }}>
          <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#f0f0f0' }} />
          <div className='flex flex-col max-h-[64px] p-0 m-0' style={{ lineHeight: 1.2}}>
            <span>{user?.full_name || 'User Name'}</span>
            <small className='text-[8px]' style={{ color: token.colorPrimary }}>{dataLsp?.lsp_name || 'LSP Name'}</small>
          </div>
        </div>
      </Dropdown>
    </AntHeader>
  );
}
