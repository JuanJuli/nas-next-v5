"use client";

import RegularTable from "@/components/table/RegularTable";
import { Button, Card } from "antd";
import { useTranslations } from 'next-intl';
import { useMemo, useState } from "react";
import columnsReq from "./ColumnReq";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import { useModalState } from "@/hooks/useModal";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import DrawerCreateReq from "./DrawerCreateReq";
import { PlusOutlined } from "@ant-design/icons";
import { notification } from "@/service/antdStatic";

export default function PartTree() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const tm = useTranslations('message');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBams, setCurrentPageBams] = useState(1);
  const { schema } = useConfigurationEformContext();
  const [typeForm, setTypeForm] = useState('DASAR')
  const { open, setOpen, data, setData, id, setId } = useModalState();

  const handleSuccessDelete = () => {
    notification.success({
        message: tm('success-delete'),
        className: 'cnotif csuccess'
      })
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
      <RegularTable
        actionBtn={<Button type="primary" title={tc('btn-tambah-data')} onClick={() => handleAdd("DASAR")} icon={<PlusOutlined />}>{tc('btn-tambah-data')}</Button>}
        columns={columnBase}
        url="core/requirement_masters/regular"
        queryParams={{ "[schema_id": schema?.schema_id, requirement_category: "DASAR" }}
        rowKey="requirement_id"
        onChangeParams={(params: any) => {
          if (params.page) {
            setCurrentPage(params.page);
          }
        }}
      />
      <h4 className="font-semibold text-[1.2em]! mb-2">{t('heading-3-2')}</h4>
      <RegularTable
        actionBtn={<Button type="primary" title={tc('btn-tambah-data')} onClick={() => handleAdd("BAM")} icon={<PlusOutlined />}>{tc('btn-tambah-data')}</Button>}
        columns={columnBams}
        url="core/requirement_masters/regular"
        queryParams={{ "[schema_id": schema?.schema_id, requirement_category: "BAM" }}
        rowKey="requirement_id"
        onChangeParams={(params: any) => {
          if (params.page) {
            setCurrentPageBams(params.page);
          }
        }}
      />
    </Card>
  )
}
