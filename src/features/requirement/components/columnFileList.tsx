import { ColumnDef } from '@tanstack/react-table';
import UniversalPreviewFile from '@/components/preview_file/UniversalPreviewFile';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function columnFileList(): ColumnDef<any>[] {
  const t = useTranslations('common');
  return [
    {
      id: 'u-filename',
      header: t('nama-file'),
      accessorKey: 'filename',
      cell: ({ row }) => {
        const value = row.getValue('filename');
        return value ? value : '-';
      },
    },
    {
      id: 'u-form_value',
      header: t('preview'),
      accessorKey: 'form_value',
      cell: ({ row }) => {
        const value = row.getValue('form_value');
        if (value) return <UniversalPreviewFile url={value as string} view={<Button variant="outline" size="icon"><Eye /></Button>} />;
        return '-';
      },
    },
  ];
}
