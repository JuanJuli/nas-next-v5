import { z } from "zod"
import { createSchemaFactory } from "./common"

type TFunction = (key: string, params?: Record<string, string | number>) => string

export function createEformSchemas(t: TFunction) {
  const { requiredString, emailString } = createSchemaFactory(t)

  const personalSchema = z.object({
    namaLengkap: requiredString("full-name"),
    noKTP: requiredString("nik"),
    tempatLahir: requiredString("birth-place"),
    tanggalLahir: z.date({ message: t("field-required", { field: t("form", { key: "birth-date" }) }) }),
    jenisKelamin: requiredString("gender"),
    kebangsaan: requiredString("nationality"),
    alamat: requiredString("address"),
    kodePos: requiredString("postal-code"),
    telpRumah: z.string().optional().or(z.literal("")),
    telpKantor: z.string().optional().or(z.literal("")),
    telpHP: requiredString("phone-mobile"),
    email: emailString().or(z.literal("")),
    namaInstitusi: requiredString("institution-name"),
    jabatan: requiredString("position"),
    alamatKantor: requiredString("office-address"),
    kodePosKantor: requiredString("office-postal-code"),
    telpKantorPerusahaan: z.string().optional().or(z.literal("")),
    faxKantor: z.string().optional().or(z.literal("")),
    emailKantor: z.string().email().optional().or(z.literal("")),
  })

  return { personalSchema }
}

export type PersonalFormData = z.infer<ReturnType<typeof createEformSchemas>["personalSchema"]>
