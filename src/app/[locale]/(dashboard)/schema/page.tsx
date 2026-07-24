'use client';

import CustomList from '@/components/table/CustomList';
import TitlePage from '@/components/title_page/TitlePage'
import renderSchemaItem from '@/features/schema/components/renderSchemaItem';
import { useMenuIconByPath } from '@/hooks/useMenuIcon';
import { useRouter } from '@/i18n/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export default function Page() {
  const icon = useMenuIconByPath('/schema')
  const router = useRouter();
  const handleEdit = (id: string) => {
    console.log('edit', id);
  }

  const renderItem = useMemo(() => {
    return renderSchemaItem({ handleEdit })
  }, []);

  const handleAdd = () => {
    router.push('/schema/form');
  }

  return (
    <>
      <TitlePage
        title="Skema Sertifikasi"
        icon={icon}
        actions={[
          {
            key: 'add',
            label: 'Tambah Skema',
            type: 'primary',
            icon: <PlusOutlined />,
            onClick: () => handleAdd()
          }
        ]}
      />

      <div className="p-6">
        <CustomList
          id="table-schema"
          rowKey="schema_id"
          url="core/schemas"
          renderItem={renderItem}
          layout="list"
        />
      </div>
    </>
  )
}
