import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_EMAIL = "dominasihijau316@gmail.com";

function clean(val: string | undefined): string {
  return (val ?? "").split("").filter(c => c.charCodeAt(0) !== 0xFEFF).join("").replace(/[\r\n]/g, "").trim();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run Supabase auth check for /admin routes
  if (pathname.startsWith("/admin")) {
    try {
      let response = NextResponse.next({ request });

      const supabase = createServerClient(
        clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        {
          cookies: {
            getAll() { return request.cookies.getAll(); },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              response = NextResponse.next({ request });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }

      return response;
    } catch {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // All other routes — pass through without touching auth
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
