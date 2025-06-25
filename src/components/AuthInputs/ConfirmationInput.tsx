"use client"

import { useState } from "react"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./SignUpInputs.module.css"



export function ConfirmationInput() {

  const { password, confirmedPassword, setConfirmedPassword } = useSignUpValuesStore(state => state)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  return (
    <div className={styles.container}>
      <input
        type={isPasswordVisible ? "text" : "password"}
        name="confirmed"
        placeholder="Confirm Password"
        autoComplete="off"
        className={
          `${!confirmedPassword ? "" :
            confirmedPassword === password ? styles.validInput : styles.invalidInput} UICaseInput`
        }
        value={confirmedPassword}
        onChange={(event) => setConfirmedPassword(event.target.value)}
      />
      <button
        type="button"
        className={isPasswordVisible ? "" : styles.crossedButton}
        onClick={() => setIsPasswordVisible(state => !state)}
      />
    </div>
  )
}