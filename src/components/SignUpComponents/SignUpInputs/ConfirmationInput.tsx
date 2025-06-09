"use client"

import { useState } from "react"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./SignUpInputs.module.css"



export function ConfirmationInput() {

  const { password, confirmedPassword, setConfirmedPassword } = useSignUpValuesStore(state => state)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  return (
    <div className={styles.container}>
      <h5 className={styles.confirmationH5}>CONFIRM PASSWORD <b>*</b></h5>
      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="confirmed"
          placeholder="Confirm password"
          autoComplete="new-password"
          className={`${styles.input} ${!confirmedPassword ? "" : confirmedPassword === password ?
            styles.validInput : styles.invalidInput}`}
          value={confirmedPassword}
          onChange={(event) => setConfirmedPassword(event.target.value)}
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