"use client"

import Image from "next/image";
import styles from "./page.module.css";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx";


export default function Home() {
  return (
    <ScrollyVideo src={"/mp4/bg-video.mp4"}>HELLO WORLD</ScrollyVideo>
  )
}
