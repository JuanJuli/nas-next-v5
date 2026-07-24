'use client';

import { useTranslations } from 'next-intl';
import TitlePage from "@/components/title_page/TitlePage";
import { FormSchemaContext } from "@/context/FormSchema";
import FormAssessmentTools from "@/features/schema/components/FormAssessmentTools";
import FormConfigEform from "@/features/schema/components/FormConfigEform";
import FormJobGroup from "@/features/schema/components/FormJobGroup";
import FormSchema from "@/features/schema/components/FormSchema";
import ModalImporSchema from "@/features/schema/components/ModalImporSchema";
import { useModalState } from "@/hooks/useModal";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Steps, theme } from "antd";
import { useCallback, useMemo, useState } from "react";

export default function Page() {
  const t = useTranslations('common');
  const [currentStep, setCurrentStep] = useState(0);
  const [openImportSchema, setOpenImportSchema] = useState(false);
  const [form] = Form.useForm();
  const [formJbGroup] = Form.useForm();
  const [formAssessmentTools] = Form.useForm();

  const { token } = theme.useToken();

  const [dataForm, setDataForm] = useState<null | any>(null);
  const [dataJobGroup, setDataJobGroup] = useState<null | any>(null);
  const [dataAssessmentTools, setDataAssessmentTools] = useState<null | any>(null);

  const { open: openEformConf, setOpen: setOpenEformConf } = useModalState();

  const handleBack = () => {
  }

  const handleFormSchemaFinish = (values: any) => {
    const competencyUnits = form?.getFieldValue('competency_unit') || [];
    values.competency_unit = competencyUnits;
    values.schema_id = "465a5fae-b695-4b0a-a546-788ee493bc33"
    setDataForm(values);
    if (!dataForm) {
      setCurrentStep(1);
    }
  }

  const handleFormJobGroupFinish = (values: any) => {
    if (values.job_groups) {
      setDataJobGroup(values.job_groups);
    }
    if (!dataJobGroup) {
      setCurrentStep(2);
    }
  }

  const handleFormAssessmentToolsFinish = (values: any) => {
    setDataAssessmentTools(values);
    setOpenEformConf(true)
  }

  const handleImportSchema = () => {
    setOpenImportSchema(true);
  }

  const stepStatuses = useMemo(() => {
    return [
      dataForm ? 'finish' as const : (currentStep === 0 ? 'process' as const : 'wait' as const),
      dataJobGroup ? 'finish' as const : (currentStep === 1 ? 'process' as const : 'wait' as const),
      dataAssessmentTools ? 'finish' as const : (currentStep === 2 ? 'process' as const : 'wait' as const),
    ];
  }, [currentStep, dataForm, dataJobGroup, dataAssessmentTools]);

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
            icon: <UploadOutlined />,
          }
        ]}
      />
      
      <FormConfigEform open={openEformConf} close={() => setOpenEformConf(false)} schemaId={dataForm?.schema_id} />
      <ModalImporSchema open={openImportSchema} onClose={() => setOpenImportSchema(false)} onImport={(data) => form.setFieldsValue(data)} />
      <div className="p-4 min-h-[100vh]! pb-[100px]!" style={{ background: token.colorBgLayout }}>
        <div className="mb-4! p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
          <Steps
            current={currentStep}
            onChange={handleStepChange}
            items={[
              { title: t('data-skema-sertifikasi'), status: stepStatuses[0] },
              { title: t('data-kelompok-kerja'), status: stepStatuses[1] },
              { title: t('perangkat-asesmen-muk'), status: stepStatuses[2] },
            ]}
          />
        </div>

        <FormSchemaContext.Provider
          value={{
            schema: dataForm,
            formSchema: form,
            formSchemaFinish: handleFormSchemaFinish,
            formJobGroup: formJbGroup,
            formJobGroupFinish: handleFormJobGroupFinish,
            formAssessmentTools,
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
