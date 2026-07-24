import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("token-generate");
  cookieStore.delete("role_code");
  cookieStore.delete("xt-id")
  return NextResponse.json({ success: true });
}