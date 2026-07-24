'use client';

import { useRequiredRule } from "@/i18n/validation";
import { useFormSchemaContext } from "@/context/FormSchema";
import { Form, Select } from "antd";
import { useTranslations } from 'next-intl';
import { useMemo } from "react";

export default function SelectUcFormSchema({ number, parentNumber, restFields }: { number: number, parentNumber: number, restFields?: any }) {
  const { schema, formJobGroup } = useFormSchemaContext();
  const t = useTranslations('form');
  const req = useRequiredRule();

  const fUnitCompetency = Form.useWatch(['job_groups', parentNumber, 'unit_competencies'], formJobGroup);

  const optionnUnitCompetency = useMemo(() =>{
    if (!schema || !schema.competency_unit || !formJobGroup) return [];

    const currentListSelectedUc = formJobGroup.getFieldValue([`job_groups`, parentNumber, "unit_competencies"]);
    const currentSelectedUc = currentListSelectedUc?.[number]?.unit_competency_code;

    const currentCompetencyUnit = schema.competency_unit;

    // filter currentCompetencyUnit by excluding the ones that already selected in the form except the current selected uc
    // uc.unit_competency_code is nullable, so we need to check if it's not null before comparing
    const selectedUcCodes = currentListSelectedUc?.map((uc: any) => uc?.unit_competency_code).filter((code: string | undefined): code is string => !!code && code !== currentSelectedUc) || [];

    return currentCompetencyUnit
      .filter((cu) => !selectedUcCodes.includes(cu.competency_unit_code))
      .map((cu) => ({
        label: `${cu.competency_unit_code} - ${cu.competency_unit_name}`,
        value: cu.competency_unit_code
      }));
  }, [schema, fUnitCompetency])

  return (
    <Form.Item
      {...restFields}
      name={[number, 'unit_competency_code']}
      label={t('unit-competency-code')}
      rules={[req('unit-competency-code')]}
    >
      <Select allowClear options={optionnUnitCompetency} placeholder={t('placeholder-select-unit')} />
    </Form.Item>
  )
}
