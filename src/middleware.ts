import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"



export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")
  const { pathname }: { pathname: string } = request.nextUrl

  if (token && pathname.startsWith("/auth")) return NextResponse.redirect(new URL("/", request.url))

  if (!token && !(pathname.startsWith("/auth"))) return NextResponse.redirect(new URL("/", request.url))

  return NextResponse.next()
}



export const config = {
  matcher: ["/todolist/:path*", "/auth/:path*"]
}
