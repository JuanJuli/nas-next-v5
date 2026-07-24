import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export interface IMenuItems {
  id: string;
  link: string;
  icon?: string;
  title: string;
  action?: boolean;
  children?: IMenuItems[];
  action_menu?: string;
}
