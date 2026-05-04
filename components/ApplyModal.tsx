'use client'
import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormState {
  fullName: string
  companyName: string
  annualRevenue: string
  email: string
  phone: string
  heardAbout: string
  message: string
}

const INITIAL_FORM: FormState = {
  fullName: '',
  companyName: '',
  annualRevenue: '',
  email: '',
  phone: '',
  heardAbout: '',
  message: '',
}

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset form after close animation
      setTimeout(() => setSubmitted(false), 400)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(6,6,6,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 620,
              background: 'rgba(13,13,13,0.95)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 20,
              padding: '56px 52px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06) inset',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.color = 'var(--gold)'
                btn.style.borderColor = 'rgba(201,168,76,0.4)'
                btn.style.background = 'rgba(201,168,76,0.06)'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.color = 'var(--text-muted)'
                btn.style.borderColor = 'rgba(255,255,255,0.08)'
                btn.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <X size={16} />
            </button>

            {submitted ? (
              <SuccessState onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <div style={{ marginBottom: 36 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      opacity: 0.8,
                      display: 'block',
                      marginBottom: 12,
                    }}
                  >
                    Work With Us
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      marginBottom: 10,
                    }}
                  >
                    Submit Your Application
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'var(--text-dim)',
                    }}
                  >
                    Qualified applicants will be contacted within 48 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '20px 20px',
                    }}
                  >
                    <Field label="Full Name" style={{ gridColumn: '1' }}>
                      <input
                        className="apply-input"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Jason Slaughter"
                      />
                    </Field>

                    <Field label="Company Name" style={{ gridColumn: '2' }}>
                      <input
                        className="apply-input"
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                        placeholder="Acme Corp"
                      />
                    </Field>

                    <Field label="Annual Revenue" style={{ gridColumn: '1 / -1' }}>
                      <select
                        className="apply-select"
                        name="annualRevenue"
                        value={form.annualRevenue}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a range…
                        </option>
                        <option value="2M-5M">$2M – $5M</option>
                        <option value="5M-15M">$5M – $15M</option>
                        <option value="15M-30M">$15M – $30M</option>
                        <option value="30M-50M">$30M – $50M</option>
                        <option value="50M+">$50M+</option>
                      </select>
                    </Field>

                    <Field label="Email Address" style={{ gridColumn: '1' }}>
                      <input
                        className="apply-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                      />
                    </Field>

                    <Field label="Phone Number" style={{ gridColumn: '2' }}>
                      <input
                        className="apply-input"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Field>

                    <Field label="How did you hear about us?" style={{ gridColumn: '1 / -1' }}>
                      <input
                        className="apply-input"
                        type="text"
                        name="heardAbout"
                        value={form.heardAbout}
                        onChange={handleChange}
                        placeholder="Referral, LinkedIn, Google…"
                      />
                    </Field>

                    <Field
                      label="What are you looking to transform?"
                      style={{ gridColumn: '1 / -1' }}
                    >
                      <textarea
                        className="apply-textarea"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        placeholder="Tell us about your business and what you'd like to achieve…"
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: 28,
                      width: '100%',
                      padding: '17px 36px',
                      background:
                        'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold))',
                      border: 'none',
                      borderRadius: 60,
                      color: '#000',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                      boxShadow: '0 4px 24px rgba(201,168,76,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget
                      btn.style.boxShadow = '0 8px 40px rgba(201,168,76,0.5)'
                      btn.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget
                      btn.style.boxShadow = '0 4px 24px rgba(201,168,76,0.3)'
                      btn.style.transform = 'translateY(0)'
                    }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  children,
  style,
}: {
  label: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label className="apply-label">{label}</label>
      {children}
    </div>
  )
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px 0',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
          boxShadow: '0 0 40px rgba(201,168,76,0.15)',
        }}
      >
        <CheckCircle size={32} color="var(--gold)" strokeWidth={1.5} />
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          opacity: 0.8,
          marginBottom: 14,
          display: 'block',
        }}
      >
        Application Received
      </span>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: 16,
          lineHeight: 1.15,
        }}
      >
        Thank You.
      </h2>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--text-dim)',
          maxWidth: 380,
          marginBottom: 36,
        }}
      >
        Your application has been submitted. Our team will review it and reach out within 48 hours
        if you&rsquo;re a strong fit.
      </p>
      <button
        onClick={onClose}
        style={{
          padding: '13px 36px',
          background: 'transparent',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: 60,
          color: 'var(--gold)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'var(--gold)'
          btn.style.color = '#000'
          btn.style.borderColor = 'var(--gold)'
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'transparent'
          btn.style.color = 'var(--gold)'
          btn.style.borderColor = 'rgba(201,168,76,0.4)'
        }}
      >
        Close
      </button>
    </motion.div>
  )
}
