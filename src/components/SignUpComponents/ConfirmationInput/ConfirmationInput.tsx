"use client"

import { useState } from "react"
import { usePasswordStore } from "@/store/PasswordStore"
import styles from "./ConfirmationInput.module.css"



export function ConfirmationInput() {

  const { password } = usePasswordStore(state => state)
  const [value, setValue] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  return (
    <div className={styles.container}>
      <h5>CONFIRM PASSWORD <b>*</b></h5>
      <div>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="confirmed"
          placeholder="Confirm password"
          autoComplete="new-password"
          value={value}
          onChange={(event) => setValue(() => event.target.value)}
          style={{
            backgroundColor: `${value && value === password ? "#00ff0020" : value != password ? "#ff000020" : "transparent"}`
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