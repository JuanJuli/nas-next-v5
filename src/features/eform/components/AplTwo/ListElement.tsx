'use client';

import { DataTable } from "@/components/ui/data-table";
import { useTableQuery } from "@/hooks/useTableQuery";
import columnListElement from "./ColumnListElemen";
import { useMemo, useState } from "react";
import { useModalAttachmentStore } from "@/store/modalAttachment";
import { useRequirementContext } from "@/context/Requirement";
import { useEformApl2Store } from "@/store/eformApl2";

export default function ListElement({ unitCompetenceID }: { unitCompetenceID: string }) {
  const { requirement } = useRequirementContext();
  const { setRequirementID } = useModalAttachmentStore((state) => state);
  const { partTwo, setRequirementAssessment } = useEformApl2Store();
  const [expandedElements, setExpandedElements] = useState<Set<string>>(new Set());

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(elementId)) {
        newSet.delete(elementId);
      } else {
        newSet.add(elementId);
      }
      return newSet;
    });
  };

  const { data: reqData, isLoading } = useTableQuery(
    "core/requirements",
    {
      unit_competence_id: unitCompetenceID,
      requirement_category: "KOMPETENSI",
      applicant_id: requirement?.applicant_id ?? "",
      schema_id: requirement?.schema_id ?? ""
    },
    {},
    !!unitCompetenceID
  );

  const listData = useMemo(() => {
    if (reqData && reqData.status === "OK" && reqData.data) return reqData.data;
    return [];
  }, [reqData]);

  const column = useMemo(() => {
    return columnListElement({
      handleAttachment: setRequirementID,
      expandedElements,
      toggleElement,
      partTwo,
      setRequirementAssessment
    })
  }, [expandedElements, setRequirementID, partTwo, setRequirementAssessment]);

  return (
    <DataTable
      columns={column}
      data={listData}
      loading={isLoading}
    />
  )
}
