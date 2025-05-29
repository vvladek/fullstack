import bcrypt from "bcrypt"
import { getUsersCollection } from "@/mongo/mongo"
import { Collection } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { User, UserInput } from "@/types/user"



export async function POST(req: NextRequest) {
  try {
    const body: UserInput = await req.json()
    if (!body) return NextResponse.json({ error: "❌ Failed to get req data" }, { status: 500 })

    const saltRounds = 10
    const hash = await bcrypt.hash(body.password, saltRounds)
    if (!hash) return NextResponse.json({ error: "❌ Failed to get password hash" }, { status: 500 })

    const newUser: User = { username: body.username, email: body.email, passwordHash: hash }
    
    const users: Collection<User> = await getUsersCollection()
    await users.insertOne(newUser)
    
    return NextResponse.json({ message: "✅ User created" }, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "❌ Failed to create user" }, { status: 500 })
  }
}