'use client'

import { useEffect, useRef } from 'react'

const DIVISIONS = [
  {
    tag: 'FME',
    name: 'FollowMe Energy',
    desc: 'Energy efficiency as a service (EEaaS) for government buildings and commercial spaces. FEMA certified. USFCR registered.',
  },
  {
    tag: 'FMA',
    name: 'FollowMe Africa',
    desc: 'International operations specializing in in-ground asset monetization through mining, water treatment, agriculture, and renewable energy.',
  },
  {
    tag: 'FMT',
    name: 'FollowMe Token',
    desc: 'The exclusive, patented cryptocurrency for services, materials, and supplies within the home improvement industry.',
  },
  {
    tag: 'FMI',
    name: 'FollowMe Investment Club',
    desc: 'An asset-backed educational club specializing in hard commodities — gold, diamonds, rubies, pearls, and precious metals.',
  },
  {
    tag: 'FMR',
    name: 'FollowMe Racing',
    desc: 'Official team sponsor for NASCAR Xfinity Series. Building brand visibility and community engagement through motorsport.',
  },
  {
    tag: 'FMU',
    name: 'FollowMe University',
    desc: 'Proprietary training programs and learning systems designed to transform business owners into strategic operators.',
  },
]

export default function Divisions() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const revealEls = section.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

  return (
    <section className="divisions-section section-pad" id="divisions" ref={sectionRef}>
      <div className="section-inner">
        <span className="eyebrow">Our Divisions</span>
        <h2 className="section-title reveal">
          One Brand.<br />
          <span className="gold-gradient-text">Multiple Engines.</span>
        </h2>
        <p className="section-sub reveal reveal-delay-1">
          FollowMe operates across multiple divisions &mdash; each one purpose-built to serve a
          distinct market and unlock a different dimension of value.
        </p>
        <div className="divisions-grid">
          {DIVISIONS.map((div, i) => (
            <div className={`division-card reveal ${delays[i % 3]}`} key={i}>
              <div className="division-tag">{div.tag}</div>
              <div className="division-name">{div.name}</div>
              <div className="division-desc">{div.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
