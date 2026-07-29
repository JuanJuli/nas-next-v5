'use client'

import TitlePage, { BreadcrumbItem } from '@/components/title_page/TitlePage'
import { Requirement } from '@/types/requirement'
import { File } from 'lucide-react'
import { useMemo } from 'react';
import columnFileList from './columnFileList';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';
import { htmlToPlainText } from '@/helper/stringHtml';
import { useTranslations } from 'next-intl';
import { useTableQuery } from '@/hooks/useTableQuery';
import { useTableUrlState } from '@/hooks/useTableUrlState';

export default function FileList({ requirementData }: { requirementData?: Requirement }) {
  const t = useTranslations('common');
  const { params, setParams } = useTableUrlState();
  const url = `core/requirement_file/${requirementData?.requirement_id ?? ''}`;
  const { data, isLoading } = useTableQuery(url, params, { search_fields: "filename" });

  const column = useMemo(() => columnFileList(), []);
  const defaultBreadcrumb: BreadcrumbItem[] = useMemo(() => {
    const breadcrumb = [
      {
        title: <Link href="/dashboard">{t('beranda')}</Link>,
      },
      {
        title: <div className="text-color-default">{t('requirement')} {htmlToPlainText(requirementData?.requirement_name ?? '')}</div>,
      },
      {
        title: <div className="text-color-default">{t('file-list')}</div>,
      },
    ];
    return breadcrumb;
  }, [requirementData, t]);
  
  return (
    <>
      <TitlePage breadCrumb={defaultBreadcrumb} icon={<File size={18} />} title={<div dangerouslySetInnerHTML={{ __html: requirementData?.requirement_name ?? t('daftar-file') }} />}  />
      <div className="p-6">
        <DataTable
          columns={column}
          data={data?.data || []}
          loading={isLoading}
          total={data?.count || 0}
          pageSize={params.limit}
          pageIndex={params.page ? params.page - 1 : 0}
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
