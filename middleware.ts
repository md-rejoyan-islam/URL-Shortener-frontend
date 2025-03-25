import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const authCookie = cookieStore.get("token");

  const authenticatedRoute = ["/dashboard", "/analytics"];
  const unauthenticatedRoute = ["/login", "/signup"];
  if (authCookie && authCookie.value) {
    if (authenticatedRoute.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    } else if (unauthenticatedRoute.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (authenticatedRoute.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
