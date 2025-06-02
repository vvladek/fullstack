import bcrypt from "bcrypt"
import { getUsersCollection } from "@/mongo/mongo"
import { Collection } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { User, UserRegistrationInputData } from "@/types/user"



export async function POST(request: NextRequest) {
  try {
    const body: UserRegistrationInputData = await request.json()
    if (!body) return NextResponse.json({ error: "The server did not receive the sent data." }, { status: 500 })

    const saltRounds: number = 10
    const hash: string = await bcrypt.hash(body.password, saltRounds)
    if (!hash) return NextResponse.json({
      error: "The data was received, but there were problems processing it."
    }, { status: 500 })

    const newUser: User = { username: body.username, email: body.email, passwordHash: hash }
    
    const users: Collection<User> = await getUsersCollection()
    await users.insertOne(newUser)
    
    return NextResponse.json({ success: true, message: "New user added successfully." }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: `Failed to create new user. ${error}` }, { status: 500 })
  }
}