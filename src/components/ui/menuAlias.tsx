import {
  Home,
  User,
  Calendar,
  Menu,
  Settings,
  Users,
  Folder,
  FileText,
  Mail,
  History,
  Code,
  Upload,
  Download,
  MapPinHouse,
  UserPen,
  FileClock,
  UserRoundKey,
  UserRoundCheck,
  FilePenLine,
  Building,
  Building2,
  CircleStar,
  SwatchBook,
  ChartNetwork,
  FilesIcon,
  FolderClosed,
  Mails,
} from 'lucide-react';
import { PortFolioIcon } from './icons';

export interface IMenuAliases {
  [key: string]: React.ReactNode;
}

const ICON_SIZE = 16;

export const menuAliases: IMenuAliases = {
  dashboard: <Home size={ICON_SIZE} />,
  user: <User size={ICON_SIZE} />,
  calendar: <Calendar size={ICON_SIZE} />,
  menu: <Menu size={ICON_SIZE} />,
  schedule: <Calendar size={ICON_SIZE} />,
  setting: <Settings size={ICON_SIZE} />,
  team: <Users size={ICON_SIZE} />,
  role: <UserRoundKey size={ICON_SIZE} />,
  lsp: <Building2 size={ICON_SIZE} />,
  building: <Building size={ICON_SIZE} />,
  locate_building: <MapPinHouse size={ICON_SIZE} />,
  start: <CircleStar size={ICON_SIZE} />,
  schema: <SwatchBook size={ICON_SIZE} />,
  diagram: <ChartNetwork size={ICON_SIZE} />,
  files: <FilesIcon size={ICON_SIZE} />,
  scheme: <SwatchBook size={ICON_SIZE} />,
  file_history: <FileClock size={ICON_SIZE} />,
  survey: <FilePenLine size={ICON_SIZE} />,
  user_check: <UserRoundCheck size={ICON_SIZE} />,
  user_pencil: <UserPen size={ICON_SIZE} />,
  code: <Code size={ICON_SIZE} />,
  letter_category: <Mails size={ICON_SIZE} />,
  folder_cat: <FolderClosed size={ICON_SIZE} />,
  portfolio: <PortFolioIcon size={ICON_SIZE} />,
  history: <History size={ICON_SIZE} />,
  folder: <Folder size={ICON_SIZE} />,
  fileText: <FileText size={ICON_SIZE} />,
  group: <Users size={ICON_SIZE} />,
  mail: <Mail size={ICON_SIZE} />,
  file_upload: <Upload size={ICON_SIZE} />,
  file_download: <Download size={ICON_SIZE} />,
};

export function convertAliasesToMenu(menu?: string): React.ReactNode {
  return menuAliases[menu ?? ''];
}
