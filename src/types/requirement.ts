import { Applicant } from "./applicant";
import { Element } from "./schema";

export interface FormBuilder {
  row_id: number;
  form_builder_name: string;
  form_builder_url: string;
  form_code: string;
  lsp_id: string | null;
  deleted_at: string | null;
  created_date: string;
  modified_date: string;
  created_by: string;
  modified_by: string;
  deleted_by: string | null;
  preview: boolean;
  preview_master: boolean;
  config_question_bank: any;
}

export interface RequirementFile {
  row_id: number;
  requirement_id: string;
  form_value: string;
  is_read: boolean;
  reader: string;
  filename: string;
  form_object: string;
  created_date: string;
  modified_date: string;
  created_by: string;
  modified_by: string;
  deleted_by: string;
  portofolio_file_id: string;
  is_adm: boolean;
  is_apl: boolean;
}

export interface Requirement {
  row_id: number;
  requirement_id: string;
  applicant_id: string;
  assessment_applicant_id: string;
  requirement_master_id: string;
  element_id: string;
  requirement_name: string;
  requirement_category: string;
  requirement_type: string;
  requirement_template: string;
  form_builder_id: string;
  form_code_id: string;
  schema_id: string;
  test_method: string;
  apl_state: string[];
  acs_state: string[];
  supervisor_state: string[];
  plenary_state: string[];
  is_required: boolean;
  validator: string;
  composer: string;
  lsp_id: string;
  Sequence: number;
  created_date: string;
  modified_date: string;
  created_by: string;
  modified_by: string;
  role_required: {
    acs: boolean;
    apl: boolean;
    plenary: boolean;
    supervisor: boolean;
  };
  form_builder: FormBuilder;
  requirement_file: RequirementFile[];
  element: Element;
  applicant: Applicant;
  schema: any;
  current_role: string;
}