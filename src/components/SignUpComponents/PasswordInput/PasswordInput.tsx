"use client"

import { useEffect, useState } from "react"
import styles from "./PasswordInput.module.css"



export function PasswordInput() {

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
      <h5>PASSWORD <b>*</b></h5>
      <p>Use a strong password that contains at least the following:<br/>8 characters, one lowercase letter, one uppercase letter, one number, one special character.</p>
      <div>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
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