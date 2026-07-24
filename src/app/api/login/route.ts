import { BASE_API_URL } from "@/utils/config";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${BASE_API_URL}auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  const response = NextResponse.json({
    data: data,
  });

  const cookieStore = await cookies()

  const token = data.token;
  if (token) {
    // set only for one day
    cookieStore.set("token-generate", token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION', // Only secure in production (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });
  }

  return response;
}