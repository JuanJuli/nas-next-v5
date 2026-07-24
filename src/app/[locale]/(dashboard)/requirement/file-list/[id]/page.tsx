import FileList from "@/features/requirement/components/FileList";
import { getRequirementOwner } from "@/service/requirement";
import { cookies } from "next/headers";

export default async function Page({ params }: {  params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const resRequirement = await getRequirementOwner(id, token ?? '');

  return (
    <FileList requirementData={resRequirement?.data} />
  )
}
