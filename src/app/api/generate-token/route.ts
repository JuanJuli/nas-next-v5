import { BASE_API_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token-generate")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await fetch(`${BASE_API_URL}auth/generate-token`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Invalid" }, { status: 401 });
  }

  const response = NextResponse.json({
    data: data.data,
  });

  if (body.role_code) {
    cookieStore.set("role_code", body.role_code, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production', // Only secure in production (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });
  }

  if (body.lsp_id) {
    cookieStore.set("xt-id", body.lsp_id, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production', // Only secure in production (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });
  }

  if (data.token) {
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production', // Only secure in production (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });

    cookieStore.delete("token-generate");
  }

  return response;
}