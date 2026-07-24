import { DefaultApiResponse } from "@/types/defaultApiResponse";
import { Schema } from "@/types/schema";
import { BASE_API_URL } from "@/utils/config";

export async function getSchema(schemaId: string, token: string): Promise<DefaultApiResponse<Schema> | null> {
  return fetch(
    `${BASE_API_URL}core/schemas/${schemaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
}
