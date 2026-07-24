'use client';

import CustomTable from "@/components/table/CustomTable";
import TitlePage from "@/components/title_page/TitlePage";
import { HomeOutlined } from "@ant-design/icons";
import { theme } from "antd";
import columns from "./Column";
import { useMemo } from "react";
import { useRouter } from "next/dist/client/components/navigation";
const { useToken } = theme;
  
export default function DashboardApl() {
  const { token } = useToken();
  const router = useRouter();


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
    }) 
  }, [])

  return (
    <>
      <TitlePage
        title="Dashboard"
        icon={<HomeOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />}
        actions={[
          {
            key: 'refresh',
            label: 'Refresh',
            type: 'primary',
            onClick: () => {
              // Implement refresh logic here
            }
          }
        ]}
      />

      <div className="p-6">
        <CustomTable
          id="dashboard-apl-table"
          columns={column}
          url="assessment/assessment/applicant"
          queryParams={{
            "-last_activity_state": "completed,archived",
          }}
          rowKey="assessment_id"
          width="1950px"
        />
      </div>
    </>
  )
}
