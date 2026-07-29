'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { useTranslations } from 'next-intl';
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SelectUcFormSchema({ number, parentNumber, restFields }: { number: number, parentNumber: number, restFields?: any }) {
  const { schema } = useFormSchemaContext();
  const t = useTranslations('form');
  const form = useFormContext();

  const fUnitCompetency = useWatch({
    control: form.control,
    name: `job_groups.${parentNumber}.unit_competencies`,
  });

  const optionnUnitCompetency = useMemo(() =>{
    if (!schema || !schema.competency_unit || !form) return [];

    const currentListSelectedUc = form.getValues(`job_groups.${parentNumber}.unit_competencies`);
    const currentSelectedUc = currentListSelectedUc?.[number]?.unit_competency_code;

    const currentCompetencyUnit = schema.competency_unit;

    const selectedUcCodes = currentListSelectedUc?.map((uc: any) => uc?.unit_competency_code).filter((code: string | undefined): code is string => !!code && code !== currentSelectedUc) || [];

    return currentCompetencyUnit
      .filter((cu) => !selectedUcCodes.includes(cu.competency_unit_code))
      .map((cu) => ({
        label: `${cu.competency_unit_code} - ${cu.competency_unit_name}`,
        value: cu.competency_unit_code
      }));
  }, [schema, fUnitCompetency, number, parentNumber, form])

  return (
    <FormField
      control={form.control}
      name={`job_groups.${parentNumber}.unit_competencies.${number}.unit_competency_code`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('unit-competency-code')}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('placeholder-select-unit')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent alignItemWithTrigger={false}>
              {optionnUnitCompetency.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
