"use client"

import { useEffect, useState } from "react"
import { findErrorInUsernameInputField } from "@/lib/auth"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./UserNameInput.module.css"



export function UserNameInput() {

  const { username, setUsername } = useSignUpValuesStore(state => state)
  const [error, setError] = useState<string>("")


  useEffect(() => {
    if (!username && !error) return
    setError(findErrorInUsernameInputField(username))
  }, [username, error])


  return (
    <div className={styles.container}>
      <h5>USERNAME <b>*</b></h5>
      <p>Can only contain letters, numbers, dashes, and underscores.</p>
      <input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        style={{
          backgroundColor: `${username && !error ? "#00ff0020" : error ? "#ff000020" : "transparent"}`
        }}
      />
    </div>
  )
}