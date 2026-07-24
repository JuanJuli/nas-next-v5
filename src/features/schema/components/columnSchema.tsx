import ActionButtonTable from '@/components/button/ActionButton';
import { Button, Flex, type TableColumnsType } from 'antd';

export default function columnSchema({
  handleEdit,
  handleDelete,
  handleDetail,
  generateForm,
  handleRequirement,
}: {
  handleEdit?(id: string): void;
  handleDelete?(id: string): void;
  handleDetail?(id: string): void;
  generateForm?(id: string): void;
  handleRequirement?(id: string): void;
}) {
  const column: TableColumnsType<any> = [
    {
      title: 'Kode Skema Sertifikasi',
      dataIndex: 'schema_code',
      key: 'schema_code',
    },
    {
      title: 'Nama Skema Sertifikasi',
      dataIndex: 'schema_name',
      key: 'schema_name',
    },
    {
      title: 'Generate',
      dataIndex: 'schema_id',
      key: 'u-generate',
      width: '160px',
      render: value => {
        if (!generateForm) return '-';
        return <Button onClick={() => generateForm(value)}>Daftar Form</Button>;
      },
    },
    {
      title: 'Aksi',
      dataIndex: 'schema_id',
      key: 'schema_id',
      width: '450px',
      render: value => (
        <Flex gap={10}>
          <ActionButtonTable id={value} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleDetail} />
          {handleRequirement && <Button onClick={() => handleRequirement(value)}>MUK</Button>}
        </Flex>
      ),
    },
  ];

  return column;
}
