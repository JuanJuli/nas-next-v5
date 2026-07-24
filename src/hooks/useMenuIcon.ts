import { useMemo } from 'react';
import { menuAliases, type IMenuAliases, convertAliasesToMenu } from '@/components/ui/menuAlias';
import { useAccessRole } from '@/components/provider/AccessRoleProvider';
import type { ListMenu } from '@/types/accessRole';

/**
 * Hook untuk mendapatkan icon berdasarkan alias name
 * 
 * @param aliasName - Nama alias icon (contoh: 'dashboard', 'user', 'calendar')
 * @returns React.ReactNode icon atau undefined jika tidak ditemukan
 * 
 * @example
 * ```tsx
 * const icon = useMenuIcon('dashboard');
 * return <span>{icon}</span>;
 * ```
 */
export function useMenuIcon(aliasName?: string): React.ReactNode {
  const icon = useMemo(() => {
    if (!aliasName) return undefined;
    return menuAliases[aliasName];
  }, [aliasName]);

  return icon;
}

/**
 * Hook untuk mendapatkan multiple icons berdasarkan array alias names
 * 
 * @param aliasNames - Array nama alias icons
 * @returns Array of React.ReactNode icons
 * 
 * @example
 * ```tsx
 * const icons = useMenuIcons(['dashboard', 'user', 'calendar']);
 * return icons.map((icon, i) => <span key={i}>{icon}</span>);
 * ```
 */
export function useMenuIcons(aliasNames: string[]): React.ReactNode[] {
  const icons = useMemo(() => {
    return aliasNames.map(alias => menuAliases[alias] || null);
  }, [aliasNames]);

  return icons;
}

/**
 * Hook untuk mendapatkan semua available icon aliases
 * 
 * @returns Object berisi semua icon aliases
 * 
 * @example
 * ```tsx
 * const allIcons = useAllMenuIcons();
 * Object.keys(allIcons).map(key => (
 *   <div key={key}>{allIcons[key]}</div>
 * ));
 * ```
 */
export function useAllMenuIcons(): IMenuAliases {
  return useMemo(() => menuAliases, []);
}

/**
 * Hook untuk check apakah alias icon exists
 * 
 * @param aliasName - Nama alias icon
 * @returns boolean true jika icon exists
 * 
 * @example
 * ```tsx
 * const hasIcon = useHasMenuIcon('dashboard');
 * if (hasIcon) {
 *   // render icon
 * }
 * ```
 */
export function useHasMenuIcon(aliasName?: string): boolean {
  return useMemo(() => {
    if (!aliasName) return false;
    return aliasName in menuAliases;
  }, [aliasName]);
}

/**
 * Hook untuk mendapatkan icon dari menu structure berdasarkan pathname
 * Mencari menu item yang match dengan pathname dan return icon-nya
 * 
 * @param pathname - Path URL (contoh: '/dashboard', '/users/list')
 * @returns React.ReactNode icon atau undefined jika tidak ditemukan
 * 
 * @example
 * ```tsx
 * const pathname = usePathname();
 * const icon = useMenuIconByPath(pathname);
 * return <span>{icon}</span>;
 * ```
 */
export function useMenuIconByPath(pathname: string): React.ReactNode {
  const accessRole = useAccessRole();

  const icon = useMemo(() => {
    if (!accessRole?.list_menu || accessRole.list_menu.length === 0) {
      return undefined;
    }

    // Find menu by pathname using longest match algorithm
    const findIconByPath = (items: ListMenu[], path: string): { icon: string | undefined; matchLength: number } => {
      let bestMatch: { icon: string | undefined; matchLength: number } = {
        icon: undefined,
        matchLength: 0,
      };

      for (const item of items) {
        // Check current item
        if (item.link && path.startsWith(item.link)) {
          const matchLength = item.link.length;
          if (matchLength > bestMatch.matchLength) {
            bestMatch = {
              icon: item.icon,
              matchLength,
            };
          }
        }

        // Check children recursively
        if (item.children && item.children.length > 0) {
          const childMatch = findIconByPath(item.children, path);
          if (childMatch.icon && childMatch.matchLength > bestMatch.matchLength) {
            bestMatch = childMatch;
          }
        }
      }

      return bestMatch;
    };

    const result = findIconByPath(accessRole.list_menu, pathname);
    return result.icon ? convertAliasesToMenu(result.icon) : undefined;
  }, [pathname, accessRole]);

  return icon;
}
