"use client"

import { useState } from "react"
import { findErrorInEmailInputField } from "@/lib/auth"
import { useAuthValuesStore } from "@/store/AuthValuesStore"
import styles from "./AuthInputs.module.css"



export function EmailInput() {

  const { email, setEmail } = useAuthValuesStore(state => state)
  const [error, setError] = useState<string>("")


  return (
    <div className={styles.container}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        autoComplete="off"
        className={`${!email ? "" : !error ? styles.validInput : styles.invalidInput} UICaseInput`}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          setError(findErrorInEmailInputField(event.target.value))
        }}
      />
    </div>
  )
}