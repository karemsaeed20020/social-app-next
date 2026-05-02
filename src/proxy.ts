import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { ROUTES, routing } from "./core";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = [ROUTES.FEED];

const anonRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const locale =
    routing.locales.find(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
    ) || routing.defaultLocale;

  const checkRoute = (routes: string[]) => {
    const pathWithoutLocale =
      routing.locales.reduce(
        (acc, loc) =>
          acc.startsWith(`/${loc}`) ? acc.replace(`/${loc}`, "") : acc,
        pathname,
      ) || "/";

    return routes.some((route) => {
      if (route === "/") return pathWithoutLocale === "/";
      return (
        pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
      );
    });
  };

  const isProtected = checkRoute(protectedRoutes);
  const isAnon = checkRoute(anonRoutes);

  if (isAnon && token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
