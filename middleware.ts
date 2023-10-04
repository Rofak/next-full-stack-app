// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });
  if (!token && pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return res;
}
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
