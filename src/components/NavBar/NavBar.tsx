import Link from "next/link"
import styles from "./NavBar.module.css"



export function NavBar() {
  return (
    <section className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/routes">Routes</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/team">Our team</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className={styles.loginContainer}>
          <Link href="/signin">Sign In</Link>
          <Link href="/register">Register</Link>          
        </div>
      </div>
    </section>
  )
}