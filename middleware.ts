import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function onSuccess(req: NextRequest) {
    // Nếu authenticated, cho qua
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Chỉ cho phép nếu có token (đã authenticated)
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Chỉ apply middleware cho /admin route
export const config = {
  matcher: ["/admin/:path*"],
};
