"use client"

import { useState } from "react"
import { useSignUpValuesStore } from "@/store/SignUpValuesStore"
import styles from "./ConfirmationInput.module.css"



export function ConfirmationInput() {

  const { password, confirmedPassword, setConfirmedPassword } = useSignUpValuesStore(state => state)
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
          value={confirmedPassword}
          onChange={(event) => setConfirmedPassword(event.target.value)}
          style={{
            backgroundColor: `${confirmedPassword && confirmedPassword === password ? "#00ff0020" : confirmedPassword != password ? "#ff000020" : "transparent"}`
          }}
        />
        <button type="button" style={{
            width: "20px",
            height: "var(--auth-input-height)",
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