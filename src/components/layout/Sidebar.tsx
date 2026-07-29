'use client';

import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useAccessRole } from '../provider/AccessRoleProvider';
import { useMemo, useState, useEffect } from 'react';
import { getItem } from '@/utils/menuItems';
import { convertAliasesToMenu } from '../ui/menuAlias';
import { MenuItem } from '@/types/menuItem';
import { ListMenu } from '@/types/accessRole';
import { usePathname, Link } from '@/i18n/navigation';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const accessRole = useAccessRole(); 

  const [menuActive, setMenuActive] = useState<string>('');

  const handleTrigger = (trigger: string) => {
    if (trigger === 'report-assessment') {
      // setOpenReport(true);
    }
  };

  const handleChangeMenu: MenuProps['onClick'] = (e) => {
    const { key } = e;
    if (key === menuActive) {
      return;
    }

    let redirect = true;

    if (accessRole?.list_menu && accessRole.list_menu.length > 0) {
      accessRole.list_menu.forEach(item => {
        if (`${item.row_id}` === key) {
          if (item.action_menu && item.action_menu === 'trigger') {
            redirect = false;
          } else {
            if (item.link === pathname) {
              setMenuActive(key);

              return;
            }
          }
        }

        if (item.children && Array.isArray(item.children)) {
          item.children.forEach((child: any) => {
            if (`${child.row_id}` === key) {
              if (child.action_menu && child.action_menu === 'trigger') {
                redirect = false;
              } else {
                if (child.link === pathname) {
                  setMenuActive(key);
                  return;
                }
              }
            }
          });
        }
      });
    }

    if (redirect) {
      setMenuActive(key);
    }
  }

  const handleRenderChildren = (items: ListMenu[]): MenuItem[] | undefined => {
    if (items.length === 0) return undefined;

    const resultMenu: MenuItem[] = [];

    items.forEach(item => {
      let label: React.ReactNode = item.name;
      if (!item.children && ((item.action_menu && item.action_menu === 'redirect') || !item.action_menu)) {
        label = (
          <Link prefetch href={item.link}>
            {item.name}
          </Link>
        );
      } else if (!item.children && item.action_menu && item.action_menu === 'trigger') {
        label = <div onClick={() => handleTrigger(item.link)}>{item.name}</div>;
      }
      resultMenu.push(
        getItem(label, item.row_id, item.name, convertAliasesToMenu(item.icon), handleRenderChildren(item.children ?? []))
      );
    });

    return resultMenu;
  };

  const menuItems = useMemo((): MenuProps['items'] => {
    if (!accessRole) return [];
    
    if (accessRole.list_menu.length > 0) {
      const menuItems = accessRole.list_menu.map(item => {
        let label: React.ReactNode = item.name;
        if ((!item.children || item.children.length === 0) && (!item.action_menu || (item.action_menu && item.action_menu === 'redirect'))) {
          label = (
            <Link prefetch href={item.link}>
              {item.name}
            </Link>
          );
        } else if ((!item.children || item.children.length === 0) && item.action_menu && item.action_menu === 'trigger') {
          label = <div onClick={() => handleTrigger(item.link)}>{item.name}</div>;
        }
        return getItem(
          label,
          item.row_id,
          item.name,
          convertAliasesToMenu(item.icon),
          handleRenderChildren(item.children ?? [])
        );
      });

      return menuItems;
    }

    return []
  }, [accessRole]);

  // Sync menuActive with pathname
  useEffect(() => {
    if (!accessRole?.list_menu || accessRole.list_menu.length === 0) return;

    // Helper function to find menu item by pathname
    const findMenuByPath = (items: ListMenu[], path: string): string | null => {
      for (const item of items) {
        // Check if current item matches
        if (item.link && path.startsWith(item.link)) {
          return `${item.row_id}`;
        }
        
        // Check children recursively
        if (item.children && item.children.length > 0) {
          const childMatch = findMenuByPath(item.children, path);
          if (childMatch) return childMatch;
        }
      }
      return null;
    };

    const activeKey = findMenuByPath(accessRole.list_menu, pathname);
    if (activeKey) {
      setMenuActive(activeKey);
    }
  }, [pathname, accessRole]);

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
        background: 'var(--primary)',
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
        onClick={handleChangeMenu}
      />
    </Sider>
  );
}
