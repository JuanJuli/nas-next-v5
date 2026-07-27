import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Public paths yang tidak memerlukan autentikasi (tanpa prefix locale)
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
];

// Path untuk redirect ke dashboard jika sudah login
const PATH_REDIRECT_DASHBOARD = [
  '/login',
  '/register',
  '/forgot-password',
];

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  const isServerAction = request.headers.has("next-action");

  if (isServerAction) {
    return NextResponse.next();
  }

  // Run next-intl middleware first for locale handling
  const response = intlMiddleware(request) as NextResponse;

  // If intlMiddleware returns a redirect (e.g., adding locale prefix), return it
  if (response.status === 307 || response.status === 308) {
    return response;
  }

  // Extract pathname without locale prefix for authentication checks
  const pathnameWithoutLocale = pathname.replace(/^\/(en|id)/, '') || '/';
  
  // Get token from cookie
  const token = request.cookies.get("token")?.value;

  // Check if path is public
  const isPublicPath = PUBLIC_PATHS.some(path => pathnameWithoutLocale.startsWith(path));

  // Redirect authenticated users away from auth pages
  if (token && PATH_REDIRECT_DASHBOARD.some(path => pathnameWithoutLocale.startsWith(path))) {
    const localeMatch = pathname.match(/^\/(en|id)/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Redirect unauthenticated users to login
  if (!token && !isPublicPath) {
    // add param redirect to login page
    let redirectPath = "";
    const currentPath = pathname + request.nextUrl.search;
    // check current path is not login page
    if (currentPath !== "/" && !currentPath.startsWith("/login") && (currentPath !== "/en" && currentPath !== "/id")) {
      redirectPath = `?redirect=${encodeURIComponent(currentPath)}`;
    }
    const localeMatch = pathname.match(/^\/(en|id)/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/login${redirectPath}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Add custom headers (tenant)
  response.headers.set("x-tenant", subdomain);

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes (start with /api)
    // - Next.js internals (_next, _vercel)
    // - Static assets (logo, thumbnail)
    // - Files with extensions (favicon.ico, etc.)
    '/((?!api|_next|_vercel|logo|thumbnail|.*\\..*).*)',
  ]
};