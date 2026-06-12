import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const isAuthRoute = url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/register") ||
    url.pathname.startsWith("/forgot-password") ||
    url.pathname.startsWith("/reset-password") ||
    url.pathname.startsWith("/verify-email") ||
    url.pathname.startsWith("/invite") ||
    url.pathname.startsWith("/join")

  const isPublicRoute = url.pathname === "/" ||
    url.pathname.startsWith("/features") ||
    url.pathname.startsWith("/pricing") ||
    url.pathname.startsWith("/about") ||
    url.pathname.startsWith("/contact") ||
    url.pathname.startsWith("/legal") ||
    url.pathname.startsWith("/security") ||
    url.pathname.startsWith("/apps") ||
    url.pathname.startsWith("/integrations") ||
    url.pathname.startsWith("/book-demo") ||
    url.pathname.startsWith("/customers") ||
    url.pathname.startsWith("/blog")

  const isAppRoute = url.pathname.startsWith("/app")
  const isAdminRoute = url.pathname.startsWith("/admin")
  const isPortalRoute = url.pathname.startsWith("/portal")
  const isOnboardingRoute = url.pathname.startsWith("/onboarding")

  if (!user && (isAppRoute || isAdminRoute || isOnboardingRoute)) {
    url.pathname = "/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    url.pathname = "/app/home"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
