"use client";

import TitlePage from "@/components/title_page/TitlePage";
import { FilePen } from "lucide-react";
import columnSchemaSubmission from "@/features/schema-submission/components/columnSchemaSubmission";
import { useMemo } from "react";
import CustomTable from "@/components/table/CustomTable";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "@/i18n/navigation";

export default function Page() {
  const router = useRouter();

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
            icon: <PlusOutlined />,
            onClick: () => {
              router.push('/scheme-submission/list-schema');
            }
          }
        ]}
      />
      <div className="p-6">
        <CustomTable
          id="table-schema-submission"
          rowKey="join_request_id"
          url="core/join_requests"
          columns={column}
        />
      </div>
    </>
  )
}
