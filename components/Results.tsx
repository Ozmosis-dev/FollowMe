'use client'

import { useEffect, useRef } from 'react'

const PARTNERS = [
  'CBRE',
  'Regions Bank',
  'PowerTeam International',
  'Paul Davis Restoration',
  'Kraft General Foods',
  'Pillsbury',
  'Walmart',
  'Sysco Foods',
  'Kroger',
  'Popeyes',
  'Darden Restaurants',
  'Yum! Brands',
]

export default function Results() {
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
    <section className="results-section section-pad" id="results" ref={sectionRef}>
      <div className="section-inner">
        <div className="results-header">
          <span className="eyebrow">Proven Results</span>
          <h2 className="section-title reveal">
            Trusted by<br />
            <span className="gold-gradient-text">Industry Leaders</span>
          </h2>
          <p className="section-sub reveal reveal-delay-1">
            From Fortune 500 partnerships to bootstrapped companies scaling past $30M, our clients
            don&rsquo;t just grow &mdash; they redefine their industries.
          </p>
        </div>
        <div className="case-studies">
          <div className="case-card reveal">
            <div className="case-label">Case Study</div>
            <div className="case-name">Team Roofing &amp; Construction</div>
            <div className="case-body">
              From two employees working in a basement to over 50 employees and on pace to reach $30
              million in annual revenue. FollowMe designed and implemented the growth strategy, sales
              systems, and operational framework that made it possible.
            </div>
            <div className="case-metric">$30M Revenue</div>
          </div>
          <div className="case-card reveal reveal-delay-1">
            <div className="case-label">Case Study</div>
            <div className="case-name">Garcia Roofing</div>
            <div className="case-body">
              Scaling toward $60 million with FollowMe&rsquo;s strategic consulting, functional
              group assessment, and hands-on operational guidance across every department of the
              organization.
            </div>
            <div className="case-metric">$60M Target</div>
          </div>
        </div>
        <div className="partners-bar reveal">
          <div className="partners-label">Notable Clients &amp; Partners</div>
          <div className="partners-list">
            {PARTNERS.map((name, i) => (
              <span className="partner-name" key={i}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
