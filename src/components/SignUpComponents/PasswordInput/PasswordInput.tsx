"use client"

import { useEffect, useState } from "react"
import { findErrorInPasswordInputField } from "@/lib/auth"
import { usePasswordStore } from "@/store/PasswordStore"
import styles from "./PasswordInput.module.css"



export function PasswordInput() {

  const { password, setPassword } = usePasswordStore(state => state)
  const [error, setError] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  useEffect(() => {
    if (!password && !error) return
    setError(findErrorInPasswordInputField(password))
  }, [password])


  return (
    <div className={styles.container}>
      <h5>PASSWORD <b>*</b></h5>
      <p>Use a strong password that contains at least the following:<br />8 characters, one lowercase letter, one uppercase letter, one number, one special character.</p>
      <div>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{
            backgroundColor: `${password && !error ? "#00ff0020" : error ? "#ff000020" : "transparent"}`
          }}
        />
        <button
          type="button"
          style={{
            width: "20px",
            aspectRatio: "1 / 1",
            backgroundImage: `url(/svg/eye${isPasswordVisible ? "" : "-crossed"}.svg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "20px",
            position: "absolute",
            right: "10px",
            cursor: "pointer"
          }}
          onClick={() => setIsPasswordVisible(state => !state)}
        />
      </div>
    </div>
  )
}