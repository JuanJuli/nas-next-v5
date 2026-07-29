'use client';

import { useTranslations } from 'next-intl';
import TitlePage from "@/components/title_page/TitlePage";
import { FormSchemaContext, SchemaFormValues, JobGroupFormValues, AssessmentToolsFormValues } from "@/context/FormSchema";
import FormAssessmentTools from "@/features/schema/components/FormAssessmentTools";
import FormConfigEform from "@/features/schema/components/FormConfigEform";
import FormJobGroup from "@/features/schema/components/FormJobGroup";
import FormSchema from "@/features/schema/components/FormSchema";
import ModalImporSchema from "@/features/schema/components/ModalImporSchema";
import { useModalState } from "@/hooks/useModal";
import { Upload, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useMemo } from "react";
import {
  createSchemaFormSchema,
  createJobGroupFormSchema,
  createAssessmentToolsFormSchema,
} from "@/features/schema/validation";

const steps = [
  { key: 0, label: 'data-skema-sertifikasi' },
  { key: 1, label: 'data-kelompok-kerja' },
  { key: 2, label: 'perangkat-asesmen-muk' },
];

export default function Page() {
  const t = useTranslations('common');
  const tf = useTranslations('form');
  const [currentStep, setCurrentStep] = useState(0);
  const [openImportSchema, setOpenImportSchema] = useState(false);

  const schemaFormSchema = useMemo(() => createSchemaFormSchema(tf), [tf])
  const jobGroupFormSchema = useMemo(() => createJobGroupFormSchema(tf), [tf])
  const assessmentToolsFormSchema = useMemo(() => createAssessmentToolsFormSchema(tf), [tf])

  const formSchema = useForm<SchemaFormValues>({
    resolver: zodResolver(schemaFormSchema),
    defaultValues: { competency_unit: [] },
  })
  const formJobGroup = useForm<JobGroupFormValues>({
    resolver: zodResolver(jobGroupFormSchema),
    defaultValues: { job_groups: [] },
  })
  const formAssessmentTools = useForm<AssessmentToolsFormValues>({
    resolver: zodResolver(assessmentToolsFormSchema),
    defaultValues: {},
  })

  const [dataForm, setDataForm] = useState<SchemaFormValues | null>(null);
  const [dataJobGroup, setDataJobGroup] = useState<JobGroupFormValues['job_groups'] | null>(null);
  const [dataAssessmentTools, setDataAssessmentTools] = useState<AssessmentToolsFormValues | null>(null);

  const { open: openEformConf, setOpen: setOpenEformConf } = useModalState();

  const handleBack = () => {
  }

  const handleFormSchemaFinish = (values: SchemaFormValues) => {
    (values as any).schema_id = "465a5fae-b695-4b0a-a546-788ee493bc33";
    setDataForm(values);
    if (!dataForm) {
      setCurrentStep(1);
    }
  }

  const handleFormJobGroupFinish = (values: JobGroupFormValues) => {
    if (values.job_groups) {
      setDataJobGroup(values.job_groups);
    }
    if (!dataJobGroup) {
      setCurrentStep(2);
    }
  }

  const handleFormAssessmentToolsFinish = (values: AssessmentToolsFormValues) => {
    setDataAssessmentTools(values);
    setOpenEformConf(true)
  }

  const handleImportSchema = () => {
    setOpenImportSchema(true);
  }

  const stepStatuses = [
    dataForm ? 'finish' as const : (currentStep === 0 ? 'process' as const : 'wait' as const),
    dataJobGroup ? 'finish' as const : (currentStep === 1 ? 'process' as const : 'wait' as const),
    dataAssessmentTools ? 'finish' as const : (currentStep === 2 ? 'process' as const : 'wait' as const),
  ];

  const handleStepChange = (step: number) => {
    if (step === 0) {
      setCurrentStep(0);
    } else if (step === 1 && dataForm) {
      setCurrentStep(1);
    } else if (step === 2 && dataJobGroup) {
      setCurrentStep(2);
    }
  }

  const handleOnBack = useCallback(() => {
    if (currentStep === 0) {
      handleBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  return (
    <>
      <TitlePage
        title={t('form-skema-sertifikasi')}
        handleBack={handleBack}
        actions={[
          {
            key: 'import',
            label: t('btn-import-skema'),
            onClick: handleImportSchema,
            icon: <Upload />,
          }
        ]}
      />

      <FormConfigEform open={openEformConf} close={() => setOpenEformConf(false)} schemaId={(dataForm as any)?.schema_id} />
      <ModalImporSchema open={openImportSchema} onClose={() => setOpenImportSchema(false)} onImport={(data) => formSchema.reset(data)} />
      <div className="p-4 min-h-[100vh]! pb-[150px]! bg-muted/30">
        <div className="mb-4 p-4 rounded-lg shadow-md bg-card">
          <div className="flex items-center gap-4">
            {steps.map((step, idx) => (
              <div key={step.key} className="flex items-center gap-2 flex-1">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleStepChange(idx)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepStatuses[idx] === 'finish'
                        ? 'bg-primary text-primary-foreground'
                        : stepStatuses[idx] === 'process'
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepStatuses[idx] === 'finish' ? <Check className="size-4" /> : idx + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{t(step.label)}</span>
                </div>
                {idx < steps.length - 1 && <div className={`flex-1 h-px ${stepStatuses[idx] === 'finish' ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </div>

        <FormSchemaContext.Provider
          value={{
            schema: dataForm as any,
            formSchema: formSchema as any,
            formSchemaFinish: handleFormSchemaFinish,
            formJobGroup: formJobGroup as any,
            formJobGroupFinish: handleFormJobGroupFinish,
            formAssessmentTools: formAssessmentTools as any,
            formAssessmentToolsFinish: handleFormAssessmentToolsFinish,
            jobGroupValues: dataJobGroup || [],
            assessmentToolsValues: dataAssessmentTools || {},
            currentStep,
            onBack: handleOnBack,
          }}
        >
          {currentStep === 0 && <FormSchema />}
          {currentStep === 1 && <FormJobGroup />}
          {currentStep === 2 && <FormAssessmentTools />}
        </FormSchemaContext.Provider>
      </div>
    </>
  )
}
