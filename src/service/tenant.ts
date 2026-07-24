import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { LspByDomain } from "@/types/lsp";
import { BASE_API_URL } from "@/utils/config";

export async function getTenant(domain: string): Promise<DefaultApiResponse<LspByDomain> | null> {
  "use cache";

  const developDomain = 'dev-abi.nasonline.id';

  return fetch(
    `${BASE_API_URL}core/lsp/get-by-domain/${developDomain}`,
    {
      next: { revalidate: 300 }, // 5 menit
    }
  ).then((res) => res.json());
}