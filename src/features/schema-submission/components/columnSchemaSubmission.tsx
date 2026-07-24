import { Button, Flex, Space, type TableColumnsType } from 'antd';
import ActionButtonTable from '@/components/button/ActionButton';

import { EditOutlined, ReadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BadgeJoinRequest from '@/components/badge/JoinRequest';
import { useTranslations } from 'next-intl';

export default function columnSchemaSubmission({
  handleDetail,
  handleRevise,
  openNotes,
}: {
  handleDetail(id: string): void;
  handleRevise(id: string): void;
  openNotes(log: any, type: string): void;
}) {
  const t = useTranslations('common');
  const column: TableColumnsType<any> = [
    {
      title: t('skema-sertifikasi'),
      dataIndex: 'schema',
      key: 'schema',
      render: (value: any) => {
        if (value && value.schema_name) return `${value.schema_name}`;
        return '-';
      }, 
    },
    {
      title: t('label-tanggal-pengajuan'),
      dataIndex: 'created_date',
      key: 'created_date',
      render: (value: any) => {
        if (value) return dayjs(value).format('DD-MM-YYYY');
        return '-';
      },
    },
    {
      title: t('status'),
      dataIndex: 'request_status',
      key: 'request_status',
      render: (value: any, record: any) => (
        <Space orientation="vertical">
          <BadgeJoinRequest revise_count={record.revise_count} status={value} />
          {(value === 'REVISE' || value === 'REVISION_REQUEST' || value === 'REVISED') && record.join_request_logs && (
            <Button
              onClick={() => openNotes(record.join_request_logs, 'REVISION_REQUEST')}
              type="link"
              size="small"
              icon={<ReadOutlined />}
            >
              {t('btn-lihat-catatan')}
            </Button>
          )}
          {value === 'REJECTED' && record.join_request_logs && (
            <Button
              onClick={() => openNotes(record.join_request_logs, 'REJECTED')}
              type="link"
              size="small"
              icon={<ReadOutlined />}
            >
              {t('btn-lihat-catatan')}
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: t('aksi'),
      dataIndex: 'join_request_id',
      key: 'join_request_id',
      width: '350px',
      render: (value: any, record: any) => (
        <Flex gap={10} className="pr-[10px]">
          {record.request_status !== 'REVISE' && record.request_status !== 'REVISION_REQUEST' && (
            <ActionButtonTable id={value} onDetail={handleDetail} />
          )}
          {(record.request_status === 'REVISE' || record.request_status === 'REVISION_REQUEST') && (
            <Button onClick={() => handleRevise(value)} type="primary" icon={<EditOutlined />}>
              {t('btn-ajukan-revisi')}
            </Button>
          )}
        </Flex>
      ),
    },
  ];

  return column;
}
