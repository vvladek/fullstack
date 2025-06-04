"use client"

import { useAppAlertStore } from "@/store/AppAlertStore"
import styles from "./AppAlert.module.css"



export function AppAlert() {

  const { text, isVisible, hideAlert } = useAppAlertStore((state) => state)

  return (
    <div className={`${styles.alert} ${isVisible ? styles.show : ""}`}>
      <p>{text}</p>
      <button onClick={hideAlert}>Close</button>
    </div>
  )
}