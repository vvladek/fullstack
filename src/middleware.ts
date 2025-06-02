import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"



export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {

  // const permittedPaths: string[] = [
  //   "/",
  //   "/auth/signin",
  //   "/auth/register"
  // ]

  // const { pathname }: { pathname: string } = request.nextUrl

  // if (permittedPaths.includes(pathname) || pathname.includes(".")) return NextResponse.next()

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")

  if (!token) return NextResponse.redirect(new URL("/", request.url))

  return NextResponse.next()
}



export const config = {
  matcher: ["/todolist/:path*"]
}
