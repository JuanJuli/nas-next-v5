import { Schema } from '@/types/schema';
import { FormInstance } from 'antd';
import { createContext, useContext } from 'react';

export interface formJobGroupValues {
  job_group_code: string;
  job_group_name: string;
  unit_competencies: {
    unit_competency_code: string;
  }[];
}

export interface FormSchemaContextType {
  schema: Schema | null;
  formSchema: FormInstance | undefined;
  formSchemaFinish?: (values: any) => void;
  jobGroupValues?: formJobGroupValues[];
  formJobGroup?: FormInstance;
  formJobGroupFinish?: (values: any) => void;
  assessmentToolsValues?: any;
  formAssessmentTools?: FormInstance;
  formAssessmentToolsFinish?: (values: any) => void;
  currentStep?: number;
  onBack?: () => void;
  onSave?: () => void;
}

export const FormSchemaContext = createContext<FormSchemaContextType | null>(null);

export const useFormSchemaContext = () => {
  const context = useContext(FormSchemaContext);
  if (!context) {
    throw new Error('useFormSchemaContext must be used within a FormSchemaContext.Provider');
  }
  return context;
};
