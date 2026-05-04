'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, .svc-card, .service-card, .division-card, .case-card, .nav-cta'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [isHovered, setIsHovered] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)
  const isMobile = useRef(false)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) {
      isMobile.current = true
      return
    }

    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovered(true)
      }
    }

    const handleOut = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      document.body.style.cursor = ''
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  const ringSize = isHovered ? 56 : 32
  const ringBg = isHovered ? 'rgba(201,168,76,0.08)' : 'transparent'

  return (
    <>
      {/* Dot — exact mouse position */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(201,168,76,0.9)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring — spring follow */}
      <motion.div
        ref={ringRef}
        animate={{
          width: ringSize,
          height: ringSize,
          background: ringBg,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(201,168,76,0.6)',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
