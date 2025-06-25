"use client"

import { useAlertStore } from "@/store/AlertStore"
import styles from "./Alert.module.css"



export function Alert() {

  const { text, isVisible } = useAlertStore((state) => state)

  return (
    <div className={`${styles.alert} ${isVisible ? styles.visible : ""} UICase`}>
      <p>{text}</p>
    </div>
  )
}