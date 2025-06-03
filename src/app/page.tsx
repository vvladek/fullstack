// "use client"
// import styles from "./page.module.css"

import Link from "next/link";

// import { useEffect, useState } from "react"

export default function Home() {
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   fetch("/api/users")
  //     .then(res => res.json())
  //     .then(setUsers)
  //     .catch(err => console.error("Fetch failed:", err))
  // }, [])

  return (
    <div>
      <Link href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
      {/* {users.length ? JSON.stringify(users) : "Loading..."} */}
    </div>
  )
}