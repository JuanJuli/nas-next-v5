import ActionButtonTable from '@/components/button/ActionButton';
import { Flex, type TableColumnsType } from 'antd';

export default function columnsReq({
  handleEdit,
  handleDelete,
  handleDetail,
  currentPage,
  t,
}: {
  currentPage: number;
  handleEdit?(id: string, data: any): void;
  handleDelete?(id: string): void;
  handleDetail?(id: string): void;
  t?: (key: string) => string;
}) {
  const c = t || ((key: string) => key);
  const columnsDasar: TableColumnsType<any> = [
    {
      title: c('column-no'),
      dataIndex: 'requirement_id',
      key: 'u-requirement_id',
      width: 80,
      render: (value: any, record: any, index: number) => {
        // Menghitung nomor berdasarkan halaman saat ini dan indeks baris
        const rowNumber = (currentPage - 1) * 10 + index + 1;
        return rowNumber;
      }
    },
    {
      title: c('column-document-name'),
      dataIndex: 'requirement_name',
      key: 'requirement_name',
      render(value: string) {
        if (!value) {
          return '-';
        }

        return <div dangerouslySetInnerHTML={{ __html: value }} />;
      },
    },
    {
      title: c('column-aksi'),
      dataIndex: 'requirement_master_id',
      key: 'requirement_master_id',
      width: '350px',
      render: (value: string, record: any) => {
        let type = 'all';
        if (record.current_schema) {
          type = record.current_schema;
        }
        return (
          <Flex gap={10}>
            <ActionButtonTable
              id={value}
              onEdit={handleEdit ? id => handleEdit(id, record) : undefined }
              onDelete={handleDelete ? id => handleDelete(id) : undefined}
              onDetail={handleDetail}
            />
          </Flex>
        );
      },
    },
  ];

  return columnsDasar;
}
