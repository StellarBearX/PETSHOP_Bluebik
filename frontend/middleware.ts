import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isBackendProxyEnabled() {
  return process.env.USE_BACKEND_PROXY === "true";
}

export function middleware(request: NextRequest) {
  if (isBackendProxyEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/api/health") {
    return NextResponse.json({ status: "ok", message: "Frontend mock API is running" }, { status: 200 });
  }

  if (request.method !== "GET") {
    return NextResponse.json(
      { status: "mock", message: "This endpoint is mocked on the frontend", path: pathname },
      { status: 405 }
    );
  }

  return NextResponse.json(
    { status: "mock", message: "This endpoint is mocked on the frontend", path: pathname },
    { status: 200 }
  );
}

export const config = {
  matcher: ["/api/:path*"],
};
