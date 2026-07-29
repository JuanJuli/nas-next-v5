'use client';

import { DataTable } from "@/components/ui/data-table";
import TitlePage from "@/components/title_page/TitlePage";
import { Home } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import columns from "./Column";
import { useMemo, useState } from "react";
import { useTranslations } from 'next-intl';
import { useTableQuery } from "@/hooks/useTableQuery";
import { useTableUrlState } from "@/hooks/useTableUrlState";

export default function DashboardApl() {
  const router = useRouter();
  const t = useTranslations('common');
  const { params, setParams } = useTableUrlState();
  const { data, isLoading } = useTableQuery("assessment/assessment/applicant", params, {
    "-last_activity_state": "completed,archived",
  });

  const handleLinkVirtual = (data: any) => {
  };

  const handleReq = (id: string) => {
  };

  const handleOpenNoteAsesmen = (note: string) => {
  };

  const handleAppeal = (id: string, assessmentID: string) => {
  };

  const handleDocumentAsesmen = (id: string, aaID: string) => {
  };

  const handleSupDocumentApl = (aaID: string, assessmentState: string) => {
  };

  const column = useMemo(() => {
    return columns({
      handleLinkVirtual,
      handleReq,
      handleOpenNoteAsesmen,
      handleAppeal,
      handleDocumentAsesmen,
      handleSupDocumentApl,
      t,
    })
  }, [t])

  return (
    <>
      <TitlePage
        title={t('dashboard')}
        icon={<Home size={24} />}
        actions={[
          {
            key: 'refresh',
            label: t('btn-refresh'),
            type: 'primary',
            onClick: () => {
            }
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
          searchKey="title"
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
