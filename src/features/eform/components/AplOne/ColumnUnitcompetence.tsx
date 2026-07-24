import { useTranslations } from 'next-intl';
import { type TableColumnsType } from 'antd';

export default function columnUnitCompetence({ currentPage }: { currentPage: number }) {
  const t = useTranslations('form');
  const column: TableColumnsType<any> = [
    {
      title: 'No.',
      dataIndex: 'competency_unit_id',
      key: 'u-competency_unit_id',
      render: (value: any, record: any, index: number) => {
        const rowNumber = (currentPage - 1) * 10 + index + 1;
        return rowNumber;
      }
    },
    {
      title: t('unit-code'),
      dataIndex: 'competency_unit_code',
      key: 'u-competency_unit_code',
      render: (value: any) => {
        if (value) return value;
        return '-';
      },
    },
    {
      title: t('label-unit-title'),
      dataIndex: 'competency_unit_name',
      key: 'u-competency_unit_name',
      render: (value: any) => {
        if (value) return value;
        return '-';
      },
    },
    {
      title: t('label-standar-kompetensi'),
      dataIndex: 'competency_unit_skkni',
      key: 'u-competency_unit_skkni',
      render: (value: any) => {
        if (value) return value;
        return '-';
      },
    },
  ];

  return column;
}
