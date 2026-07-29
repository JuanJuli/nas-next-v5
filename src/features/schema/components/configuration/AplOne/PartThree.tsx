"use client";

import { Button, Card } from "antd";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useMemo, useState } from "react";
import columnsReq from "./ColumnReq";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import { useModalState } from "@/hooks/useModal";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import DrawerCreateReq from "./DrawerCreateReq";
import { toast } from "sonner";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useTableUrlState } from "@/hooks/useTableUrlState";

export default function PartTree() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const tm = useTranslations('message');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBams, setCurrentPageBams] = useState(1);
  const { schema } = useConfigurationEformContext();
  const [typeForm, setTypeForm] = useState('DASAR')
  const { open, setOpen, data, setData, id, setId } = useModalState();
  const { params: paramsDasar, setParams: setParamsDasar } = useTableUrlState({ limit: 10 });
  const { params: paramsBams, setParams: setParamsBams } = useTableUrlState({ limit: 10 });

  const { data: dataDasar, isLoading: loadingDasar } = useTableQuery(
    "core/requirement_masters/regular",
    { ...paramsDasar, "[schema_id": schema?.schema_id, requirement_category: "DASAR" },
    {}
  );

  const { data: dataBams, isLoading: loadingBams } = useTableQuery(
    "core/requirement_masters/regular",
    { ...paramsBams, "[schema_id": schema?.schema_id, requirement_category: "BAM" },
    {}
  );

  const handleSuccessDelete = () => {
    toast.success(tm('success-delete'))
  }

  const { confirmDelete } = useDeleteConfirm('core/requirement_masters', { invalidateQueries: ['table', 'core/requirement_masters/regular'], onSuccess: handleSuccessDelete })

  const handleEdit = (id: string, data: any, type: string) => {
    setTypeForm(type)
    setId(id)
    setData(data)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    let idDelete = id;
    if (schema && schema.schema_id){
      idDelete = `${id}/${schema.schema_id}`
    }
    confirmDelete(idDelete)
  }

  const columnBase = useMemo(() => columnsReq({
    handleEdit: (id, data) => handleEdit(id, data, "DASAR"),
    handleDelete,
    currentPage,
    t: tc,
  }), [currentPage, tc]);
  
  const columnBams = useMemo(() => columnsReq({
    handleEdit: (id, data) => handleEdit(id, data, "BAM"),
    handleDelete,
    currentPage: currentPageBams,
    t: tc,
  }), [currentPageBams, tc]);
  
  const handleAdd = (type: string) => {
    setTypeForm(type)
    setData(null)
    setId(null)
    setOpen(true)
  }
  
  return (
    <Card>
      <DrawerCreateReq open={open} close={() => { setOpen(false); setData(null) }} data={data} type={typeForm} />
      <h1 className="text-[1.3em]! font-bold">{t('heading-bagian-3')}</h1>
      <p className="mb-4">{t('desc-bagian-3')}</p>
    
      <h4 className="font-semibold text-[1.2em]! mb-2">{t('heading-3-1')}</h4>
      <div className="mb-4">
        <Button type="primary" onClick={() => handleAdd("DASAR")}>
          <Plus />{tc('btn-tambah-data')}
        </Button>
      </div>
      <DataTable
        columns={columnBase}
        data={dataDasar?.data || []}
        loading={loadingDasar}
        total={dataDasar?.count || 0}
        pageSize={paramsDasar.limit}
        pageIndex={paramsDasar.page ? paramsDasar.page - 1 : 0}
        onPaginationChange={(pagination) => {
          setParamsDasar({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
            page: pagination.pageIndex + 1,
          })
          setCurrentPage(pagination.pageIndex + 1);
        }}
      />
      <h4 className="font-semibold text-[1.2em]! mb-2">{t('heading-3-2')}</h4>
      <div className="mb-4">
        <Button type="primary" onClick={() => handleAdd("BAM")}>
          <Plus />{tc('btn-tambah-data')}
        </Button>
      </div>
      <DataTable
        columns={columnBams}
        data={dataBams?.data || []}
        loading={loadingBams}
        total={dataBams?.count || 0}
        pageSize={paramsBams.limit}
        pageIndex={paramsBams.page ? paramsBams.page - 1 : 0}
        onPaginationChange={(pagination) => {
          setParamsBams({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
            page: pagination.pageIndex + 1,
          })
          setCurrentPageBams(pagination.pageIndex + 1);
        }}
      />
    </Card>
  )
}
