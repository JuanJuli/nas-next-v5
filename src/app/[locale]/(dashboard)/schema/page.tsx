'use client';

import { useTranslations } from 'next-intl';
import CustomList from '@/components/table/CustomList';
import TitlePage from '@/components/title_page/TitlePage'
import renderSchemaItem from '@/features/schema/components/renderSchemaItem';
import { useMenuIconByPath } from '@/hooks/useMenuIcon';
import { useRouter } from '@/i18n/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export default function Page() {
  const t = useTranslations('common');
  const tf = useTranslations('form');
  const icon = useMenuIconByPath('/schema')
  const router = useRouter();
  const handleEdit = (id: string) => {
    console.log('edit', id);
  }

  const renderItem = useMemo(() => {
    return renderSchemaItem({ handleEdit, tf, tc: t })
  }, [t, tf]);

  const handleAdd = () => {
    router.push('/schema/form');
  }

  return (
    <>
      <TitlePage
        title={t('skema-sertifikasi')}
        icon={icon}
        actions={[
          {
            key: 'add',
            label: t('btn-tambah-skema'),
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
