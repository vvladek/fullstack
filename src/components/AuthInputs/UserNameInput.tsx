"use client"

import { useState } from "react"
import { findErrorInUsernameInputField } from "@/lib/auth"
import { useAuthValuesStore } from "@/store/AuthValuesStore"
import styles from "./AuthInputs.module.css"



export function UserNameInput() {

  const { username, setUsername } = useAuthValuesStore(state => state)
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