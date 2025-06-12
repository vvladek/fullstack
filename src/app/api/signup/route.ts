import bcrypt from "bcrypt"
import { getUsersCollection } from "@/mongo/mongo"
import { Collection } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { User, UserRegistrationInputData } from "@/types/user"
import { createAccessToken, createRefreshToken, findErrorInEmailInputField, findErrorInPasswordInputField, findErrorInUsernameInputField } from "@/lib/auth"
import { cookies } from "next/headers"



export async function POST(request: NextRequest) {
  try {
    const body: UserRegistrationInputData = await request.json()
    if (!body) return NextResponse.json({ error: "The server did not receive the sent data." }, { status: 400 })

    const { username, email, password } = body

    const usernameError: string = findErrorInUsernameInputField(username)
    const emailError: string = findErrorInEmailInputField(email)
    const passwordError: string = findErrorInPasswordInputField(password)

    if (!username || usernameError) return NextResponse.json({ error: usernameError }, { status: 422 })
    if (!email || emailError) return NextResponse.json({ error: emailError }, { status: 422 })
    if (!password || passwordError) return NextResponse.json({ error: passwordError }, { status: 422 })

    const users: Collection<User> = await getUsersCollection()
    const existingUser = await users.findOne({ email })
    if (existingUser) return NextResponse.json({ error: "User with this email already exists." }, { status: 409 })

    const saltRounds: number = 10
    const hash: string = await bcrypt.hash(password, saltRounds)
    if (!hash) return NextResponse.json({
      error: "The data was received, but there were problems processing it."
    }, { status: 500 })

    const newUser: User = { username, email, passwordHash: hash }
    await users.insertOne(newUser)

    const payload = { username, email }

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

    return NextResponse.json({ success: true, message: "New user added successfully." }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: `Failed to create new user. ${error}` }, { status: 500 })
  }
}