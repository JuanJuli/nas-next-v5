import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { Requirement } from "@/types/requirement";
import { BASE_API_URL } from "@/utils/config";

export async function getRequirement(requirement_id: string, token: string): Promise<DefaultApiResponse<Requirement> | null> {
  "use cache";

  return fetch(
    `${BASE_API_URL}core/requirements/${requirement_id}`,
    {
      next: { revalidate: 300 }, // 5 menit
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
}

export async function getRequirementOwner(requirement_id: string, token: string): Promise<DefaultApiResponse<Requirement> | null> {
  "use cache";

  return fetch(
    `${BASE_API_URL}core/document-form/detail-requirement/${requirement_id}`,
    {
      next: { revalidate: 120 }, // 2 menit
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
}