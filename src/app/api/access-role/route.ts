import { BASE_API_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const roleCode = cookieStore.get("role_code")?.value;

  if (!roleCode) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BASE_API_URL}core/access_roles/all?role_code=${roleCode}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Invalid" }, { status: 401 });
  }

  const response = NextResponse.json({
    data: data.data,
  });

  return response;
}