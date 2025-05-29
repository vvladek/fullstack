"use client"
// import styles from "./page.module.css"

import { useEffect, useState } from "react"

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error("Fetch failed:", err))
  }, [])

  return (
    <div>
      {users.length ? JSON.stringify(users) : "Loading..."}
    </div>
  )
}