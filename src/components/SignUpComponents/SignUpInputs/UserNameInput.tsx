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
      <input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="off"
        className={`${!username ? "" : !error ? styles.validInput : styles.invalidInput} UICaseInput`}
        value={username}
        onChange={(event) => {
          setUsername(event.target.value)
          setError(findErrorInUsernameInputField(event.target.value))
        }}
      />
    </div>
  )
}