'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function JasonSection() {
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

  return (
    <section className="jason-section section-pad" id="jason" ref={sectionRef}>
      <div className="section-inner">
        <div className="jason-grid">
          <div>
            <span className="eyebrow">The Man Behind the Brand</span>
            <div className="jason-signature reveal">Jason Slaughter</div>
            <div className="jason-title">
              Chairman &amp; CEO &middot; FollowMe Global Business Solutions
            </div>
            <div className="jason-body reveal reveal-delay-1">
              <p>
                With over 30 years of proven results in business development and profitable growth,
                Jason Slaughter represents the rare combination of theoretical mastery and real-world
                execution. He doesn&rsquo;t teach from textbooks &mdash; he teaches from balance
                sheets, boardrooms, and the front lines of industries he&rsquo;s helped reshape.
              </p>
              <p>
                Having served over 300 clients across 7+ industries, Jason has architected growth
                strategies that have collectively generated over $2.1 billion in revenue. His
                proprietary systems &mdash; born from decades of pattern recognition and relentless
                iteration &mdash; are designed to turn ambitious business owners into institutional
                operators.
              </p>
              <p>
                His approach is simple: assess everything, assume nothing, and build systems that
                outlast any single leader.
              </p>
            </div>
            <div className="jason-tagline reveal reveal-delay-2">
              Influencing Influencers.&trade;
            </div>
          </div>
          <div className="jason-visual reveal reveal-delay-1">
            <div className="jason-token-display">
              <div className="jason-ring-outer" />
              <div className="jason-ring-mid" />
              <Image
                src="/fmt-logo.svg"
                alt="FMT Token"
                width={240}
                height={240}
                className="jason-token-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
