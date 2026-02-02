import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);

function uploadSubdomainRewrite(request: NextRequest) {
  const hostname = request.headers.get("host") ?? request.nextUrl.hostname;
  const url = request.nextUrl.clone();

  // Rewrite upload subdomain root (upload.*/) to /upload, preserving query (e.g. job_id)
  if (hostname.startsWith("upload.") && url.pathname === "/") {
    url.pathname = "/upload";
    return NextResponse.rewrite(url);
  }
  return null;
}

export default clerkMiddleware(async (_auth, request) => {
  const rewrite = uploadSubdomainRewrite(request);
  if (rewrite) return rewrite;
  if (!isPublicRoute(request)) await _auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
