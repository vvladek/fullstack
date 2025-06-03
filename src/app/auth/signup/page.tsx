"use client"

import { UserRegistrationInputData } from "@/types/user"
import { useEffect, useState } from "react"
import { findErrorInEmailInputField, findErrorInPasswordInputField, findErrorInUsernameInputField } from "@/lib/auth"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"



const initialInputValues: UserRegistrationInputData = {
  username: "",
  email: "",
  password: "",
  confirmedPassword: ""
}



export default function SignUp() {

  const router = useRouter()
  const [error, setError] = useState<string>("Please fill in all fields of the form.")
  const [values, setValues] = useState<UserRegistrationInputData>(initialInputValues)


  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      findErrorsInForm()
    }, 1000)
    return () => clearTimeout(timeout)
  }, [values.username, values.email, values.password, values.confirmedPassword])


  function findErrorsInForm(): void {
    const { username, email, password, confirmedPassword }: UserRegistrationInputData = values
    const usernameError: string = findErrorInUsernameInputField(username)
    const emailError: string = findErrorInEmailInputField(email)
    const passwordError: string = findErrorInPasswordInputField(password)
    const confirmationError: string = password === confirmedPassword ? "" : "Different passwords were entered in the password and password confirmation fields."
    setError([
      !username ? "" : usernameError,
      !email ? "" : emailError,
      !password ? "" : passwordError,
      !confirmedPassword ? "" : confirmationError,
      !username || !email || !password || !confirmedPassword ? "Please fill in all fields of the form." : ""
    ].filter(err => err).join(" "))
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
      setValues(initialInputValues)
      setError(data.message)
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } else {
      setError(data.error + " Please try again.")
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }



  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={createUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={(event) => setValues((state) => ({ ...state, username: event.target.value }))}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(event) => setValues((state) => ({ ...state, email: event.target.value }))}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={(event) => setValues((state) => ({ ...state, password: event.target.value }))}
        />
        <input
          type="password"
          name="confirmed"
          placeholder="Confirm password"
          value={values.confirmedPassword}
          onChange={(event) => setValues((state) => ({ ...state, confirmedPassword: event.target.value }))}
        />
        {
          error && <p>{error}</p>
        }
        {
          !error && <button type="submit">Register</button>
        }
      </form>
    </section>
  )
}