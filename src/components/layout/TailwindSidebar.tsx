'use client';

import { useState, useEffect } from 'react';
import { usePathname, Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { getMenuLabel } from '@/i18n/menuLabels';
import { convertAliasesToMenu } from '../ui/menuAlias';
import { ListMenu } from '@/types/accessRole';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import logo from '../../../public/logo/nas-small.png';

interface TailwindSidebarProps {
  collapsed: boolean;
  menuActive: string;
  openSubmenus: Set<string>;
  listMenu: ListMenu[];
  colorPrimary: string;
  onMenuChange: (key: string) => void;
  onToggleSubmenu: (key: string) => void;
  onTrigger: (trigger: string) => void;
}

interface MenuItemProps {
  item: ListMenu;
  depth: number;
  collapsed: boolean;
  menuActive: string;
  openSubmenus: Set<string>;
  colorPrimary: string;
  onMenuChange: (key: string) => void;
  onToggleSubmenu: (key: string) => void;
  onTrigger: (trigger: string) => void;
}

function MenuItem({
  item,
  depth,
  collapsed,
  menuActive,
  openSubmenus,
  colorPrimary,
  onMenuChange,
  onToggleSubmenu,
  onTrigger,
}: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();

  const key = `${item.row_id}`;
  const isActive = menuActive === key;
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openSubmenus.has(key);

  const handleClick = () => {
    if (hasChildren) {
      onToggleSubmenu(key);
    } else {
      onMenuChange(key);
    }
  };

  const menuItemClass = `
    flex items-center justify-between px-4 py-3 cursor-pointer
    transition-all duration-200 ease-in-out rounded-lg mx-2
    ${isActive ? 'border-r-4 font-semibold' : ''}
    ${collapsed && depth === 0 ? 'justify-center' : ''}
  `;

  const iconClass = `
    ${collapsed && depth === 0 ? '' : 'mr-3'}
    transition-colors duration-200
  `;

  const textClass = `
    flex-1 text-base
    ${isActive ? 'font-semibold' : ''}
    ${collapsed && depth === 0 ? 'hidden' : 'block'}
    transition-colors duration-200
  `;

  const getBackgroundColor = () => {
    if (isActive) return 'color-mix(in srgb, var(--primary) 8%, transparent)';
    if (isHovered) return 'color-mix(in srgb, var(--primary) 3%, transparent)';
    return 'transparent';
  };

  const getTextColor = () => {
    if (isActive) return 'var(--primary)';
    if (isHovered) return 'var(--primary)';
    return '#4b5563';
  };

  const getIconColor = () => {
    if (isActive) return 'var(--primary)';
    if (isHovered) return 'var(--primary)';
    return '#9ca3af';
  };

  return (
    <div>
      <div
        className={menuItemClass}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          paddingLeft: collapsed ? '16px' : `${16 + depth * 20}px`,
          backgroundColor: getBackgroundColor(),
          borderRightColor: isActive ? 'var(--primary)' : undefined,
        }}
      >
        <div className="flex items-center flex-1">
          {item.icon && (
            <span className={iconClass} style={{ color: getIconColor() }}>
              {convertAliasesToMenu(item.icon)}
            </span>
          )}
          {!item.children || item.children.length === 0 ? (
            item.action_menu === 'trigger' ? (
              <span
                className={textClass}
                style={{ color: getTextColor() }}
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuChange(key);
                  onTrigger(item.link);
                }}
              >
                {getMenuLabel(item.name, locale)}
              </span>
            ) : (
              <Link
                href={item.link}
                className={textClass}
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuChange(key);
                }}
                style={{ color: getTextColor() }}
              >
                {getMenuLabel(item.name, locale)}
              </Link>
            )
          ) : (
            <span className={textClass} style={{ color: getTextColor() }}>
              {getMenuLabel(item.name, locale)}
            </span>
          )}
        </div>
        {hasChildren && !collapsed && (
          <span
            className="transition-colors duration-200"
            style={{
              color: isActive || isHovered ? 'var(--primary)' : '#9ca3af',
            }}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
      {hasChildren && isOpen && !collapsed && (
        <div className="bg-gray-50 dark:bg-gray-800/50">
          {item.children!.map((child) => (
            <MenuItem
              key={child.row_id}
              item={child}
              depth={depth + 1}
              collapsed={collapsed}
              menuActive={menuActive}
              openSubmenus={openSubmenus}
              colorPrimary={colorPrimary}
              onMenuChange={onMenuChange}
              onToggleSubmenu={onToggleSubmenu}
              onTrigger={onTrigger}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  collapsed,
  menuActive,
  openSubmenus,
  listMenu,
  colorPrimary,
  onMenuChange,
  onToggleSubmenu,
  onTrigger,
}: TailwindSidebarProps) {
  return (
    <>
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <img
          src={logo.src}
          alt="Logo"
          className={`transition-all duration-300 ${collapsed ? 'h-8' : 'h-10'}`}
        />
      </div>
      <nav className="overflow-y-auto h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {listMenu?.map((item) => (
          <MenuItem
            key={item.row_id}
            item={item}
            depth={0}
            collapsed={collapsed}
            menuActive={menuActive}
            openSubmenus={openSubmenus}
            colorPrimary={colorPrimary}
            onMenuChange={onMenuChange}
            onToggleSubmenu={onToggleSubmenu}
            onTrigger={onTrigger}
          />
        ))}
      </nav>
    </>
  );
}

export default function TailwindSidebar({
  collapsed,
  menuActive,
  openSubmenus,
  listMenu,
  colorPrimary,
  onMenuChange,
  onToggleSubmenu,
  onTrigger,
}: TailwindSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center size-10 rounded-md bg-background border border-border shadow-sm"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <aside
        className={`
          hidden lg:flex flex-col h-screen
          transition-all duration-300 ease-in-out
          shadow-[2px_0_8px_0_rgba(0,0,0,0.15)]
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          ${collapsed ? 'w-20' : 'w-[300px]'}
        `}
      >
        <SidebarContent
          collapsed={collapsed}
          menuActive={menuActive}
          openSubmenus={openSubmenus}
          listMenu={listMenu}
          colorPrimary={colorPrimary}
          onMenuChange={onMenuChange}
          onToggleSubmenu={onToggleSubmenu}
          onTrigger={onTrigger}
        />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[300px] p-0 bg-white dark:bg-gray-900">
          <SidebarContent
            collapsed={false}
            menuActive={menuActive}
            openSubmenus={openSubmenus}
            listMenu={listMenu}
            colorPrimary={colorPrimary}
            onMenuChange={onMenuChange}
            onToggleSubmenu={onToggleSubmenu}
            onTrigger={onTrigger}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
