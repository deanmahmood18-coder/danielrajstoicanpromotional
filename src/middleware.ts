import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow vault page, API routes, static files, and Next.js internals
  if (
    pathname === "/vault" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/media/") ||
    pathname.startsWith("/preview/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check for vault access cookie
  const vaultAccess = request.cookies.get("vault_access");
  if (vaultAccess?.value === "granted") {
    return NextResponse.next();
  }

  // Redirect to vault
  const vaultUrl = new URL("/vault", request.url);
  return NextResponse.redirect(vaultUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
