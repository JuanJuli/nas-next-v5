import { Button, Flex, type TableColumnsType } from 'antd';

export default function columnsSubmissionListSchema({
  handleSubmission,
  loading,
}: {
  handleSubmission(id: string): void;
  loading?: boolean;
}) {
  const column: TableColumnsType<any> = [
    {
      title: 'Skema Sertifikasi',
      dataIndex: 'schema_name',
      key: 'schema_name',
    },
    {
      title: 'Kode Skema',
      dataIndex: 'schema_code',
      key: 'schema_code',
    },
    {
      title: 'Ajukan',
      dataIndex: 'schema_id',
      key: 'schema_id',
      width: '350px',
      render: value => (
        <Flex gap={10} className="pr-[10px]">
          <Button
            loading={loading}
            className="w-[100px] btn-w-icon"
            onClick={() => handleSubmission(value)}
            title="Ajukan"
          >
            Ajukan
          </Button>
        </Flex>
      ),
    },
  ];

  return column;
}
