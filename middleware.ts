import { NextResponse, NextRequest } from "next/server";
import { ROUTES } from "./routes";
import { sessionCookieName } from "@/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(sessionCookieName);

  // if session cookie exist we assume that user is authenticated
  if (sessionCookie && pathname === ROUTES.AUTH.LOGIN) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|admin/login|_next/static|_next/image|.*\\.png$).*)"],
};
