'use client'

import TitlePage from '@/components/title_page/TitlePage'
import { Requirement } from '@/types/requirement'
import { FileOutlined } from '@ant-design/icons'
import { useMemo } from 'react';
import columnFileList from './columnFileList';
import RegularTable from '@/components/table/RegularTable';
import Link from 'next/link';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { htmlToPlainText } from '@/helper/stringHtml';
import { useTranslations } from 'next-intl';

export default function FileList({ requirementData }: { requirementData?: Requirement }) {
  const t = useTranslations('common');
  const column = useMemo(() => columnFileList(), []);
  const defaultBreadcrumb: BreadcrumbItemType[] = useMemo(() => {
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
      <TitlePage breadCrumb={defaultBreadcrumb} icon={<FileOutlined size={18} />} title={<div dangerouslySetInnerHTML={{ __html: requirementData?.requirement_name ?? t('daftar-file') }} />}  />
      <div className="p-6">
        <RegularTable
          columns={column}
          url={`core/requirement_file/${requirementData?.requirement_id ?? ''}`}
          queryParams={{ search_fields: "filename" }}
          rowKey="row_id"
        />
      </div>
    </>
  )
}
