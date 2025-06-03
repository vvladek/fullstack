import { compare } from "bcrypt"
import { getUsersCollection } from "@/mongo/mongo"
import { createAccessToken, createRefreshToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const users = await getUsersCollection()
    const user = await users.findOne({ email })

    if (!user) return NextResponse.json({ error: "User with this email does not exist." }, { status: 404 })
    if (!(await compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "The password is incorrect." }, { status: 401 })
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

    return NextResponse.json({ success: true, message: "The user has been successfully authenticated." }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: `Failed to handle data. ${error}` }, { status: 500 })
  }
}