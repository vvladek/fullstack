"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"



export default function SignIn() {

  const router = useRouter()
  const [error, setError] = useState<string>("")


  async function checkUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")

    const response: Response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
    if (response.ok) router.push("/")
    else setError("Invalid credentials")
  }


  return (
    <form onSubmit={checkUser}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  )
}