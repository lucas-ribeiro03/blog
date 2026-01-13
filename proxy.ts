import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("loginSession")?.value;
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    if (token) {
      const { payload } = await jwtVerify(token, secret);
      if (
        req.nextUrl.pathname.startsWith("/admin") &&
        payload.role !== "admin"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login).*)"],
};
