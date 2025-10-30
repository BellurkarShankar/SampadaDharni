import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  try {
    const session = req.cookies;
    console.log("its middleware ");
    console.log(req.url);

    const isOnHome = req.nextUrl.pathname.startsWith("/");
    const isLoggedIn = !!session;

    console.log("isOnHome :", isOnHome);
    console.log("isLoggedIn ", isLoggedIn);

    console.log(session, "session");
  } catch (error) {
    console.log(error);
  }
};
export const config = {
  matcher: "/:path*",
};
export default middleware;
