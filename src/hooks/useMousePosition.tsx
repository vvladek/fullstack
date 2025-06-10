"use client"

import { useEffect, useState } from "react"


interface MousePosition {
  x: number;
  y: number;
}


export function useMousePosition() {

  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })


  function handleMouseMove(event: MouseEvent): void {
    setPosition({ x: event.clientX, y: event.clientY })
  }


  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  return position
}