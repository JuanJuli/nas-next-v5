'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { useTranslations } from 'next-intl';
import { useMemo } from "react";
import { FormProvider } from "react-hook-form";

interface AssessmentTool {
  code: string;
  name: string;
  showInAssesi?: boolean;
}

interface AssessmentCategory {
  label: string;
  groups: {
    label: string;
    tools: AssessmentTool[];
  }[];
}

const defaultAssessmentTools: AssessmentCategory[] = [
  {
    label: "General",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "APL.01", name: "APL.01" },
          { code: "APL.02", name: "APL.02" },
          { code: "SKEMA", name: "Skema Sertifikasi" },
          { code: "SK", name: "Standar Kompetensi" },
          { code: "AK.07", name: "AK.07" },
          { code: "AK.04", name: "AK.04" },
          { code: "AK.01", name: "AK.01" },
        ],
      },
      {
        label: "Laporan Asesmen",
        tools: [
          { code: "AK.05", name: "AK.05" },
          { code: "AK.06", name: "AK.06" },
          { code: "FR.VA", name: "FR.VA" },
        ],
      },
    ],
  },
  {
    label: "Observasi",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.01", name: "IA.01" },
          { code: "IA.02", name: "IA.02" },
          { code: "IA.03", name: "IA.03" },
        ],
      },
    ],
  },
  {
    label: "DIT",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.04A", name: "IA.04A" },
          { code: "IA.04B", name: "IA.04B" },
          { code: "IA.05A", name: "IA.05A" },
          { code: "IA.07", name: "IA.07" },
        ],
      },
    ],
  },
  {
    label: "Portfolio",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.08", name: "IA.08" },
          { code: "IA.09", name: "IA.09" },
        ],
      },
    ],
  },
];

export default function FormAssessmentTools() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { schema, formAssessmentTools, formAssessmentToolsFinish, onBack } = useFormSchemaContext();
  const control = formAssessmentTools!.control;

  return (
    <FormProvider {...formAssessmentTools!}>
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
        <h2 className="text-xl font-semibold mb-4">{t('heading-assessment-tools')}</h2>

        <Accordion defaultValue={defaultAssessmentTools.map((_, i) => String(i))}>
          {defaultAssessmentTools.map((category, catIndex) => (
            <AccordionItem key={String(catIndex)} value={String(catIndex)}>
              <AccordionTrigger>{category.label}</AccordionTrigger>
              <AccordionContent>
                {category.groups.map((group) => {
                  const catKey = category.label.toLowerCase();
                  const groupKey = group.label.toLowerCase();
                  return (
                    <div key={group.label} className="mb-4">
                      <h4 className="text-base font-medium mb-2">{group.label}</h4>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left p-2 text-sm font-medium border border-border">{t('heading-assessment-tool')}</th>
                            <th className="text-center p-2 text-sm font-medium w-24 border border-border">{t('heading-asesi')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.tools.map((tool) => (
                            <tr key={tool.code}>
                              <td className="p-2 text-sm border border-border">{tool.name}</td>
                              <td className="p-2 text-center border border-border">
                                <FormField
                                  control={control}
                                  name={`${catKey}.${groupKey}.${tool.code}`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Switch
                                          checked={field.value ?? false}
                                          onCheckedChange={field.onChange}
                                          size="sm"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
                <p className="text-xs mt-2 text-muted-foreground">{t('hint-show-asesi')}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 border-t-2 flex justify-end gap-2 bg-background border-border">
        <Button variant="outline" onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button onClick={() => formAssessmentTools!.handleSubmit(formAssessmentToolsFinish!)()}>
          {tc('btn-simpan')}
        </Button>
      </div>
      </FormProvider>
  );
}
