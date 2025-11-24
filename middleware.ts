/* 

checks if user is admin role before allowing access to /admin routes.

check the documentation to get more info

Pros:

⚡ Runs at edge (fastest)
 Blocks unauthorized users before page loads
 Centralized logic (one place)
 Better UX (immediate redirect)

Cons:

 Runs on every request (slight overhead)
 Can't access database directly (only session)
*/
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Specify the routes the middleware applies to
};
