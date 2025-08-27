import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect unauthenticated users to the login page
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    loginUrl.searchParams.set("error", "unauthorized");

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/"], // Apply middleware to specific routes
};
