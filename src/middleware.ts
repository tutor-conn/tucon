import { tuconApi } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRouteFromUserLastView } from "./lib/utils";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const isLoggedIn = request.cookies.has("session");

    if (isLoggedIn) {
      let me: Awaited<ReturnType<typeof tuconApi.me>>;

      try {
        me = await tuconApi.me({ headers: request.headers });
      } catch (err) {
        console.error("middleware error:", err);
        return;
      }

      if (me.userId === null) {
        // Session is invalid, delete the cookie
        request.cookies.delete("session");
        return;
      }

      const route = getRouteFromUserLastView(me.lastView);

      if (route) {
        console.log(`middleware: redirecting logged in user to ${route}`);
        return NextResponse.redirect(new URL(route, request.url));
      }
    }
  }
}
