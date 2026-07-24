"use client";

import CustomTable from "@/components/table/CustomTable";
import TitlePage from "@/components/title_page/TitlePage";
import columnsSubmissionListSchema from "@/features/schema-submission/components/columnSubmissionListSchema";
import { switchErrorDistributionReq } from "@/features/schema-submission/utils/func";
import { usePostGet, usePost } from "@/hooks/useMutate";
import { modal, notification } from "@/service/antdStatic";
import { TableColumnsType } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Table from "antd/es/table/Table";
import { useRouter, Link } from "@/i18n/navigation";
import { useMemo } from "react";


export default function Page() {
  const router = useRouter();


  const checkJoinRequests = usePostGet("core/join_requests")
  const distributionReq = usePost("core/requirements/distribute")

  const handleBack = () => {
    router.back();
  }

  const handleDistributionReq = (schema_id: string) => {
    let payload = {
      url: `/${schema_id}`,
      data: ""
    }

    distributionReq.mutate(payload, {
      onSuccess: (data) => {
        router.push(`/scheme-submission/submission/${schema_id}`);
      },
      onError: (error) => {
        if (error && error.message) {
          const errorResponse = switchErrorDistributionReq(error.message);
          if (errorResponse.type === "modal") {
            modal.warning({
              title: errorResponse.title,
              content: errorResponse.message,
            });
          } else {
            notification.error({
              title: errorResponse.message,
              className: 'cnotif cerror',
            });
          }
        }
      }
    })
  }

  const handleSubmission = (schema_id: string) => {
    // router.push(`/scheme-submission/submission/${schema_id}`);
    checkJoinRequests.mutate(`?limit=10&offset=10&schema_id=${schema_id}&request_status=REVISION_REQUEST`, {
      onSuccess: (data) => {
        if (data && data.data && data.data.length > 0) {
          modal.confirm({
            title: 'Pengajuan sertifikasi Anda direvisi oleh Admin LSP',
            content: 'Mohon cek pengajuan Anda sebelumnya.',
            okText: 'Ke Halaman Pengajuan',
            cancelText: 'Nanti',
            onOk: () => {
              router.push('/scheme-submission');
            },
          });
        } else {
          handleDistributionReq(schema_id);
        }
      },
      onError: (error) => {
        console.log("error:", error);
      }
    })
  }

  const column = useMemo(() => {
    return columnsSubmissionListSchema({ handleSubmission, loading: false })
  }, [])

  const expandedRowRender = (record: any) => {
    const colm: TableColumnsType<any> = [
      {
        title: 'Kode Unit',
        dataIndex: 'competency_unit_code',
        key: 'competency_unit_code',
      },
      {
        title: 'Unit Kompetensi',
        dataIndex: 'competency_unit_name',
        key: 'competency_unit_name',
      },
    ];
    return <Table key={record.row_id} rowKey="row_id" columns={colm} dataSource={record.competency_unit} />;
  };

  const defaultBreadcrumb: BreadcrumbItemType[] = useMemo(() => {
    const breadcrumb = [
      {
        title: <Link href="/scheme-submission">Pengajuan Skema Sertifikasi</Link>,
      },
      {
        title: <div className="text-[#000]">Daftar Skema Sertifikasi</div>,
      },
    ];
    return breadcrumb;
  }, []);


  return (
    <>
      <TitlePage
        title="Daftar Skema Sertifikasi"
        handleBack={handleBack}
        breadCrumb={defaultBreadcrumb}
      />

      <div className="p-6">
        <CustomTable
          id="table-list-schema"
          rowKey="schema_id"
          url="core/schemas"
          columns={column}
          expandedRowRender={expandedRowRender}
          queryParams={{
            "search_fields": "schema_name,schema_code",
          }}
        />
      </div>
    </>
  )
}
