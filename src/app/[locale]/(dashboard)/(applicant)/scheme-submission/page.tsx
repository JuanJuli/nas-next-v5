"use client";

import TitlePage from "@/components/title_page/TitlePage";
import { FilePen, Plus } from "lucide-react";
import columnSchemaSubmission from "@/features/schema-submission/components/columnSchemaSubmission";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "@/i18n/navigation";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useTableUrlState } from "@/hooks/useTableUrlState";

export default function Page() {
  const router = useRouter();
  const { params, setParams } = useTableUrlState();
  const { data, isLoading } = useTableQuery("core/join_requests", params, {});

  const column = useMemo(() => {
    return columnSchemaSubmission({ handleDetail: () => {}, handleRevise: () => {}, openNotes: () => {} })
  }, [])

  return (
    <>
      <TitlePage
        title="Pengajuan Skema"
        icon={<FilePen size={36} />}
        actions={[
          {
            key: 'add',
            label: 'Ajukan Skema',
            type: 'primary',
            icon: <Plus />,
            onClick: () => {
              router.push('/scheme-submission/list-schema');
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
