'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslations } from 'next-intl';
import SelectUcFormSchema from "./SelectUcFormSchema";

function JobGroupRow({ groupIndex }: { groupIndex: number }) {
  const t = useTranslations('form');
  const { formJobGroup } = useFormSchemaContext();
  const control = formJobGroup!.control;

  const { fields: ucFields, append: appendUc, remove: removeUc } = useFieldArray({
    control,
    name: `job_groups.${groupIndex}.unit_competencies` as const,
  });

  return (
    <div className="ml-4 border-l-2 border-green-200 pl-4 space-y-2">
      {ucFields.map((ucField, ucIdx) => (
        <div key={ucField.id} className="grid grid-cols-[1fr_auto] gap-4 items-start">
          <SelectUcFormSchema number={ucIdx} parentNumber={groupIndex} />
          <Button variant="outline" className="mt-6" onClick={() => removeUc(ucIdx)}>
            {t('btn-remove')}
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => appendUc({ unit_competency_code: '' })}>
        <Plus /> {t('btn-add-unit-competency')}
      </Button>
    </div>
  );
}

function FormContent() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { schema, formJobGroup, formJobGroupFinish, onBack, jobGroupValues } = useFormSchemaContext();
  const control = formJobGroup!.control;

  const { fields: jobGroupFields, append: appendJobGroup, remove: removeJobGroup } = useFieldArray({
    control,
    name: 'job_groups',
  });

  return (
    <>
      <div className="p-4 rounded-lg shadow-md bg-card">
        <h2 className="text-xl font-semibold mb-4">{tc('heading-data-skema')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('scheme-code')}</span>
            <span className="mx-2">:</span>
            <span>{schema?.schema_code}</span>
          </div>
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('scheme-name')}</span>
            <span className="mx-2">:</span>
            <span>{schema?.schema_name}</span>
          </div>
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('scheme-license')}</span>
            <span className="mx-2">:</span>
            <span>{schema?.schema_license}</span>
          </div>
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('scheme-type')}</span>
            <span className="mx-2">:</span>
            <span>{schema?.schema_skkni}</span>
          </div>
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('scheme-year')}</span>
            <span className="mx-2">:</span>
            <span>{schema?.schema_year}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg shadow-md bg-card">
        <h2 className="text-xl font-semibold mb-4">{tc('heading-master-kelompok-pekerjaan')}</h2>

        {jobGroupFields.map((field, idx) => (
          <div key={field.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{tc('label-kelompok-pekerjaan')} {idx + 1}</h3>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 items-start">
              <FormField
                control={control}
                name={`job_groups.${idx}.job_group_code`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('job-group-code')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-job-group-code')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`job_groups.${idx}.job_group_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('job-group-name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-job-group-name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" className="mt-6" onClick={() => removeJobGroup(idx)}>
                {t('btn-remove')}
              </Button>
            </div>

            <JobGroupRow groupIndex={idx} />
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={() => appendJobGroup({ job_group_code: '', job_group_name: '', unit_competencies: [] })}>
          <Plus /> {t('btn-add-job-group')}
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 border-t-2 flex justify-end gap-2 bg-background border-border">
        <Button variant="outline" onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button onClick={() => formJobGroup!.handleSubmit(formJobGroupFinish!)()}>
          {(jobGroupValues?.length ?? 0) > 0 ? tc('btn-simpan') : tc('btn-lanjutkan')}
        </Button>
      </div>
    </>
  );
}

export default function FormJobGroup() {
  const { formJobGroup } = useFormSchemaContext();

  return (
    <FormProvider {...formJobGroup!}>
      <FormContent />
    </FormProvider>
  );
}
