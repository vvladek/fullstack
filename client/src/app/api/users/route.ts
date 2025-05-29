import { getUsersCollection } from "@/mongo/mongo"
import { User } from "@/types/user"
import { Collection, WithId } from "mongodb"
import { NextResponse } from "next/server"



export async function GET() {
  try {
    const users: Collection<User> = await getUsersCollection()
    const allUsers: WithId<User>[] = await users.find().toArray()
    return NextResponse.json(allUsers)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "❌ Failed to fetch users" }, { status: 500 })
  }
}