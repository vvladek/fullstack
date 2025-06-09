"use client"

import { useState } from "react"
import { findErrorInPasswordInputField } from "@/lib/auth"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./SignUpInputs.module.css"



export function PasswordInput() {

  const { password, setPassword } = useSignUpValuesStore(state => state)
  const [error, setError] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  return (
    <div className={styles.container}>
      <h5 className={styles.passwordH5}>PASSWORD <b>*</b></h5>
      <p>Use a strong password that contains at least the following:<br />8 characters, one lowercase letter, one uppercase letter, one number, one special character.</p>
      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="#eXaMpLe-4U!"
          autoComplete="new-password"
          className={`${styles.input} ${!password ? "" : !error ? styles.validInput : styles.invalidInput}`}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError(findErrorInPasswordInputField(event.target.value))
          }}
        />
        <button
          type="button"
          className={isPasswordVisible ? "" : styles.crossedButton}
          onClick={() => setIsPasswordVisible(state => !state)}
        />
      </div>
    </div>
  )
}