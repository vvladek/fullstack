"use client"

import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx"
import { MainSection, NavBar } from "@/components"



export default function Home() {
  return (
    <>
      <ScrollyVideo src={"/mp4/bg-video.mp4"} />
      <div style={{ position: "relative", top: "-100vh", minHeight: "200vh" }}>
        <NavBar />
        <MainSection />
      </div>
    </>
  )
}
