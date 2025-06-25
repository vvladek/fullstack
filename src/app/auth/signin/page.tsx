"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAlertStore } from "@/store/AlertStore"
import { EmailInput, PasswordInput } from "@/components"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./page.module.css"



export default function SignIn() {

  const router = useRouter()
  const { showAlert } = useAlertStore(state => state)
  const { email, password, setEmptySignUpFormValues } = useSignUpValuesStore(state => state)


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
      setEmptySignUpFormValues()
      showAlert(data.message)
      router.push("/")
    }
    else showAlert(data.error)
  }


  return (
    <section className={styles.section}>
      <form className={`${styles.form} UICase`} onSubmit={checkUser}>
        <EmailInput />
        <PasswordInput />
        <button className="UICaseButton" type="submit">Login</button>
      </form>
    </section>

  )
}