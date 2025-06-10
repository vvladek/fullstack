"use client"

import { findErrorInEmailInputField, findErrorInPasswordInputField, findErrorInUsernameInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAppAlertStore } from "@/store/AppAlertStore"
import { ConfirmationInput, EmailInput, PasswordInput, UserNameInput } from "@/components/SignUpComponents"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"



export function SignUpForm() {

  const router = useRouter()
  const { showAlert } = useAppAlertStore(state => state)
  const { username, email, password, confirmedPassword, setEmptySignUpFormValues } = useSignUpValuesStore(state => state)


  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = [
      findErrorInUsernameInputField(username),
      findErrorInEmailInputField(email),
      findErrorInPasswordInputField(password),
      password === confirmedPassword ? "" : "The password and its confirmation do not match."
    ].filter(Boolean).join(" ")

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
      setEmptySignUpFormValues()
      showAlert(data.message)
      router.push("/")
    } else showAlert(data.error + " Please try again.")
  }



  return (
    <form onSubmit={createUser} >
      <UserNameInput />
      <EmailInput />
      <PasswordInput />
      <ConfirmationInput />
      <button type="submit">Sign Up</button>
    </form >
  )
}