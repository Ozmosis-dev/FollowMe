'use client'

import { useEffect, useRef } from 'react'

interface ApplyCTAProps {
  onApplyClick?: () => void
}

export default function ApplyCTA({ onApplyClick }: ApplyCTAProps) {
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
    <section className="apply-section section-pad" id="apply" ref={sectionRef}>
      <div className="apply-inner">
        <span className="eyebrow">Work With Us</span>
        <h2 className="section-title reveal">
          We don&rsquo;t work<br />
          <span className="gold-gradient-text">with everyone.</span>
        </h2>
        <p className="apply-body reveal reveal-delay-1">
          FollowMe partners with a select number of companies each year. If your business operates
          between $2M and $50M in revenue and you&rsquo;re ready to stop thinking like an
          entrepreneur and start operating like an institution &mdash; we want to hear from you.
        </p>
        {onApplyClick ? (
          <button
            className="btn-primary reveal reveal-delay-2"
            onClick={onApplyClick}
          >
            Apply Now
          </button>
        ) : (
          <a href="mailto:Jason@FollowMe.llc" className="btn-primary reveal reveal-delay-2">
            Apply Now
          </a>
        )}
        <p className="apply-micro reveal reveal-delay-3">
          Qualified applicants will be contacted within 48 hours.
        </p>
      </div>
    </section>
  )
}
