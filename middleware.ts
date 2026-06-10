import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Protect /session route
    if (pathname.startsWith("/session")) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/?auth=required", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public access to landing page
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        // Require auth for /session
        if (req.nextUrl.pathname.startsWith("/session")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/session/:path*"],
};
