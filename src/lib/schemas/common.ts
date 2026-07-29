import { z } from "zod"

type TFunction = (key: string, params?: Record<string, string | number>) => string

export function createErrorMap(t: TFunction): z.ZodErrorMap {
  return (issue) => {
    const path = issue.path?.join(".") ?? ""

    switch (issue.code) {
      case z.ZodIssueCode.too_small: {
        if (issue.type === "string") {
          return { message: t("field-required", { field: path }) }
        }
        break
      }
      case z.ZodIssueCode.invalid_format: {
        if (issue.format === "email") {
          return { message: t("email-invalid") }
        }
        break
      }
      case z.ZodIssueCode.custom: {
        return { message: issue.message ?? t("field-required", { field: path }) }
      }
    }
    return { message: issue.message ?? t("field-required", { field: path }) }
  }
}

export function createRequiredString(
  t: TFunction,
  fieldLabel: string
) {
  return z
    .string()
    .min(1, t("field-required", { field: fieldLabel }))
}

export function createEmailString() {
  return z.string().email()
}

export function createDateString(
  t: TFunction,
  fieldLabel: string
) {
  return z
    .string()
    .min(1, t("field-required", { field: fieldLabel }))
    .date()
}

export function createSchemaFactory(t: TFunction) {
  return {
    requiredString: (labelKey: string) => createRequiredString(t, t(labelKey)),
    emailString: () => createEmailString(),
    dateString: (labelKey: string) => createDateString(t, t(labelKey)),
  }
}
