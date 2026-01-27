import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/upload")) {
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // In development, add security headers
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
  }

  // Add security headers for API routes
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; frame-ancestors 'none'; object-src 'none';",
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload", "/api/:path*"],
};
