'use client';

import { useAccessRole } from '../provider/AccessRoleProvider';
import { useMemo, useState, useEffect } from 'react';
import TailwindSidebar from './TailwindSidebar';
import { ListMenu } from '@/types/accessRole';
import { usePathname } from '@/i18n/navigation';

interface SidebarAlternativeProps {
  collapsed: boolean;
  variant?: 'antd' | 'tailwind';
}

export default function SidebarAlternative({
  collapsed,
}: SidebarAlternativeProps) {
  const pathname = usePathname();
  const accessRole = useAccessRole();

  const [menuActive, setMenuActive] = useState<string>('');
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const handleChangeMenu = (key: string) => {
    setMenuActive(key);
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

  const handleTrigger = (trigger: string) => {
    if (trigger === 'report-assessment') {
    }
  };

  useEffect(() => {
    if (!accessRole?.list_menu || accessRole.list_menu.length === 0) return;

    const findMenuByPath = (items: ListMenu[], path: string, parentKey?: string): { key: string | null; parentKeys: string[]; matchLength: number } => {
      let bestMatch: { key: string | null; parentKeys: string[]; matchLength: number } = {
        key: null,
        parentKeys: [],
        matchLength: 0
      };

      for (const item of items) {
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

      if (result.parentKeys.length > 0) {
        setOpenSubmenus(new Set(result.parentKeys));
      }
    } else if (!menuActive && accessRole.list_menu.length > 0) {
      setMenuActive(`${accessRole.list_menu[0].row_id}`);
    }
  }, [pathname, accessRole]);

  return (
    <TailwindSidebar
      collapsed={collapsed}
      menuActive={menuActive}
      openSubmenus={openSubmenus}
      listMenu={accessRole?.list_menu || []}
      colorPrimary={'var(--primary)'}
      onMenuChange={handleChangeMenu}
      onToggleSubmenu={toggleSubmenu}
      onTrigger={handleTrigger}
    />
  );
}
