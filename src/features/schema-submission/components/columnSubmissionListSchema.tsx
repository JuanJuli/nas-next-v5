import { Button, Flex, type TableColumnsType } from 'antd';
import { useTranslations } from 'next-intl';

export default function columnsSubmissionListSchema({
  handleSubmission,
  loading,
}: {
  handleSubmission(id: string): void;
  loading?: boolean;
}) {
  const t = useTranslations('common');
  const tf = useTranslations('form');
  const column: TableColumnsType<any> = [
    {
      title: t('skema-sertifikasi'),
      dataIndex: 'schema_name',
      key: 'schema_name',
    },
    {
      title: tf('label-kode-skema'),
      dataIndex: 'schema_code',
      key: 'schema_code',
    },
    {
      title: t('btn-ajukan'),
      dataIndex: 'schema_id',
      key: 'schema_id',
      width: '350px',
      render: value => (
        <Flex gap={10} className="pr-[10px]">
          <Button
            loading={loading}
            className="w-[100px] btn-w-icon"
            onClick={() => handleSubmission(value)}
            title={t('btn-ajukan')}
          >
            {t('btn-ajukan')}
          </Button>
        </Flex>
      ),
    },
  ];

  return column;
}
