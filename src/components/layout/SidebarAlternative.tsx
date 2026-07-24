'use client';

import type { MenuProps } from 'antd';
import { theme } from 'antd';
import { useAccessRole } from '../provider/AccessRoleProvider';
import { useMemo, useState, useEffect } from 'react';
import { getItem } from '@/utils/menuItems';
import { convertAliasesToMenu } from '../ui/menuAlias';
import { MenuItem } from '@/types/menuItem';
import { ListMenu } from '@/types/accessRole';
import TailwindSidebar from './TailwindSidebar';
import AntdSidebar from './AntdSidebar';
import { usePathname, Link } from '@/i18n/navigation';

const { useToken } = theme;

interface SidebarAlternativeProps {
  collapsed: boolean;
  variant?: 'antd' | 'tailwind';
}

export default function SidebarAlternative({ 
  collapsed, 
  variant = 'tailwind' 
}: SidebarAlternativeProps) {
  const pathname = usePathname();
  const { token } = useToken();
  const accessRole = useAccessRole();

  const [menuActive, setMenuActive] = useState<string>('');
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const handleTrigger = (trigger: string) => {
    if (trigger === 'report-assessment') {
      // setOpenReport(true);
    }
  };

  const handleChangeMenu = (key: string) => {
    console.log('Menu item clicked:', key);
    setMenuActive(key);
  };

  const handleAntdMenuClick: MenuProps['onClick'] = (e) => {
    handleChangeMenu(e.key);
  };

  const toggleSubmenu = (key: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(key)) {
      newOpenSubmenus.delete(key);
    } else {
      newOpenSubmenus.add(key);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const handleRenderChildren = (items: ListMenu[]): MenuItem[] | undefined => {
    if (items.length === 0) return undefined;

    const resultMenu: MenuItem[] = [];

    items.forEach(item => {
      let label: React.ReactNode = item.name;
      if (!item.children && ((item.action_menu && item.action_menu === 'redirect') || !item.action_menu)) {
        label = (
          <Link prefetch href={item.link} onClick={() => handleChangeMenu(`${item.row_id}`)}>
            {item.name}
          </Link>
        );
      } else if (!item.children && item.action_menu && item.action_menu === 'trigger') {
        label = (
          <div onClick={() => {
            handleChangeMenu(`${item.row_id}`);
            handleTrigger(item.link);
          }}>
            {item.name}
          </div>
        );
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
            <Link prefetch href={item.link} onClick={() => handleChangeMenu(`${item.row_id}`)}>
              {item.name}
            </Link>
          );
        } else if ((!item.children || item.children.length === 0) && item.action_menu && item.action_menu === 'trigger') {
          label = (
            <div onClick={() => {
              handleChangeMenu(`${item.row_id}`);
              handleTrigger(item.link);
            }}>
              {item.name}
            </div>
          );
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

    return [];
  }, [accessRole]);

  // Sync menuActive with pathname and auto-expand parent submenus
  useEffect(() => {
    if (!accessRole?.list_menu || accessRole.list_menu.length === 0) return;

    // Find menu by pathname using longest match algorithm
    const findMenuByPath = (items: ListMenu[], path: string, parentKey?: string): { key: string | null; parentKeys: string[]; matchLength: number } => {
      let bestMatch: { key: string | null; parentKeys: string[]; matchLength: number } = { 
        key: null, 
        parentKeys: [], 
        matchLength: 0 
      };

      for (const item of items) {
        // Check current item
        if (item.link && path.startsWith(item.link)) {
          const matchLength = item.link.length;
          if (matchLength > bestMatch.matchLength) {
            bestMatch = {
              key: `${item.row_id}`,
              parentKeys: parentKey ? [parentKey] : [],
              matchLength
            };
          }
        }
        
        // Check children recursively
        if (item.children && item.children.length > 0) {
          const childMatch = findMenuByPath(item.children, path, `${item.row_id}`);
          if (childMatch.key && childMatch.matchLength > bestMatch.matchLength) {
            bestMatch = {
              key: childMatch.key,
              parentKeys: parentKey ? [parentKey, ...childMatch.parentKeys] : childMatch.parentKeys,
              matchLength: childMatch.matchLength
            };
          }
        }
      }

      return bestMatch;
    };

    const result = findMenuByPath(accessRole.list_menu, pathname);
    if (result.key) {
      setMenuActive(result.key);
      
      // Auto-expand parent submenus
      if (result.parentKeys.length > 0) {
        setOpenSubmenus(new Set(result.parentKeys));
      }
    } else if (!menuActive && accessRole.list_menu.length > 0) {
      // Set first menu as default if no match found and no active menu
      setMenuActive(`${accessRole.list_menu[0].row_id}`);
    }
  }, [pathname, accessRole]);

  return variant === 'tailwind' ? (
    <TailwindSidebar
      collapsed={collapsed}
      menuActive={menuActive}
      openSubmenus={openSubmenus}
      listMenu={accessRole?.list_menu || []}
      colorPrimary={token.colorPrimary}
      onMenuChange={handleChangeMenu}
      onToggleSubmenu={toggleSubmenu}
      onTrigger={handleTrigger}
    />
  ) : (
    <AntdSidebar
      collapsed={collapsed}
      menuActive={menuActive}
      menuItems={menuItems}
      colorPrimary={token.colorPrimary}
      onMenuClick={handleAntdMenuClick}
    />
  );
}
