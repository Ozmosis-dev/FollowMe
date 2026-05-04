'use client'

import { useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    quote:
      "We started in a basement with two people. Jason Slaughter built the infrastructure that got us to 50 employees and $30 million in annual revenue. That's not consulting — that's transformation at the highest level.",
    author: 'Kevin M.',
    company: 'Owner — Team Roofing & Construction',
  },
  {
    quote:
      "FollowMe brought a systematic approach to every function of our business — operations, finance, sales, HR. We're scaling toward $60 million with a machine that actually works. The results speak for themselves.",
    author: 'Rafael G.',
    company: 'Owner — Garcia Roofing',
  },
  {
    quote:
      "In 25 years of commercial banking, I've rarely seen a consultant operate with Jason's combination of strategic rigor and real-world execution. His clients don't just grow — they build institutional-grade businesses.",
    author: 'Senior VP',
    company: 'Regions Bank',
  },
  {
    quote:
      "FollowMe didn't come in with a pitch deck. They came in with a diagnostic, a framework, and a deployment plan ready to execute. That kind of operational clarity is genuinely rare at any level.",
    author: 'Strategic Partner',
    company: 'PowerTeam International',
  },
]

function Stars() {
  return (
    <div className="testimonial-stars">
      {[...Array(5)].map((_, i) => (
        <div className="star" key={i} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Reveal heading
    const heading = titleRef.current
    if (heading) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      obs.observe(heading)
      return () => obs.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }
    const onMouseLeave = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    const onMouseUp = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = scrollLeft - (x - startX) * 1.2
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section className="testimonials-section section-pad">
      <div className="section-inner">
        <span className="eyebrow">Client Testimonials</span>
        <h2
          className="section-title reveal"
          ref={titleRef}
          style={{ marginBottom: '40px' }}
        >
          What Our Clients <span className="gold-gradient-text">Are Saying</span>
        </h2>
      </div>
      <div
        className="section-inner"
        style={{ paddingRight: '0', maxWidth: 'none', paddingLeft: '40px' }}
      >
        <div className="testimonials-scroll" id="testimonials-scroll" ref={scrollRef}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <Stars />
              <div className="testimonial-quote">{t.quote}</div>
              <div className="testimonial-author">{t.author}</div>
              <div className="testimonial-company">{t.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
