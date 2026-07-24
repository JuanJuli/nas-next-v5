"use client"

import { useRequirementListContext } from "@/context/RequirementList";
import { useTableQuery } from "@/hooks/useTableQuery";
import { Card, Space } from "antd";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useMemo } from "react";
import { useTranslations } from 'next-intl';

export default function RequirementList() {
  const t = useTranslations('common');
  const router = useRouter();
  const { schemaId, applicantId } = useRequirementListContext();

  const queryParams = useMemo(() => {
    return {
      schema_id: schemaId,
      applicant_id: applicantId,
      requirement_category: "DAFTAR",
      sort: "requirement.sequence,requirement.requirement_name",
      assessment_applicant_id: "vNull",
    }
  }, [schemaId, applicantId]);

  const requirementList = useTableQuery("core/requirements", queryParams);

  const listRequirement = useMemo(() => {
    if (requirementList.data && requirementList.data.status === "OK") {
      return requirementList.data.data;
    }
    return [];
  }, [requirementList.data]);

  useEffect(() => {
    console.log("List Requirement:", listRequirement);
  }, [listRequirement]);

  const handleClick = (requirement: any) => {
    console.log("Clicked requirement:", requirement);
    router.push(`/requirement/${requirement.requirement_id}`);
  }

  return (
    <Card title={t('persyaratan')}  style={{ width: '100%' }}>
      <Space>
        {listRequirement.length === 0 && (
          <div className="text-center text-gray-500">{t('empty-data')}</div>
        )}
        {listRequirement.map((requirement: any) => {
          return (
            <Card onClick={() => handleClick(requirement)} key={requirement.requirement_id} style={{ width: 300 }} className="hover:cursor-pointer hover:shadow-lg transition-shadow">
              <h1>{requirement.requirement_name}</h1>
            </Card>
          )
        })}
      </Space>
    </Card>
  )
}
