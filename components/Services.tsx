'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  BarChart2,
  TrendingUp,
  Handshake,
  Settings2,
  GitMerge,
  Users,
  Cpu,
  Globe,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  num: string
  name: string
  desc: string
  icon: LucideIcon
  featured?: boolean
  deco?: React.ReactNode
}

// Subtle decorative SVG for featured cards
const CompassDeco = () => (
  <svg className="svc-deco" style={{ bottom: -20, right: -20, width: 220, height: 220 }}
    viewBox="0 0 220 220" fill="none">
    <circle cx="110" cy="110" r="100" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="110" cy="110" r="70"  stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 6" />
    <circle cx="110" cy="110" r="40"  stroke="#C9A84C" strokeWidth="1" />
    <line x1="110" y1="10"  x2="110" y2="210" stroke="#C9A84C" strokeWidth="0.5" />
    <line x1="10"  y1="110" x2="210" y2="110" stroke="#C9A84C" strokeWidth="0.5" />
    <line x1="39"  y1="39"  x2="181" y2="181" stroke="#C9A84C" strokeWidth="0.5" />
    <line x1="181" y1="39"  x2="39"  y2="181" stroke="#C9A84C" strokeWidth="0.5" />
    <circle cx="110" cy="110" r="5" fill="#C9A84C" />
  </svg>
)

const MaDeco = () => (
  <svg className="svc-deco" style={{ bottom: -30, right: -10, width: 240, height: 160 }}
    viewBox="0 0 240 160" fill="none">
    <circle cx="80"  cy="80" r="70" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="160" cy="80" r="70" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="80"  cy="80" r="40" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 5" />
    <circle cx="160" cy="80" r="40" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3 5" />
  </svg>
)

const SERVICES: Service[] = [
  {
    num: '01',
    name: 'Strategy Implementation',
    desc: "Custom-tailored growth strategies built on 30+ years of pattern recognition. We build playbooks for your specific inflection point — not templates.",
    icon: Compass,
    featured: true,
    deco: <CompassDeco />,
  },
  {
    num: '02',
    name: 'Accounting & Finance',
    desc: "Financial architecture that protects wealth, optimizes tax positioning, and builds the foundation for M&A readiness and institutional partnerships.",
    icon: BarChart2,
  },
  {
    num: '03',
    name: 'Marketing & Analytics',
    desc: "Data-driven marketing systems that generate predictable pipeline. We build the machine, not just the campaign.",
    icon: TrendingUp,
  },
  {
    num: '04',
    name: 'Sales Systems',
    desc: "Proprietary sales training and value systems that turn teams into closers. Scalable, repeatable, and built to compound.",
    icon: Handshake,
  },
  {
    num: '05',
    name: 'Operations',
    desc: "Operational audits and process engineering that eliminate waste and unlock capacity you didn't know you had.",
    icon: Settings2,
  },
  {
    num: '06',
    name: 'Mergers & Acquisitions',
    desc: "End-to-end M&A advisory — from valuation and due diligence to deal structuring, integration planning, and post-merger optimization.",
    icon: GitMerge,
    featured: true,
    deco: <MaDeco />,
  },
  {
    num: '07',
    name: 'Human Resources',
    desc: "Policy, procedures, diversity training, and code of ethics frameworks that protect the company and empower the team.",
    icon: Users,
  },
  {
    num: '08',
    name: 'Information Technology',
    desc: "IT infrastructure strategy, digital transformation roadmaps, and systems integration for companies scaling past their tech stack.",
    icon: Cpu,
  },
  {
    num: '09',
    name: 'Supply Chain Management',
    desc: "Global supply chain optimization, vendor management, and procurement strategy for companies operating at scale.",
    icon: Globe,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: 'easeOut' as const },
  }),
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Stagger cards in when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(section)

    // Heading reveal
    const revealEls = section.querySelectorAll<HTMLElement>('.reveal')
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in-view'); revealObs.unobserve(e.target) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach((el) => revealObs.observe(el))

    return () => { observer.disconnect(); revealObs.disconnect() }
  }, [])

  return (
    <section className="services-section section-pad" id="services" ref={sectionRef}>
      <div className="section-inner">
        {/* Header */}
        <span className="eyebrow">What We Do</span>
        <h2 className="section-title reveal">
          Strategic firepower<br />
          <span className="gold-gradient-text">across every function.</span>
        </h2>
        <p className="section-sub reveal reveal-delay-1">
          We don&rsquo;t specialize in one thing. We dominate across every operational domain that
          drives revenue and enterprise value.
        </p>

        {/* Bento grid */}
        <div className="services-bento">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={i}
                ref={(el) => { cardRefs.current[i] = el }}
                className={`svc-card${svc.featured ? ' svc-card-featured' : ''}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
              >
                {/* Decorative background SVG */}
                {svc.deco}

                {/* Icon + number row */}
                <div className="svc-card-header">
                  <motion.div
                    className="svc-icon-wrap"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  >
                    <Icon
                      size={svc.featured ? 28 : 22}
                      strokeWidth={1.5}
                      color="var(--gold)"
                    />
                  </motion.div>
                  <span className="svc-num">{svc.num}</span>
                </div>

                {/* Content */}
                <div className="svc-name">{svc.name}</div>
                <div className="svc-rule" />
                <div className="svc-desc">{svc.desc}</div>

                {/* Hover footer */}
                <div className="svc-footer">
                  <span>Explore</span>
                  <ArrowRight size={11} strokeWidth={2} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
