"use client";

import RegularTable from "@/components/table/RegularTable";
import { Button, Card } from "antd";
import { useMemo, useState } from "react";
import columnsReq from "./ColumnReq";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import { useModalState } from "@/hooks/useModal";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import DrawerCreateReq from "./DrawerCreateReq";
import { PlusOutlined } from "@ant-design/icons";
import { notification } from "@/service/antdStatic";

export default function PartTree() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBams, setCurrentPageBams] = useState(1);
  const { schema } = useConfigurationEformContext();
  const [typeForm, setTypeForm] = useState('DASAR')
  const { open, setOpen, data, setData, id, setId } = useModalState();

  const handleSuccessDelete = () => {
    notification.success({
        message: 'Data berhasil dihapus',
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
  }), [currentPage]);
  
  const columnBams = useMemo(() => columnsReq({
    handleEdit: (id, data) => handleEdit(id, data, "BAM"),
    handleDelete,
    currentPage: currentPageBams, 
  }), [currentPageBams]);
  
  const handleAdd = (type: string) => {
    setTypeForm(type)
    setData(null)
    setId(null)
    setOpen(true)
  }
  
  return (
    <Card>
      <DrawerCreateReq open={open} close={() => { setOpen(false); setData(null) }} data={data} type={typeForm} />
      <h1 className="text-[1.3em]! font-bold">Bagian 3: Bukti Kelengkapan Pemohon</h1>
      <p className="mb-4">Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda miliki.</p>
    
      <h4 className="font-semibold text-[1.2em]! mb-2">3.1 Bukti Persyaratan Dasar Pemohon</h4>
      <RegularTable
        actionBtn={<Button type="primary" title="Tambah Data" onClick={() => handleAdd("DASAR")} icon={<PlusOutlined />}>Tambah Data</Button>}
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
      <h4 className="font-semibold text-[1.2em]! mb-2">3.2 Bukti Administratif</h4>
      <RegularTable
        actionBtn={<Button type="primary" title="Tambah Data" onClick={() => handleAdd("DASAR")} icon={<PlusOutlined />}>Tambah Data</Button>}
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
