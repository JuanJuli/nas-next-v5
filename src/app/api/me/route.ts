import { BASE_API_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BASE_API_URL}auth/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }

  const user = await res.json();

  return NextResponse.json(user);
}