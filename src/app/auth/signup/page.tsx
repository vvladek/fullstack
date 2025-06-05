"use client"

import { UserRegistrationInputData } from "@/types/user"
import { useEffect, useState } from "react"
import { findErrorInEmailInputField, findErrorInPasswordInputField, findErrorInUsernameInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAppAlertStore } from "@/store/AppAlertStore"
import { ConfirmationInput, EmailInput, PasswordInput, UserNameInput } from "@/components"
import styles from "./page.module.css"



const initialInputValues: UserRegistrationInputData = {
  username: "",
  email: "",
  password: "",
  confirmedPassword: ""
}



export default function SignUp() {

  const router = useRouter()
  const { showAlert } = useAppAlertStore(state => state)
  const [values, setValues] = useState<UserRegistrationInputData>(initialInputValues)


  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      findErrorsInForm()
    }, 500)
    return () => clearTimeout(timeout)
  }, [values.username, values.email, values.password, values.confirmedPassword])


  function findErrorsInForm(): void {
    const { username, email, password, confirmedPassword }: UserRegistrationInputData = values
    const errors = [
      !username ? "" : findErrorInUsernameInputField(username),
      !email ? "" : findErrorInEmailInputField(email),
      !password ? "" : findErrorInPasswordInputField(password),
      !confirmedPassword ? "" : password === confirmedPassword ? "" : "The password and its confirmation do not match."
    ].filter(err => err).join(" ")
    if (errors) showAlert(errors)
  }


  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmedPassword = formData.get("confirmed")

    const response: Response = await fetch("/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password, confirmedPassword }),
    })

    const data = await response.json()
    if (response.ok) {
      showAlert(data.message)
      setValues(initialInputValues)
      router.push("/")
    } else {
      showAlert(data.error + " Please try again.")
    }
  }



  return (
    <section className={styles.section}>
      <form onSubmit={createUser}>
        {/* <p>Please fill in all fields of the form.</p> */}
        <UserNameInput />
        <EmailInput />
        <PasswordInput />
        <ConfirmationInput />
        <button type="submit">REGISTER</button>
      </form>
    </section>
  )
}