import { useQuery } from "@tanstack/react-query";
import { usePost } from "@/hooks/useMutate";
import { checkUsername, checkEmail, checkNik, checkLspCode } from "../repository";

export function useRegister() {
  return usePost("auth/register");
}

export function useCheckUsername(username: string) {
  return useQuery({
    queryKey: ["check-username", username],
    queryFn: () => checkUsername(username),
    enabled: username.length >= 6,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCheckEmail(email: string) {
  return useQuery({
    queryKey: ["check-email", email],
    queryFn: () => checkEmail(email),
    enabled: email.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCheckNik(nik: string) {
  return useQuery({
    queryKey: ["check-nik", nik],
    queryFn: () => checkNik(nik),
    enabled: nik.length >= 8,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCheckLspCode(lspCode: string) {
  return useQuery({
    queryKey: ["check-lsp-code", lspCode],
    queryFn: () => checkLspCode(lspCode),
    enabled: lspCode.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
