import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function columnsSubmissionListSchema({
  handleSubmission,
  loading,
}: {
  handleSubmission(id: string): void;
  loading?: boolean;
}): ColumnDef<any>[] {
  const t = useTranslations('common');
  const tf = useTranslations('form');
  return [
    {
      id: 'schema_name',
      header: t('skema-sertifikasi'),
      accessorKey: 'schema_name',
    },
    {
      id: 'schema_code',
      header: tf('label-kode-skema'),
      accessorKey: 'schema_code',
    },
    {
      id: 'schema_id',
      header: t('btn-ajukan'),
      accessorKey: 'schema_id',
      cell: ({ row }) => (
        <div className="flex gap-2.5 pr-[10px]">
          <Button
            disabled={loading}
            className="w-[100px]"
            onClick={() => handleSubmission(row.getValue('schema_id'))}
            title={t('btn-ajukan')}
          >
            {t('btn-ajukan')}
          </Button>
        </div>
      ),
    },
  ];
}
