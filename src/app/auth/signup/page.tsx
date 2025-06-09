import { SignUpForm } from "@/components"
import styles from "./page.module.css"



export default function SignUp() {

  return (
    <section className={styles.section}>
      <SignUpForm />
    </section>
  )
}