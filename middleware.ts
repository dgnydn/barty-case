import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("next-auth.session-token");
  if (!cookie) {
    return NextResponse.redirect("http://localhost:3000/api/auth/signin");
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/user/list",
};
