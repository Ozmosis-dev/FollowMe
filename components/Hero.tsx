'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroProps {
  onApplyClick?: () => void
}

export default function Hero({ onApplyClick }: HeroProps) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eyebrow = eyebrowRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    const actions = actionsRef.current
    const scrollHint = scrollHintRef.current

    if (!eyebrow || !headline || !sub || !actions || !scrollHint) return

    // ── Word split for headline ──
    const originalHTML = headline.innerHTML
    // Split text nodes into word spans, preserving child elements (like .gold-text span)
    function wrapWords(el: HTMLElement) {
      // Walk child nodes and wrap text words in spans
      const nodes = Array.from(el.childNodes)
      el.innerHTML = ''
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = (node.textContent || '').split(/(\s+)/)
          words.forEach((word) => {
            if (/^\s+$/.test(word)) {
              el.appendChild(document.createTextNode(word))
            } else if (word.length > 0) {
              const outer = document.createElement('span')
              outer.style.display = 'inline-block'
              outer.style.overflow = 'hidden'
              outer.style.verticalAlign = 'bottom'
              const inner = document.createElement('span')
              inner.style.display = 'inline-block'
              inner.textContent = word
              outer.appendChild(inner)
              el.appendChild(outer)
            }
          })
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const elem = node as HTMLElement
          // Preserve <br> elements — wrapping them in inline-block kills the line break
          if (elem.tagName === 'BR') {
            el.appendChild(document.createElement('br'))
            return
          }
          // Wrap the whole child element in an overflow container
          const outer = document.createElement('span')
          outer.style.display = 'inline-block'
          outer.style.overflow = 'hidden'
          outer.style.verticalAlign = 'bottom'
          const inner = document.createElement('span')
          inner.style.display = 'inline-block'
          inner.appendChild(elem.cloneNode(true))
          outer.appendChild(inner)
          el.appendChild(outer)
        }
      })
    }

    wrapWords(headline)
    const wordInners = headline.querySelectorAll<HTMLElement>('span > span')

    // ── Set initial states ──
    gsap.set(eyebrow, { opacity: 0, y: 20 })
    gsap.set(wordInners, { y: '100%', opacity: 0 })
    gsap.set(sub, { opacity: 0, y: 24 })
    gsap.set(Array.from(actions.children), { opacity: 0, y: 20 })
    gsap.set(scrollHint, { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
      .to(
        wordInners,
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
        },
        0.45
      )
      .to(sub, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
      .to(
        Array.from(actions.children),
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        1.1
      )
      .to(scrollHint, { opacity: 1, duration: 0.6 }, 1.5)

    // ── Orb parallax on scroll ──
    const orb1 = orb1Ref.current
    const orb2 = orb2Ref.current
    const orb3 = orb3Ref.current

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sy = window.scrollY
        if (orb1) gsap.set(orb1, { y: sy * -0.3 })
        if (orb2) gsap.set(orb2, { y: sy * 0.2 })
        if (orb3) gsap.set(orb3, { y: sy * -0.15 })
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      tl.kill()
      window.removeEventListener('scroll', handleScroll)
      // Restore original headline HTML on cleanup
      if (headline) headline.innerHTML = originalHTML
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" ref={orb1Ref} />
      <div className="hero-orb hero-orb-2" ref={orb2Ref} />
      <div className="hero-orb hero-orb-3" ref={orb3Ref} />
      <div className="hero-grid" />
      <p className="hero-eyebrow" ref={eyebrowRef}>
        Elite Business Strategist &middot; Industry Disruptor &middot; 30+ Years
      </p>
      <h1 className="hero-headline" ref={headlineRef}>
        We Don&rsquo;t Consult.<br />
        <span className="gold-text">We Transform</span> Industries.
      </h1>
      <p className="hero-sub" ref={subRef}>
        FollowMe Global Business Solutions is a multi-divisional strategic consultancy that has
        generated over $2.1 billion in revenue for clients across 7+ industries.
      </p>
      <div className="hero-actions" ref={actionsRef}>
        {onApplyClick ? (
          <button className="btn-primary" onClick={onApplyClick}>
            Apply to Work With Us
          </button>
        ) : (
          <a href="#apply" className="btn-primary">
            Apply to Work With Us
          </a>
        )}
        <a href="#about" className="btn-secondary">
          See What We Do &darr;
        </a>
      </div>
      <div className="hero-scroll-hint" ref={scrollHintRef}>
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
