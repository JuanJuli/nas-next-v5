'use client';

import ActionButtonTable from '@/components/button/ActionButton';
import { Button, Card, Flex, Typography } from 'antd';

interface RenderSchemaItemProps {
  handleEdit?(id: string): void;
  handleDelete?(id: string): void;
  handleDetail?(id: string): void;
  generateForm?(id: string): void;
  handleRequirement?(id: string): void;
  tf?: (key: string) => string;
  tc?: (key: string) => string;
}

export default function renderSchemaItem({
  handleEdit,
  handleDelete,
  handleDetail,
  generateForm,
  handleRequirement,
  tf,
  tc,
}: RenderSchemaItemProps) {
  const f = tf || ((key: string) => key);
  const c = tc || ((key: string) => key);
  return (item: any) => (
    <Card
      hoverable
      className="h-full w-full"
      actions={[
        ...(generateForm
          ? [
              <Button key="generate" type="link" onClick={() => generateForm(item.schema_id)}>
                {c('btn-daftar-form')}
              </Button>,
            ]
          : []),
      ]}
    >
      <Flex vertical gap={8}>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {f('scheme-code')}
          </Typography.Text>
          <br />
          <Typography.Text strong>{item.schema_code}</Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {f('scheme-name')}
          </Typography.Text>
          <br />
          <Typography.Text>{item.schema_name}</Typography.Text>
        </div>
        <Flex gap={8} wrap="wrap">
          <ActionButtonTable
            id={item.schema_id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDetail={handleDetail}
          />
          {handleRequirement && (
            <Button onClick={() => handleRequirement(item.schema_id)}>{c('btn-muk')}</Button>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
