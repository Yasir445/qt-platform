import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ADMIN_PREFIX = "/admin";
const APP_PREFIXES = [
  "/dashboard",
  "/quarterly-theory",
  "/quarter-sequence",
  "/time-framework",
  "/economic-calendar",
  "/jem-library",
  "/glossary",
  "/research",
  "/journal",
  "/backtesting",
  "/tradingview",
  "/calendar",
  "/bookmarks",
  "/downloads",
  "/community",
  "/settings",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  const isAppRoute = APP_PREFIXES.some((p) => pathname.startsWith(p));

  if ((isAdminRoute || isAppRoute) && !session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute) {
    const role = (session?.user as { role?: string })?.role;
    if (role !== "ADMIN" && role !== "MODERATOR") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
