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

export default function FileList({ requirementData }: { requirementData?: Requirement }) {
  const column = useMemo(() => columnFileList(), []);
  const defaultBreadcrumb: BreadcrumbItemType[] = useMemo(() => {
    const breadcrumb = [
      {
        title: <Link href="/dashboard">Beranda</Link>,
      },
      {
        // make sure title 1 line, not changing line because value <p> and if requirement name too long, it will be truncated with ellipsis
        title: <div className="text-color-default">Requirement {htmlToPlainText(requirementData?.requirement_name ?? '')}</div>,
      },
      {
        title: <div className="text-color-default">File List</div>,
      },
    ];
    return breadcrumb;
  }, [requirementData]);
  
  return (
    <>
      <TitlePage breadCrumb={defaultBreadcrumb} icon={<FileOutlined size={18} />} title={<div dangerouslySetInnerHTML={{ __html: requirementData?.requirement_name ?? 'Daftar File' }} />}  />
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
