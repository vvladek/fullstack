import Link from "next/link"
import styles from "./page.module.css"


export default function Home() {
  

  return (
    <section className={styles.section}>
      <Link href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
    </section>
  )
}