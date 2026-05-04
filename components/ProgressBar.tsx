'use client'

import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let prevPct = -1

    function onScroll() {
      const fullScrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = window.scrollY / Math.max(1, fullScrollable)
      if (Math.abs(pct - prevPct) > 0.002) {
        prevPct = pct
        if (bar) bar.style.width = `${pct * 100}%`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="progress-bar" ref={barRef} aria-hidden="true" />
}
