import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from 'next-intl';

export default function columnUnitCompetence({ currentPage }: { currentPage?: number } = {}): ColumnDef<any>[] {
  const t = useTranslations('form');
  return [
    {
      id: 'no',
      header: 'No.',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'competency_unit_code',
      header: t('unit-code'),
      cell: ({ row }) => row.getValue('competency_unit_code') || '-',
    },
    {
      accessorKey: 'competency_unit_name',
      header: t('label-unit-title'),
      cell: ({ row }) => row.getValue('competency_unit_name') || '-',
    },
    {
      accessorKey: 'competency_unit_skkni',
      header: t('label-standar-kompetensi'),
      cell: ({ row }) => row.getValue('competency_unit_skkni') || '-',
    },
  ];
}
