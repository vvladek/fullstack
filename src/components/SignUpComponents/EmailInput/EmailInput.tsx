"use client"

import { useEffect, useState } from "react"
import { findErrorInEmailInputField } from "@/lib/auth"
import styles from "./EmailInput.module.css"



export function EmailInput() {

  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")


  useEffect(() => {
    if (!value && !error) return
    setError(findErrorInEmailInputField(value))
  }, [value])


  return (
    <div className={styles.container}>
      <h5>EMAIL ADDRESS <b>*</b></h5>
      <input
        type="text"
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={value}
        onChange={(event) => setValue(() => event.target.value)}
        style={{
          backgroundColor: `${value && !error ? "#00ff0020" : error ? "#ff000020" : "transparent"}`
        }}
      />
    </div>
  )
}