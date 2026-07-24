"use client";

import RegularTable from "@/components/table/RegularTable";
import { Card } from "antd";
import { useMemo, useState } from "react";
import columnBaseReq from "./ColumnBaseReq";
import columnBam from "./ColumnBam";
import { useRequirementContext } from "@/context/Requirement";
import { useAuthStore } from "@/store/auth";
import { useModalAttachmentStore } from "@/store/modalAttachment";
import { useEformApl1Store } from "@/store/eformApl1";

export default function PartTree() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBams, setCurrentPageBams] = useState(1);
  const { requirement } = useRequirementContext();
  const { user } = useAuthStore();
  const { setRequirementID } = useModalAttachmentStore((state) => state);
  const { partTree, setRequirementStatus } = useEformApl1Store();

  const handleAttachment = (requirementID: string) => {
    setRequirementID(requirementID);
  }

  const columnBase = useMemo(() => columnBaseReq({ 
    currentPage, 
    handleAttachment, 
    requirementsStatus: partTree.requirementsStatus, 
    setRequirementStatus 
  }), [currentPage, partTree.requirementsStatus, setRequirementStatus]);
  
  const columnBams = useMemo(() => columnBam({ 
    currentPage: currentPageBams, 
    handleAttachment, 
    requirementsStatus: partTree.requirementsStatus, 
    setRequirementStatus 
  }), [currentPageBams, partTree.requirementsStatus, setRequirementStatus]);
  
  return (
    <Card>
      <h1 className="text-[2em]! font-bold">Bagian 3: Bukti Kelengkapan Pemohon</h1>
      <p className="mb-4">Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda miliki.</p>
    
      <h4>3.1 Bukti Persyaratan Dasar Pemohon</h4>
      <RegularTable
        columns={columnBase}
        url="core/requirements"
        queryParams={{ schema_id: requirement?.schema_id, requirement_category: "DASAR", applicant_id: user?.applicant?.applicant_id }}
        rowKey="requirement_id"
        onChangeParams={(params: any) => {
          if (params.page) {
            setCurrentPage(params.page);
          }
        }}
      />
      <h4>3.2 Bukti Administratif</h4>
      <RegularTable
        columns={columnBams}
        url="core/requirements"
        queryParams={{ schema_id: requirement?.schema_id, requirement_category: "BAM", applicant_id: user?.applicant?.applicant_id }}
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
