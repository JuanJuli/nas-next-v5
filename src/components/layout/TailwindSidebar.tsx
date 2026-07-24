'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { convertAliasesToMenu } from '../ui/menuAlias';
import { ListMenu } from '@/types/accessRole';
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
  
  const key = `${item.row_id}`;
  const isActive = menuActive === key;
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openSubmenus.has(key);

  const handleClick = () => {
    console.log('Menu item clicked:', key);
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
    if (isActive) return `${colorPrimary}15`;
    if (isHovered) return `${colorPrimary}08`;
    return 'transparent';
  };

  const getTextColor = () => {
    if (isActive) return colorPrimary;
    if (isHovered) return colorPrimary;
    return '#4b5563'; // gray-600
  };

  const getIconColor = () => {
    if (isActive) return colorPrimary;
    if (isHovered) return colorPrimary;
    return '#9ca3af'; // gray-400
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
          borderRightColor: isActive ? colorPrimary : undefined,
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
                {item.name}
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
                {item.name}
              </Link>
            )
          ) : (
            <span className={textClass} style={{ color: getTextColor() }}>
              {item.name}
            </span>
          )}
        </div>
        {hasChildren && !collapsed && (
          <span
            className="transition-colors duration-200"
            style={{
              color: isActive || isHovered ? colorPrimary : '#9ca3af',
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
  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-50
        transition-all duration-300 ease-in-out
        shadow-[2px_0_8px_0_rgba(0,0,0,0.15)]
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        ${collapsed ? 'w-20' : 'w-[300px]'}
      `}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <img
          src={logo.src}
          alt="Logo"
          className={`
            transition-all duration-300
            ${collapsed ? 'h-8' : 'h-10'}
          `}
        />
      </div>

      {/* Menu Section */}
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
    </aside>
  );
}
