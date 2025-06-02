import { compare } from "bcrypt"
import { getUsersCollection } from "@/mongo/mongo"
import { createAccessToken, createRefreshToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  const { username, password } = await req.json()
  const users = await getUsersCollection()
  const user = await users.findOne({ username })

  if (!user || !(await compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const payload = { id: user._id, username: user.username }

  const accessToken = createAccessToken(payload)
  const refreshToken = createRefreshToken(payload)
  const cookieStore = await cookies()

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1 * 60,
    path: "/",
    secure: true,
    sameSite: "lax",
  })

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 5 * 60,
    path: "/",
    secure: true,
    sameSite: "lax",
  })


  return NextResponse.json({ message: "HURRRA" })
}