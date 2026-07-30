import { z } from "zod"

export const registerSchema = z.object({
  role_code: z.enum(["APL", "ACS"], { message: "Please select user type" }),

  username: z
    .string()
    .min(1, "Please input your username!")
    .min(6, "Username must be at least 6 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Only letters, numbers, and underscore"),

  email: z
    .string()
    .min(1, "Please input your email!")
    .email("Please enter a valid email!"),

  password: z
    .string()
    .min(1, "Please input your password!"),

  nik: z
    .string()
    .min(1, "Please input your NIK!")
    .refine(
      (val) => {
        if (val.length >= 8 && val.length <= 16) return true
        return /^\d+$/.test(val) && val.length >= 8
      },
      { message: "NIK must be 8-16 digits" }
    ),

  full_name: z
    .string()
    .min(1, "Please input your full name!"),

  place_of_birth: z
    .string()
    .min(1, "Please input your place of birth!"),

  date_of_birth: z
    .date({ message: "Please select your date of birth" })
    .refine((date) => {
      const minAge = new Date()
      minAge.setFullYear(minAge.getFullYear() - 15)
      return date <= minAge
    }, { message: "You must be at least 15 years old" }),

  gender_code: z
    .string()
    .min(1, "Please select your gender!"),

  nationality: z
    .string()
    .optional(),

  contact: z
    .string()
    .min(1, "Please input your contact number!"),

  jobs_code: z
    .string()
    .min(1, "Please select your job!"),

  nip: z
    .string()
    .optional(),

  last_education: z
    .string()
    .min(1, "Please input last education!"),

  address: z
    .string()
    .optional(),

  registration_number: z
    .string()
    .optional(),

  lsp_code: z
    .string()
    .optional(),

  signature: z
    .any()
    .optional(),
}).superRefine((data, ctx) => {
  if (data.role_code === "ACS") {
    if (!data.last_education || data.last_education.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Please select your last education!",
        path: ["last_education"],
      })
    }
    if (!data.address || data.address.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Please input your address!",
        path: ["address"],
      })
    }
    if (!data.registration_number || data.registration_number.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Please input your registration number!",
        path: ["registration_number"],
      })
    }
  }

  if (data.role_code === "APL") {
    if (!data.nationality || data.nationality.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Please select your nationality!",
        path: ["nationality"],
      })
    }
  }
})

export type RegisterFormValues = z.infer<typeof registerSchema>
