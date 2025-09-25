import { NextResponse, NextRequest } from "next/server";
import { ROUTES } from "./routes";

const protectedRoutes = ["/admin/*"];
const publicRoutes = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionName = process.env.API_SESSION_COOKIE_NAME || "";
  const sessionCookie = request.cookies.get(sessionName);

  const { pathname } = request.nextUrl;

  if (sessionCookie && pathname === ROUTES.AUTH.LOGIN) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
