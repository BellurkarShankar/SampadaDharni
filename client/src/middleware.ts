import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const middleware = async (req: NextRequest) => {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const { pathname } = req.nextUrl;

    const isLoggedIn = !!accessToken;
    const isOnSuperAdminPage = pathname.startsWith("/super-admin");
    const isOnUserPage = pathname.startsWith("/user");
    const isOnAuthPage = pathname.startsWith("/auth");

    if (isLoggedIn) {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // Superadmin route control
      if (payload.role === "SUPERADMIN" && (isOnUserPage || isOnAuthPage)) {
        return NextResponse.redirect(new URL("/super-admin", req.url));
      }

      // User route control
      if (payload.role === "USER" && (isOnSuperAdminPage || isOnAuthPage)) {
        return NextResponse.redirect(new URL("/user", req.url));
      }
    } else {
      if (!isOnAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verify failed:", error);

    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      const response = NextResponse.redirect(new URL("/auth", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const refreshTokenResponse = await fetch(
      "http://localhost:3001/api/auth/refreshToken",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshTokenResponse.ok) {
      const response = NextResponse.redirect(new URL("/auth", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await refreshTokenResponse.json();
    const response = NextResponse.next();
    response.cookies.set(
      "accessToken",
      refreshTokenResponse.headers.get("Set-Cookie") || ""
    );
    return response;
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
