import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { key } = await req.json();

  if (key === "mafooz") {
    const response = NextResponse.json({ success: true });
    response.cookies.set("vault_access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { error: "Invalid conviction key" },
    { status: 401 }
  );
}
