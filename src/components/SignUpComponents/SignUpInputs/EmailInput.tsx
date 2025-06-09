"use client"

import { useState } from "react"
import { findErrorInEmailInputField } from "@/lib/auth"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./SignUpInputs.module.css"



export function EmailInput() {

  const { email, setEmail } = useSignUpValuesStore(state => state)
  const [error, setError] = useState<string>("")


  return (
    <div className={styles.container}>
      <h5 className={styles.emailH5}>EMAIL ADDRESS <b>*</b></h5>
      <input
        type="text"
        name="email"
        placeholder="Email"
        autoComplete="email"
        className={`${styles.input} ${!email ? "" : !error ? styles.validInput : styles.invalidInput}`}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          setError(findErrorInEmailInputField(event.target.value))
        }}
      />
    </div>
  )
}