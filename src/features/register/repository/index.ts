import { BASE_API_URL } from "@/utils/config";

export async function checkUsername(username: string): Promise<{ exists: boolean }> {
  const res = await fetch(`${BASE_API_URL}auth/check-username/${username}`);
  return res.json();
}

export async function checkEmail(email: string): Promise<{ exists: boolean }> {
  const res = await fetch(`${BASE_API_URL}auth/check-email/${email}`);
  return res.json();
}

export async function checkNik(nik: string): Promise<{ exists: boolean }> {
  const res = await fetch(`${BASE_API_URL}auth/check-nik/${nik}`);
  return res.json();
}

export async function checkLspCode(lspCode: string): Promise<{ valid: boolean }> {
  const res = await fetch(`${BASE_API_URL}auth/check-lsp-code/${lspCode}`);
  return res.json();
}
