'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface NavbarProps {
  onApplyClick?: () => void
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLElement>(null)

  // Magnetic motion values
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(my, { stiffness: 300, damping: 20, mass: 0.5 })

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let prevScrolled: boolean | null = null

    function onScroll() {
      const shouldPill = window.scrollY > 80
      if (shouldPill !== prevScrolled) {
        prevScrolled = shouldPill
        nav!.classList.toggle('scrolled', shouldPill)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Magnetic handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * 0.35)
    my.set((e.clientY - cy) * 0.35)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <nav className="navbar" id="navbar" ref={navRef}>
      <a href="#" className="nav-brand">
        <Image
          src="/fmt-logo.svg"
          alt="FollowMe"
          width={38}
          height={38}
          className="nav-logo"
        />
        <div className="nav-brand-text">
          <span className="nav-name">FollowMe</span>
          <span className="nav-sub">Global Business Solutions</span>
        </div>
      </a>

      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#divisions">Divisions</a></li>
        <li><a href="#results">Results</a></li>
        <li><a href="#jason">Jason Slaughter</a></li>
      </ul>

      {onApplyClick ? (
        <motion.button
          ref={btnRef as React.RefObject<HTMLButtonElement>}
          className="nav-cta"
          onClick={onApplyClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: springX,
            y: springY,
            background: 'transparent',
            border: undefined,
            cursor: 'pointer',
          }}
        >
          Apply Now
        </motion.button>
      ) : (
        <a href="#apply" className="nav-cta">
          Apply Now
        </a>
      )}
    </nav>
  )
}
