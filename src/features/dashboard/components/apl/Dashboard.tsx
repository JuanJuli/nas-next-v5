'use client';

import CustomTable from "@/components/table/CustomTable";
import TitlePage from "@/components/title_page/TitlePage";
import { HomeOutlined } from "@ant-design/icons";
import { theme } from "antd";
import columns from "./Column";
import { useMemo } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/dist/client/components/navigation";
const { useToken } = theme;
  
export default function DashboardApl() {
  const { token } = useToken();
  const router = useRouter();
  const t = useTranslations('common');


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
        icon={<HomeOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />}
        actions={[
          {
            key: 'refresh',
            label: t('btn-refresh'),
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
