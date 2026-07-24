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
import { useTranslations } from 'next-intl';

export default function PartTree() {
  const t = useTranslations('form');
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
      <h1 className="text-[2em]! font-bold">{t('heading-bagian-3')}</h1>
      <p className="mb-4">{t('desc-bagian-3')}</p>
    
      <h4>{t('heading-3-1')}</h4>
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
      <h4>{t('heading-3-2')}</h4>
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
