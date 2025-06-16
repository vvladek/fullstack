"use client"

import { useRouter } from "next/navigation"
import styles from "./page.module.css"


export default function Home() {

  const router = useRouter()


  return (
    <section className={styles.section}>
      <div className={`${styles.container} UICase`}>
        <button className="UICaseButton" onClick={() => router.push("/auth/signin")}>Sign In</button>
        <button className="UICaseButton" onClick={() => router.push("/auth/signup")}>Sign Up</button>
      </div>
    </section>

  )
}