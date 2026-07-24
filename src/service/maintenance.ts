import { ConfigApp } from "@/types/configApp";
import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { BASE_API_URL } from "@/utils/config";

export async function checkMaintenance(): Promise<DefaultApiResponse<ConfigApp> | null> {
  "use cache";

  return fetch(
    `${BASE_API_URL}core/config_app/check-maintenance`,
    {
      next: { revalidate: 60 }, // 60 detik
    }
  ).then((res) => res.json());
}