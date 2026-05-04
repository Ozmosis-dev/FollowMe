'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  dx: number
  dy: number
  twinkleSpeed: number
  twinklePhase: number
  baseOpacity: number
}

export default function Starscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let stars: Star[] = []
    let rafId = 0

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
    }

    function initStars() {
      stars = []
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.2,
          dx: (Math.random() - 0.5) * 0.08,
          dy: (Math.random() - 0.5) * 0.08,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          baseOpacity: Math.random() * 0.4 + 0.1,
        })
      }
    }

    function drawStars() {
      ctx!.clearRect(0, 0, W, H)
      stars.forEach((s) => {
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0) s.x = W
        if (s.x > W) s.x = 0
        if (s.y < 0) s.y = H
        if (s.y > H) s.y = 0
        s.twinklePhase += s.twinkleSpeed
        const opacity = s.baseOpacity * (0.5 + 0.5 * Math.sin(s.twinklePhase))
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 248, 220, ${opacity})`
        ctx!.fill()
      })
      rafId = requestAnimationFrame(drawStars)
    }

    function handleResize() {
      resize()
      initStars()
    }

    window.addEventListener('resize', handleResize)
    resize()
    initStars()
    rafId = requestAnimationFrame(drawStars)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="starscape"
      aria-hidden="true"
    />
  )
}
