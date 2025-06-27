"use client"

import { useState } from "react"
import { findErrorInPasswordInputField } from "@/lib/auth"
import { useAuthValuesStore } from "@/store/AuthValuesStore"
import styles from "./AuthInputs.module.css"



export function PasswordInput() {

  const { password, setPassword } = useAuthValuesStore(state => state)
  const [error, setError] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  return (
    <div className={styles.container}>
      <input
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Password"
        autoComplete="off"
        className={`${!password ? styles.input : !error ? styles.validInput : styles.invalidInput} authInput`}
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