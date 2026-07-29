'use client';

import { useTranslations } from 'next-intl';
import TitlePage from '@/components/title_page/TitlePage'
import { useMenuIconByPath } from '@/hooks/useMenuIcon';
import { useRouter } from '@/i18n/navigation';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import columnSchema from '@/features/schema/components/columnSchema';
import { useTableQuery } from '@/hooks/useTableQuery';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { useMemo } from 'react';

export default function Page() {
  const t = useTranslations('common');
  const tf = useTranslations('form');
  const icon = useMenuIconByPath('/schema')
  const router = useRouter();
  const { params, setParams } = useTableUrlState();
  const { data, isLoading } = useTableQuery("core/schemas", params, {});

  const handleEdit = (id: string) => {
    console.log('edit', id);
  }

  const column = useMemo(() => {
    return columnSchema({ handleEdit, tf, tc: t })
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
            icon: <Plus />,
            onClick: () => handleAdd()
          }
        ]}
      />

      <div className="p-6">
        <DataTable
          columns={column}
          data={data?.data || []}
          loading={isLoading}
          total={data?.count || 0}
          pageSize={params.limit}
          pageIndex={params.page ? params.page - 1 : 0}
          searchKey="schema_name"
          onPaginationChange={(pagination) => {
            setParams({
              limit: pagination.pageSize,
              offset: pagination.pageIndex * pagination.pageSize,
              page: pagination.pageIndex + 1,
            })
          }}
        />
      </div>
    </>
  )
}
