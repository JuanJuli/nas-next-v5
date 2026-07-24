import ActionButtonTable from '@/components/button/ActionButton';
import { Button, Flex, type TableColumnsType } from 'antd';

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
}) {
  const column: TableColumnsType<any> = [
    {
      title: tf('scheme-code'),
      dataIndex: 'schema_code',
      key: 'schema_code',
    },
    {
      title: tf('scheme-name'),
      dataIndex: 'schema_name',
      key: 'schema_name',
    },
    {
      title: tc('column-generate'),
      dataIndex: 'schema_id',
      key: 'u-generate',
      width: '160px',
      render: value => {
        if (!generateForm) return '-';
        return <Button onClick={() => generateForm(value)}>{tc('btn-daftar-form')}</Button>;
      },
    },
    {
      title: tc('column-aksi'),
      dataIndex: 'schema_id',
      key: 'schema_id',
      width: '450px',
      render: value => (
        <Flex gap={10}>
          <ActionButtonTable id={value} onEdit={handleEdit} onDelete={handleDelete} onDetail={handleDetail} />
          {handleRequirement && <Button onClick={() => handleRequirement(value)}>{tc('btn-muk')}</Button>}
        </Flex>
      ),
    },
  ];

  return column;
}
