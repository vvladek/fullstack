"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField, findErrorInUsernameInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAppAlertStore } from "@/store/AppAlertStore"
import { ConfirmationInput, EmailInput, PasswordInput, UserNameInput } from "@/components"
import styles from "./page.module.css"



export default function SignUp() {

  const router = useRouter()
  const { showAlert } = useAppAlertStore(state => state)


  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmedPassword = formData.get("confirmed")

    const errors = [
      findErrorInUsernameInputField(`${username}`),
      findErrorInEmailInputField(`${email}`),
      findErrorInPasswordInputField(`${password}`),
      password === confirmedPassword ? "" : "The password and its confirmation do not match."
    ].filter(err => err).join(" ")

    if (errors) {
      showAlert(errors)
      return
    }

    const response: Response = await fetch("/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password, confirmedPassword }),
    })

    const data = await response.json()
    if (response.ok) {
      showAlert(data.message)
      router.push("/")
    } else showAlert(data.error + " Please try again.")
  }



  return (
    <section className={styles.section}>
      <form autoComplete="on" onSubmit={createUser}>
        <UserNameInput />
        <EmailInput />
        <PasswordInput />
        <ConfirmationInput />
        <input className={styles.submit} type="submit" value="Sign Up" />
      </form>
    </section>
  )
}