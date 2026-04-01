"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function HeroBackground() {
  return (
    <>
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#05220b", "#134338", "#16f98a", "#134338", "#05220b"]}
        speed={0}
        distortion={0.8}
        swirl={0.5}
      />
    </>
  )
}
