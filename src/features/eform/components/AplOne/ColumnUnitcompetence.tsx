import { type TableColumnsType } from 'antd';

export default function columnUnitCompetence({ currentPage }: { currentPage: number }) {
  const column: TableColumnsType<any> = [
    {
      title: 'No.',
      dataIndex: 'competency_unit_id',
      key: 'u-competency_unit_id',
      render: (value: any, record: any, index: number) => {
        // Menghitung nomor berdasarkan halaman saat ini dan indeks baris
        const rowNumber = (currentPage - 1) * 10 + index + 1;
        return rowNumber;
      }
    },
    {
      title: 'Kode Unit',
      dataIndex: 'competency_unit_code',
      key: 'u-competency_unit_code',
      render: (value: any) => {
        if (value) return value;
        return '-';
      },
    },
    {
      title: 'Judul Unit',
      dataIndex: 'competency_unit_name',
      key: 'u-competency_unit_name',
      render: (value: any) => {
        if (value) return value;
        return '-';
      },
    },
    {
      title: 'Standar Kompetensi Kerja',
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
