"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function SignIn() {

  const router = useRouter()
  const [error, setError] = useState<string>("")


  async function checkUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    const emailError = findErrorInEmailInputField(`${email}`)
    const passwordError = findErrorInPasswordInputField(`${password}`)

    if (emailError || passwordError) {
      setError([emailError, passwordError].filter(err => err).join(" "))
      return
    }

    const response: Response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    
    if (response.ok) router.push("/")
    else setError(data.error)
  }


  return (
    <form onSubmit={checkUser}>
      <input
        type="text"
        name="email"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {
        error && <p style={{ color: "red" }}>{error}</p>
      }
    </form>
  )
}