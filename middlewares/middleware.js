import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  if (req.nextUrl.pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
