'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Stat {
  target: number
  prefix: string
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { target: 2145, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
  { target: 300, prefix: '', suffix: '+', label: 'Clients Served' },
  { target: 7, prefix: '', suffix: '+', label: 'Industries Supported' },
  { target: 30, prefix: '', suffix: '+', label: 'Years of Experience' },
]

export default function StatsBar() {
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger)
    } catch {
      // SSR guard
    }

    const triggers: ScrollTrigger[] = []

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const stat = STATS[i]
      const obj = { val: 0 }

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: stat.target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              const v = Math.floor(obj.val)
              const formatted =
                stat.target >= 1000 ? v.toLocaleString() : String(v)
              el.textContent = stat.prefix + formatted + stat.suffix
            },
            onComplete() {
              const final =
                stat.target >= 1000
                  ? stat.target.toLocaleString()
                  : String(stat.target)
              el.textContent = stat.prefix + final + stat.suffix
            },
          })
        },
      })

      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="stats-bar" id="about">
      <div className="section-inner">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div className="stat-item" key={i}>
              <span
                className="stat-num"
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
              >
                {stat.prefix}0{stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
