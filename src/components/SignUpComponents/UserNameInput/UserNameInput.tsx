"use client"

import { useEffect, useState } from "react"
import { findErrorInUsernameInputField } from "@/lib/auth"
import styles from "./UserNameInput.module.css"

function debounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export function UserNameInput() {

  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")

  const debouncedSetValue = debounce(((value: string) => setValue(value)), 50)


  useEffect(() => {
    if (!value && !error) return
    setError(findErrorInUsernameInputField(value))
  }, [value])


  return (
    <div className={styles.container}>
      <h5>USERNAME <b>*</b></h5>
      <p>Can only contain letters, numbers, dashes, and underscores.</p>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={value}
        onChange={(event) => debouncedSetValue(event.target.value)}
        style={{
          backgroundColor: `${value && !error ? "#00ff0020" : error ? "#ff000020" : "transparent"}`
        }}
      />
    </div>
  )
}