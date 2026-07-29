import { ColumnDef } from '@tanstack/react-table';
import ActionButtonTable from '@/components/button/ActionButton';
import { Button } from '@/components/ui/button';

export default function columnSchema({
  handleEdit,
  handleDelete,
  handleDetail,
  generateForm,
  handleRequirement,
  tf,
  tc,
}: {
  handleEdit?(id: string): void;
  handleDelete?(id: string): void;
  handleDetail?(id: string): void;
  generateForm?(id: string): void;
  handleRequirement?(id: string): void;
  tf: (key: string) => string;
  tc: (key: string) => string;
}): ColumnDef<any>[] {
  return [
    {
      id: 'schema_code',
      header: tf('scheme-code'),
      accessorKey: 'schema_code',
      meta:{
        className: "max-w-[350px] whitespace-normal"
      }
    },
    {
      id: 'schema_name',
      header: tf('scheme-name'),
      accessorKey: 'schema_name',
      meta:{
        className: "max-w-[350px] whitespace-normal"
      }
    },
    {
      id: 'u-generate',
      header: tc('column-generate'),
      accessorKey: 'schema_id',
      cell: ({ row }) => {
        if (!generateForm) return '-';
        return <Button variant="outline" size="sm" onClick={() => generateForm(row.getValue('schema_id'))}>{tc('btn-daftar-form')}</Button>;
      },
    },
    {
      id: 'schema_id',
      header: tc('column-aksi'),
      accessorKey: 'schema_id',
      cell: ({ row }) => {
        const value = row.getValue('schema_id') as string;
        return (
          <div className="flex gap-2.5">
            <ActionButtonTable id={value} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleDetail} />
            {handleRequirement && <Button variant="outline" size="sm" onClick={() => handleRequirement(value)}>{tc('btn-muk')}</Button>}
          </div>
        );
      },
    },
  ];
}
