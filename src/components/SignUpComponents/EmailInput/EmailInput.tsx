"use client"

import { useEffect, useState } from "react"
import { findErrorInEmailInputField } from "@/lib/auth"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./EmailInput.module.css"



export function EmailInput() {

  const { email, setEmail } = useSignUpValuesStore(state => state)
  const [error, setError] = useState<string>("")


  useEffect(() => {
    if (!email && !error) return
    setError(findErrorInEmailInputField(email))
  }, [email, error])


  return (
    <div className={styles.container}>
      <h5>EMAIL ADDRESS <b>*</b></h5>
      <input
        type="text"
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        style={{
          backgroundColor: `${email && !error ? "#00ff0020" : error ? "#ff000020" : "transparent"}`
        }}
      />
    </div>
  )
}