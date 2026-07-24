'use client'

import UniversalPreviewFile from '@/components/preview_file/UniversalPreviewFile';
import { EyeOutlined } from '@ant-design/icons';
import { Button, type TableColumnsType } from 'antd';

export default function columnFileList() {
  const column: TableColumnsType<any> = [
    {
      title: 'Nama File',
      dataIndex: 'filename',
      key: 'u-filename',
      render: (value: any) => {
        return value ? value : '-';
      }
    },
    {
      title: 'Preview',
      dataIndex: 'form_value',
      key: 'u-form_value',
       width: 150,
      render: (value: any, record: any) => {
        if (value) return <UniversalPreviewFile key={record.key} url={value} view={<Button icon={<EyeOutlined />} />} />;
        return '-';
      },
    },
  ];

  return column;
}
