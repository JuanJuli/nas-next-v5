import { ColumnDef } from '@tanstack/react-table';
import ActionButtonTable from '@/components/button/ActionButton';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';
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
}): ColumnDef<any>[] {
  const t = useTranslations('common');
  return [
    {
      id: 'schema',
      header: t('skema-sertifikasi'),
      accessorKey: 'schema',
      cell: ({ row }) => {
        const value = row.getValue('schema') as any;
        if (value && value.schema_name) return value.schema_name;
        return '-';
      },
    },
    {
      id: 'created_date',
      header: t('label-tanggal-pengajuan'),
      accessorKey: 'created_date',
      cell: ({ row }) => {
        const value = row.getValue('created_date');
        if (value) return dayjs(value as string).format('DD-MM-YYYY');
        return '-';
      },
    },
    {
      id: 'request_status',
      header: t('status'),
      accessorKey: 'request_status',
      cell: ({ row }) => {
        const value = row.getValue('request_status') as string;
        const record = row.original;
        return (
          <div className="flex flex-col gap-1">
            <BadgeJoinRequest revise_count={record.revise_count} status={value} />
            {(value === 'REVISE' || value === 'REVISION_REQUEST' || value === 'REVISED') && record.join_request_logs && (
              <Button
                onClick={() => openNotes(record.join_request_logs, 'REVISION_REQUEST')}
                variant="link"
                size="sm"
              >
                <Eye className="mr-1 h-4 w-4" />
                {t('btn-lihat-catatan')}
              </Button>
            )}
            {value === 'REJECTED' && record.join_request_logs && (
              <Button
                onClick={() => openNotes(record.join_request_logs, 'REJECTED')}
                variant="link"
                size="sm"
              >
                <Eye className="mr-1 h-4 w-4" />
                {t('btn-lihat-catatan')}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      id: 'join_request_id',
      header: t('aksi'),
      accessorKey: 'join_request_id',
      cell: ({ row }) => {
        const value = row.getValue('join_request_id') as string;
        const record = row.original;
        return (
          <div className="flex gap-2.5 pr-[10px]">
            {record.request_status !== 'REVISE' && record.request_status !== 'REVISION_REQUEST' && (
              <ActionButtonTable id={value} onDetail={handleDetail} />
            )}
            {(record.request_status === 'REVISE' || record.request_status === 'REVISION_REQUEST') && (
              <Button onClick={() => handleRevise(value)}>
                <Edit className="mr-1 h-4 w-4" />
                {t('btn-ajukan-revisi')}
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
