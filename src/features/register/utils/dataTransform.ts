export function capitalizeWords(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeContact(value: string): string {
  const cleaned = value.replace(/\s/g, "");
  if (cleaned.startsWith("0")) {
    return `62${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith("+")) {
    return cleaned.slice(1);
  }
  if (cleaned.startsWith("62")) {
    return cleaned;
  }
  return `62${cleaned}`;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function prependMET(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("MET.")) return trimmed;
  return `MET.${trimmed}`;
}

export function buildRegisterFormData(values: Record<string, string | File | undefined | null>): FormData {
  const fd = new FormData();
  const fields = [
    "role_code",
    "username",
    "email",
    "password",
    "nik",
    "full_name",
    "place_of_birth",
    "gender_code",
    "nationality",
    "contact",
    "jobs_code",
    "nip",
    "last_education",
    "address",
    "registration_number",
    "lsp_code",
  ];

  for (const key of fields) {
    const val = values[key];
    if (val !== undefined && val !== null && val !== "") {
      fd.append(key, String(val));
    }
  }

  if (values.date_of_birth && typeof values.date_of_birth === 'string') {
    const newDateOfBirth = new Date(values.date_of_birth)
    fd.append("date_of_birth", formatDate(newDateOfBirth));
  }

  if (values.signature && values.signature instanceof File) {
    fd.append("signature", values.signature);
  }

  return fd;
}
