'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger)
    } catch {
      // SSR guard
    }

    const section = sectionRef.current
    if (!section) return

    const triggers: ScrollTrigger[] = []

    // ── Existing reveal animation (replaces IntersectionObserver) ──
    const revealEls = section.querySelectorAll<HTMLElement>('.reveal')
    revealEls.forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => el.classList.add('in-view'),
      })
      triggers.push(t)
    })

    // ── Highlight blockquote: word-by-word slide-up ──
    const highlight = highlightRef.current
    if (highlight) {
      const text = highlight.textContent || ''
      const words = text.split(/\s+/).filter(Boolean)
      highlight.innerHTML = words
        .map(
          (w) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">` +
            `<span style="display:inline-block">${w}</span></span>`
        )
        .join('')

      const innerSpans = highlight.querySelectorAll<HTMLElement>('span > span')
      gsap.set(innerSpans, { y: '110%' })

      const t = ScrollTrigger.create({
        trigger: highlight,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(innerSpans, {
            y: '0%',
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.03,
          })
        },
      })
      triggers.push(t)
    }

    // ── About visual parallax ──
    const visual = visualRef.current
    if (visual) {
      const t = ScrollTrigger.create({
        trigger: visual,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(visual, { y: self.progress * -40 })
        },
      })
      triggers.push(t)
    }

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="section-pad" ref={sectionRef}>
      <div className="section-inner">
        <div className="about-grid">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title reveal">
              Most consultants give you advice.<br />
              <span className="gold-gradient-text">We give you infrastructure.</span>
            </h2>
            <div
              className="about-highlight reveal reveal-delay-1"
              ref={highlightRef}
            >
              &ldquo;We start with a two-day on-site assessment. No pitch decks. No proposals. Just
              a deep, honest look at where your business is and where it needs to go.&rdquo;
            </div>
            <div className="about-body reveal reveal-delay-2">
              <p>
                FollowMe was built for companies that have outgrown advice and need execution. We
                work exclusively with businesses operating between $2 million and $50 million in
                revenue &mdash; companies at the inflection point between entrepreneurial hustle and
                institutional scale.
              </p>
              <p>
                Our team doesn&rsquo;t observe from the sidelines. We embed. We assess every
                functional group in your organization &mdash; from accounting and finance to
                operations, HR, IT, marketing, and sales &mdash; and deploy proprietary systems
                stress-tested across hundreds of engagements.
              </p>
              <p>The result? Businesses that don&rsquo;t just grow. They transform.</p>
            </div>
          </div>
          <div className="about-visual reveal reveal-delay-1" ref={visualRef}>
            <div className="about-circle">
              <div className="about-orbit" />
              <div className="about-circle-inner">
                <Image
                  src="/fmt-logo.svg"
                  alt="FMT Token"
                  width={200}
                  height={200}
                  className="about-fmt-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
