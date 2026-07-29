import { ColumnDef } from '@tanstack/react-table';
import ActionButtonTable from '@/components/button/ActionButton';

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
}): ColumnDef<any>[] {
  const c = t || ((key: string) => key);
  return [
    {
      id: 'u-requirement_id',
      header: c('column-no'),
      accessorKey: 'requirement_id',
      cell: ({ row }) => {
        const rowNumber = (currentPage - 1) * 10 + row.index + 1;
        return rowNumber;
      },
    },
    {
      id: 'requirement_name',
      header: c('column-document-name'),
      accessorKey: 'requirement_name',
      cell: ({ row }) => {
        const value = row.getValue('requirement_name');
        if (!value) return '-';
        return <div dangerouslySetInnerHTML={{ __html: value as string }} />;
      },
    },
    {
      id: 'requirement_master_id',
      header: c('column-aksi'),
      accessorKey: 'requirement_master_id',
      cell: ({ row }) => {
        const value = row.getValue('requirement_master_id') as string;
        const record = row.original;
        let type = 'all';
        if (record.current_schema) {
          type = record.current_schema;
        }
        return (
          <div className="flex gap-2.5">
            <ActionButtonTable
              id={value}
              onEdit={handleEdit ? id => handleEdit(id, record) : undefined }
              onDelete={handleDelete ? id => handleDelete(id) : undefined}
              onDetail={handleDetail}
            />
          </div>
        );
      },
    },
  ];
}
