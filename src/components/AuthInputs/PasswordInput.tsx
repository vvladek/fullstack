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
      <input
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Password"
        autoComplete="off"
        className={`${!password ? "" : !error ? styles.validInput : styles.invalidInput} UICaseInput`}
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
  )
}