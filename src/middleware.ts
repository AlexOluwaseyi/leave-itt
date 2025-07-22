import { auth } from "../auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import { fileURLToPath } from 'url';
export default async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/settings', '/teams', '/history']

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const { pathname } = request.nextUrl;

  // const isDashboard = pathname.startsWith("/dashboard");
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthPage = pathname === "/auth/signin";

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/settings/:path*",
    "/teams/:path*",
    "/history/:path*",
    // Auth routes
    "/auth/signin",
    "/auth/signup",
  ],
};
