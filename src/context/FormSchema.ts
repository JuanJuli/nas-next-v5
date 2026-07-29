import { Schema } from '@/types/schema';
import { UseFormReturn } from 'react-hook-form';
import { createContext, useContext } from 'react';

export interface SchemaFormValues {
  schema_code: string;
  schema_name: string;
  schema_license: string;
  schema_skkni: string;
  schema_year: string;
  competency_unit: {
    competency_unit_code: string;
    competency_unit_name: string;
    sequence: string;
    skk: string;
    skk_year: string;
    critical_aspects: { aspect: string }[];
    elements: {
      element_code: string;
      element_name: string;
      kuks: { kuk_code: string; kuk_name: string }[];
    }[];
  }[];
}

export interface JobGroupFormValues {
  job_groups: {
    job_group_code: string;
    job_group_name: string;
    unit_competencies: {
      unit_competency_code: string;
    }[];
  }[];
}

export interface AssessmentToolsFormValues {
  [category: string]: {
    [group: string]: {
      [toolCode: string]: boolean;
    };
  };
}

export interface FormSchemaContextType {
  schema: Schema | null;
  formSchema: UseFormReturn<SchemaFormValues> | undefined;
  formSchemaFinish?: (values: SchemaFormValues) => void;
  jobGroupValues?: JobGroupFormValues['job_groups'];
  formJobGroup: UseFormReturn<JobGroupFormValues> | undefined;
  formJobGroupFinish?: (values: JobGroupFormValues) => void;
  assessmentToolsValues?: AssessmentToolsFormValues;
  formAssessmentTools: UseFormReturn<AssessmentToolsFormValues> | undefined;
  formAssessmentToolsFinish?: (values: AssessmentToolsFormValues) => void;
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


