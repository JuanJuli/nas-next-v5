import ConfigurationEform from "@/features/schema/components/configuration/ConfigurationEform"
import { getSchema } from "@/service/schema"
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ param: string[] }>
}) {
  const { param } = await params
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const schemaData = await getSchema(param[0], token ?? '')

  return <ConfigurationEform params={param} schemaData={schemaData?.data} />
}