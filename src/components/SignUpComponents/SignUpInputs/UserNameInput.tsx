"use client"

import { useState } from "react"
import { findErrorInUsernameInputField } from "@/lib/auth"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./SignUpInputs.module.css"



export function UserNameInput() {

  const { username, setUsername } = useSignUpValuesStore(state => state)
  const [error, setError] = useState<string>("")


  return (
    <div className={styles.container}>
      <h5 className={styles.usernameH5}>USERNAME <b>*</b></h5>
      <p>Can only contain letters, numbers, dashes, and underscores.</p>
      <input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="username"
        className={`${styles.input} ${!username ? "" : !error ? styles.validInput : styles.invalidInput}`}
        value={username}
        onChange={(event) => {
          setUsername(event.target.value)
          setError(findErrorInUsernameInputField(event.target.value))
        }}
      />
    </div>
  )
}