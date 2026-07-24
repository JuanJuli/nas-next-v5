"use client";

import Apl1 from "./Apl1";
import Apl2 from "./Apl2";
import { Requirement } from "@/types/requirement";
import { RequirementContext } from "@/context/Requirement";
import ModalAttachmentRequirement from "@/features/requirement/components/ModalAttachment";
import ModalPreviewEform from "@/features/requirement/components/ModalPreviewEform";
import { useMemo } from "react";

export default function Eform({ requirementData }: { requirementData?: Requirement }) {
  const isApl1 = useMemo(() => {
    console.log("requirementData:", requirementData);
    if (!requirementData || !requirementData.requirement_name) return false;
    const lowerCaseName = requirementData.requirement_name.toLowerCase();
    if (lowerCaseName.includes("apl") && lowerCaseName.includes("2")) {
      return false;
    }
    return true;
  }, [requirementData]);
  return (
    <>
    <ModalAttachmentRequirement />
    <ModalPreviewEform />
    
    <RequirementContext.Provider value={{ requirement: requirementData ?? null }}>
      {isApl1 ? <Apl1 /> : <Apl2 />}
    </RequirementContext.Provider>
    </>
  )
}
