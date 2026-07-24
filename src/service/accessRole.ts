import { AccessRoleAll } from "@/types/accessRole";
import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { BASE_API_URL } from "@/utils/config";

export async function getAccessRole(roleCode: string): Promise<DefaultApiResponse<AccessRoleAll> | null> {
  "use cache";

  return fetch(
    `${BASE_API_URL}core/access_roles/all?role_code=${roleCode}`,
    {
      next: { revalidate: 3600 }, // 1 jam
    }
  ).then((res) => res.json());
}