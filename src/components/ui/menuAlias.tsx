import {
  CalendarOutlined,
  CodeOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  FolderOutlined,
  FileTextOutlined,
  MailOutlined,
  FormOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { MapPinHouse, UserPen, FileClock, UserRoundKey, UserRoundCheck, FilePenLine, Building, Building2, CircleStar, SwatchBook, ChartNetwork, FilesIcon, Users, FolderClosed, Mails } from 'lucide-react';
import { PortFolioIcon } from './icons';

export interface IMenuAliases {
  [key: string]: React.ReactNode;
}

const ICON_SIZE = 16;

export const menuAliases: IMenuAliases = {
  dashboard: <HomeOutlined style={{ fontSize: ICON_SIZE }} />,
  user: <UserOutlined style={{ fontSize: ICON_SIZE }} />,
  calendar: <CalendarOutlined style={{ fontSize: ICON_SIZE }} />,
  menu: <MenuOutlined style={{ fontSize: ICON_SIZE }} />,
  schedule: <ScheduleOutlined style={{ fontSize: ICON_SIZE }} />,
  setting: <SettingOutlined style={{ fontSize: ICON_SIZE }} />,
  team: <TeamOutlined style={{ fontSize: ICON_SIZE }} />,
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
  code: <CodeOutlined style={{ fontSize: ICON_SIZE }} />,
  letter_category: <Mails size={ICON_SIZE} />,
  folder_cat: <FolderClosed size={ICON_SIZE} />,
  portfolio: <PortFolioIcon size={ICON_SIZE} />,
  history: <HistoryOutlined style={{ fontSize: ICON_SIZE }} />,
  folder: <FolderOutlined style={{ fontSize: ICON_SIZE }} />,
  fileText: <FileTextOutlined style={{ fontSize: ICON_SIZE }} />,
  group: <Users size={ICON_SIZE} />,
  mail: <MailOutlined style={{ fontSize: ICON_SIZE }} />,
  form_outlined: <FormOutlined style={{ fontSize: ICON_SIZE }} />,
  video_outline: <VideoCameraOutlined style={{ fontSize: ICON_SIZE }} />,
  pie_chart: <PieChartOutlined style={{ fontSize: ICON_SIZE }} />,
  file_upload: <UploadOutlined style={{ fontSize: ICON_SIZE }} />,
  file_download: <DownloadOutlined style={{ fontSize: ICON_SIZE }} />,
};

export function convertAliasesToMenu(menu?: string): React.ReactNode {
  return menuAliases[menu ?? ''];
}
