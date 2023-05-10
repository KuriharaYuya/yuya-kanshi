import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | Response {
  // Check if the path starts with /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const auth = basicAuth.split(" ")[1];
      const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");
      if (
        user === process.env.NEXT_PUBLIC_USER &&
        pwd === process.env.NEXT_PUBLIC_PASS
      ) {
        return NextResponse.next();
      }
    }

    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // If the path is not /admin, proceed without applying the middleware
  return NextResponse.next();
}
