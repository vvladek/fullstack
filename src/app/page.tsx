"use client"

import { useRouter } from "next/navigation"
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx"
import styles from "./page.module.css"


export default function Home() {

  const router = useRouter()


  return (
    <>
      <ScrollyVideo src={"/mp4/scrolly-video.mp4"} />
      <section className={styles.section}>
        <div className={`${styles.container} UICase`}>
          <button className="UICaseButton" onClick={() => router.push("/auth/signin")}>Sign In</button>
          <button className="UICaseButton" onClick={() => router.push("/auth/signup")}>Sign Up</button>
        </div>
      </section>
    </>

  )
}