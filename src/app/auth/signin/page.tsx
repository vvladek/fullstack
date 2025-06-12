"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAppAlertStore } from "@/store/AppAlertStore"
import styles from "./page.module.css"



export default function SignIn() {

  const router = useRouter()
  const { showAlert } = useAppAlertStore(state => state)


  async function checkUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const emailError = findErrorInEmailInputField(email)
    const passwordError = findErrorInPasswordInputField(password)

    if (emailError || passwordError) {
      const newError = [emailError, passwordError].filter(err => err).join(" ")
      showAlert(newError)
      return
    }

    const response: Response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      showAlert(data.message)
      router.push("/")
    }
    else showAlert(data.error)
  }


  return (
    <section className={styles.section}>
      <form className={`${styles.form} UICase`} onSubmit={checkUser}>
        <input
          className="UICaseInput"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="UICaseInput"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="UICaseButton" type="submit">Login</button>
      </form>
    </section>

  )
}