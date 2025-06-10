"use client"

import { useEffect, useRef, useState } from "react"
import { useMousePosition } from "@/hooks/useMousePosition"
import style from "./GradientBackground.module.css"



export function GradientBackground() {

  const requestAnimationFrameRef = useRef(0)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const mousePosition = useMousePosition()


  function moveCursorBlob(): void {
    setCursorPos(prev => ({
      x: Math.round(prev.x + (mousePosition.x - prev.x) / 20),
      y: Math.round(prev.y + (mousePosition.y - prev.y) / 20)
    }))
    requestAnimationFrameRef.current = requestAnimationFrame(moveCursorBlob)
  }

  useEffect(() => {
    requestAnimationFrameRef.current = requestAnimationFrame(moveCursorBlob)
    return () => cancelAnimationFrame(requestAnimationFrameRef.current)
  }, [mousePosition])


  return (
    <section className={style.gradient}>
      <svg>
        <defs>
          <filter id="gradientBackgroundSvgFilter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gradientBackgroundSvgFilter"
            />
            <feBlend
              in="SourceGraphic"
              in2="gradientBackgroundSvgFilter"
            />
          </filter>
        </defs>
      </svg>
      <div className={style.blobsContainer}>
        <div className={style.blob1} />
        <div className={style.blob2} />
        <div className={style.blob3} />
        <div className={style.blob4} />
        <div className={style.blob5} />
        <div
          className={style.cursorBlob}
          style={{ top: `calc(-40% + ${cursorPos.y}px)`, left: `calc(-40% + ${cursorPos.x}px)` }}
        />
      </div>
    </section>
  )
}