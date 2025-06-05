"use client"

import { useEffect, useState } from "react"
import styles from "./EmailInput.module.css"



export function EmailInput() {

  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")


  useEffect(() => {
    // const timeout: NodeJS.Timeout = setTimeout(() => {

    // }, 250)
    // return () => clearTimeout(timeout)
  }, [value])


  return (
    <div className={styles.container}>
      <h5>EMAIL ADDRESS <b>*</b></h5>
      {/* <p>Can only contain letters, numbers, dashes, and underscores.</p> */}
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={value}
        onChange={(event) => setValue(() => event.target.value)}
      />
    </div>
  )
}