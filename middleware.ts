import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminAuthToken = request.cookies.get("admin_auth_token");

  // If user is trying to access dashboard routes without being authenticated
  if (pathname.startsWith("/dashboard")) {
    if (!adminAuthToken) {
      // Redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If user is trying to access login page while already authenticated
  if (pathname === "/login") {
    if (adminAuthToken) {
      // Redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
