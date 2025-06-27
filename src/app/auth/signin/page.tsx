"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAlertStore } from "@/store/AlertStore"
import { EmailInput, PasswordInput } from "@/components"
import { useAuthValuesStore } from "@/store/AuthValuesStore"
import Link from "next/link"
import styles from "./page.module.css"



export default function SignIn() {

  const router = useRouter()
  const { showAlert } = useAlertStore(state => state)
  const { email, password, setEmptyAuthFormValues } = useAuthValuesStore(state => state)


  async function checkUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const emailError = findErrorInEmailInputField(email)
    const passwordError = findErrorInPasswordInputField(password)

    if (emailError || passwordError) {
      const newError = [emailError, passwordError].filter(Boolean).join(" ")
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
      setEmptyAuthFormValues()
      showAlert(data.message)
      router.push("/")
    }
    else showAlert(data.error)
  }


  return (
    <section className={styles.section}>
      <div className={styles.hello}>
        <h1>NEFARIOUS.IT</h1>
        <h4>Made With</h4>
        <p>TypeScript, CSS, Next.js, MongoDB, Zustand, JSON Web Token, Bcrypt, Nginx, PM2, WebSocket</p>
        <h4>Deployed On</h4>
        <p>VPS Linux Ubuntu using a secure connections HTTPS and WSS for websocket</p>
        <h4>UX/UI</h4>
        <p>Design and images for the website are my original idea and were created by me using Photoshop</p>
        <h4>Used In Your Browser</h4>
        <p>This website uses cookies, local storage, session storage in your browser. If you do not agree with this, leave it</p>
        <h4>Features</h4>
        <p>Implemented authentication with access and refresh tokens, as well as storing passwords in a hash</p>
      </div>
      <form className={styles.form} onSubmit={checkUser}>
        <h3>Sign in</h3>
        <EmailInput />
        <Link href="">Forgot password?</Link>
        <PasswordInput />
        <div className={styles.remember}>
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
        <button className="authButton" type="button">Sign in</button>
        <p>{`Don't have an account? `}<Link href="/auth/signup">Sign up</Link></p>
      </form>
    </section>

  )
}