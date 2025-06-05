"use client"

import { useEffect, useState } from "react"
import styles from "./ConfirmationInput.module.css"



export function ConfirmationInput() {

  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)


  useEffect(() => {
    // const timeout: NodeJS.Timeout = setTimeout(() => {

    // }, 250)
    // return () => clearTimeout(timeout)
  }, [value])


  return (
    <div className={styles.container}>
      <h5>CONFIRM PASSWORD <b>*</b></h5>
      {/* <p>Use a strong password that contains at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, at least one special character.</p> */}
      <div>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="confirmed"
          placeholder="Confirm password"
          value={value}
          onChange={(event) => setValue(() => event.target.value)}
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