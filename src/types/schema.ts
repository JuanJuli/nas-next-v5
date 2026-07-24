export interface Kuk {
    row_id: number;
    schema_id: string;
    element_id: string;
    kuk_id: string;
    kuk_name: string;
    kuk_code: string;
    deleted_at: string;
    created_date: string;
    modified_date: string;
    created_by: string;
    modified_by: string;
}

export interface Element {
    row_id: number;
    schema_id: string;
    competency_unit_id: string;
    element_id: string;
    element_name: string;
    element_code: string;
    created_date: string;
    modified_date: string;
    created_by: string;
    modified_by: string;
    kuks: Kuk[];
}

export interface CompetencyUnit {
  row_id: number;
  schema_id: string;
  job_group_id: string[];
  competency_unit_id: string;
  competency_unit_name: string;
  competency_unit_code: string;
  competency_unit_skkni: string;
  competency_unit_skkni_year: string;
  sequence: number;
  deleted_at: string;
  created_date: string;
  modified_date: string;
  created_by: string;
  modified_by: string;
  deleted_by: string;
  job_group: any;
  elements: Element[];
  critical_aspect: CriticalAspect[];
}

export interface CriticalAspect {
    row_id: number;
    aspect: string;
}

export interface Schema {
    row_id: number;
    lsp_id: string;
    schema_id: string;
    schema_code: string;
    schema_name: string;
    schema_license: string;
    schema_category: string;
    schema_skkni: string;
    schema_year: string;
    is_muk2020: boolean;
    competency_required: boolean;
    deleted_at: string;
    created_date: string;
    modified_date: string;
    created_by: string;
    modified_by: string;
    deleted_by: string;
    expired_certificate: string;
    paperbased_method: boolean;
    schema_document: any[];
    competency_unit: CompetencyUnit[];
}