import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "access_token";

function normalizeRole(role: string | null): string | null {
  if (!role) return null;

  const normalized = role.toLowerCase();
  if (normalized === "coco") return "coco";
  if (normalized === "opcs") return "opc";
  if (normalized === "apc") return "apc";

  return normalized;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = atob(padded);

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function roleHomePath(role: string | null): string {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === "admin") return "/coco";
  if (normalizedRole === "apc") return "/apc";
  if (normalizedRole === "opc") return "/opc";
  return "/auth";
}

function isRoleAllowedForPath(pathname: string, role: string | null): boolean {
  const normalizedRole = normalizeRole(role);

  if (pathname.startsWith("/coco")) return normalizedRole === "coco";
  if (pathname.startsWith("/apc")) return normalizedRole === "apc";
  if (pathname.startsWith("/opc")) return normalizedRole === "opc";
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthPage = pathname.startsWith("/auth");

  if (!token) {
    if (isAuthPage) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  const payload = decodeJwtPayload(token);
  const now = Math.floor(Date.now() / 1000);
  const exp = typeof payload?.exp === "number" ? payload.exp : null;
  const role = normalizeRole(typeof payload?.role === "string" ? payload.role : null);

  if (!payload || (exp !== null && exp <= now)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    const response = NextResponse.redirect(url);
    response.cookies.delete(AUTH_COOKIE);
    return response;
  }

  if (isAuthPage) {
    const url = request.nextUrl.clone();
    const targetPath = roleHomePath(role);

    if (targetPath === pathname) {
      return NextResponse.next();
    }

    url.pathname = targetPath;
    return NextResponse.redirect(url);
  }

  if (!isRoleAllowedForPath(pathname, role)) {
    const url = request.nextUrl.clone();
    const targetPath = roleHomePath(role);

    if (targetPath === pathname) {
      return NextResponse.next();
    }

    url.pathname = targetPath;
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    const targetPath = roleHomePath(role);

    if (targetPath === pathname) {
      return NextResponse.next();
    }

    url.pathname = targetPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
