"use client";

import TitlePage, { BreadcrumbItem } from "@/components/title_page/TitlePage";
import columnsSubmissionListSchema from "@/features/schema-submission/components/columnSubmissionListSchema";
import { switchErrorDistributionReq } from "@/features/schema-submission/utils/func";
import { usePostGet, usePost } from "@/hooks/useMutate";
import { toast } from "sonner"
import { useRouter, Link } from "@/i18n/navigation";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useTableUrlState } from "@/hooks/useTableUrlState";


export default function Page() {
  const router = useRouter();
  const { params, setParams } = useTableUrlState();
  const { data, isLoading } = useTableQuery("core/schemas", params, {
    "search_fields": "schema_name,schema_code",
  });

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
          toast.error(errorResponse.message, {
            description: errorResponse.title,
          });
        }
      }
    })
  }

  const handleSubmission = (schema_id: string) => {
    checkJoinRequests.mutate(`?limit=10&offset=10&schema_id=${schema_id}&request_status=REVISION_REQUEST`, {
      onSuccess: (data) => {
        if (data && data.data && data.data.length > 0) {
          toast.info('Pengajuan sertifikasi Anda direvisi oleh Admin LSP', {
            description: 'Mohon cek pengajuan Anda sebelumnya.',
            action: {
              label: 'Ke Halaman Pengajuan',
              onClick: () => router.push('/scheme-submission'),
            },
            duration: 10000,
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

  const defaultBreadcrumb: BreadcrumbItem[] = useMemo(() => {
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
