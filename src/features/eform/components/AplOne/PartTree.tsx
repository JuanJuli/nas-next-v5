"use client";

import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useMemo } from "react";
import columnBaseReq from "./ColumnBaseReq";
import columnBam from "./ColumnBam";
import { useRequirementContext } from "@/context/Requirement";
import { useAuthStore } from "@/store/auth";
import { useModalAttachmentStore } from "@/store/modalAttachment";
import { useEformApl1Store } from "@/store/eformApl1";
import { useTranslations } from 'next-intl';

export default function PartTree() {
  const t = useTranslations('form');
  const { requirement } = useRequirementContext();
  const { user } = useAuthStore();
  const { setRequirementID } = useModalAttachmentStore((state) => state);
  const { partTree, setRequirementStatus } = useEformApl1Store();

  const handleAttachment = (requirementID: string) => {
    setRequirementID(requirementID);
  }

  const { data: dasarData, isLoading: dasarLoading } = useTableQuery(
    "core/requirements",
    { schema_id: requirement?.schema_id, requirement_category: "DASAR", applicant_id: user?.applicant?.applicant_id },
    {},
    !!requirement?.schema_id && !!user?.applicant?.applicant_id
  );

  const { data: bamData, isLoading: bamLoading } = useTableQuery(
    "core/requirements",
    { schema_id: requirement?.schema_id, requirement_category: "BAM", applicant_id: user?.applicant?.applicant_id },
    {},
    !!requirement?.schema_id && !!user?.applicant?.applicant_id
  );

  const dasarList = useMemo(() => {
    if (dasarData && dasarData.status === "OK" && dasarData.data) return dasarData.data;
    return [];
  }, [dasarData]);

  const bamList = useMemo(() => {
    if (bamData && bamData.status === "OK" && bamData.data) return bamData.data;
    return [];
  }, [bamData]);

  const columnBase = useMemo(() => columnBaseReq({
    handleAttachment,
    requirementsStatus: partTree.requirementsStatus,
    setRequirementStatus
  }), [partTree.requirementsStatus, setRequirementStatus]);

  const columnBams = useMemo(() => columnBam({
    handleAttachment,
    requirementsStatus: partTree.requirementsStatus,
    setRequirementStatus
  }), [partTree.requirementsStatus, setRequirementStatus]);

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-[2em]! font-bold">{t('heading-bagian-3')}</h1>
        <p className="mb-4">{t('desc-bagian-3')}</p>

        <h4 className="font-semibold mb-2">{t('heading-3-1')}</h4>
        <DataTable
          columns={columnBase}
          data={dasarList}
          loading={dasarLoading}
        />
        <h4 className="font-semibold mt-6 mb-2">{t('heading-3-2')}</h4>
        <DataTable
          columns={columnBams}
          data={bamList}
          loading={bamLoading}
        />
      </CardContent>
    </Card>
  )
}
