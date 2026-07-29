import { z } from "zod"

export function createSchemaFormSchema(t: (key: string) => string) {
  const r = t("validation-required")

  const KukSchema = z.object({
    kuk_code: z.string().min(1, r),
    kuk_name: z.string().min(1, r),
  })

  const ElementSchema = z.object({
    element_code: z.string().min(1, r),
    element_name: z.string().min(1, r),
    kuks: z.array(KukSchema).min(1, r),
  })

  const UnitCompetencySchema = z.object({
    competency_unit_code: z.string().min(1, r),
    competency_unit_name: z.string().min(1, r),
    sequence: z.string().min(1, r),
    skk: z.string().min(1, r),
    skk_year: z.string().min(1, r),
    critical_aspects: z.array(z.object({ aspect: z.string().min(1, r) })),
    elements: z.array(ElementSchema).min(1, r),
  })

  return z.object({
    schema_code: z.string().min(1, r),
    schema_name: z.string().min(1, r),
    schema_license: z.string().min(1, r),
    schema_skkni: z.string().min(1, r),
    schema_year: z.string().min(1, r),
    competency_unit: z.array(UnitCompetencySchema).min(1, r),
  })
}

export function createJobGroupFormSchema(t: (key: string) => string) {
  const r = t("validation-required")

  const JobGroupItemSchema = z.object({
    job_group_code: z.string().min(1, r),
    job_group_name: z.string().min(1, r),
    unit_competencies: z
      .array(z.object({ unit_competency_code: z.string().min(1, r) }))
      .min(1, r),
  })

  return z.object({
    job_groups: z.array(JobGroupItemSchema).min(1, r),
  })
}

export function createAssessmentToolsFormSchema(t: (key: string) => string) {
  const r = t("validation-required")

  return z.record(
    z.string(),
    z.record(z.string(), z.record(z.string(), z.boolean())),
  )
}
