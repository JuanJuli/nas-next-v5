import { MenuItem } from "@/types/menuItem";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  title?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    title,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
