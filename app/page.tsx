'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import About from '@/components/About'
import Services from '@/components/Services'
import Divisions from '@/components/Divisions'
import Results from '@/components/Results'
import JasonSection from '@/components/JasonSection'
import ApplyCTA from '@/components/ApplyCTA'
import Footer from '@/components/Footer'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const ApplyModal = dynamic(() => import('@/components/ApplyModal'), { ssr: false })
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false })
const ProgressBar = dynamic(() => import('@/components/ProgressBar'), { ssr: false })
const Starscape = dynamic(() => import('@/components/Starscape'), { ssr: false })
const ScrollSection = dynamic(() => import('@/components/ScrollSection'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false })

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  return (
    <SmoothScroll>
      <CustomCursor />
      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Loader progress={loadProgress} hidden={loaded} />
      <ProgressBar />
      <Starscape />
      <Navbar onApplyClick={() => setModalOpen(true)} />
      <main>
        <Hero onApplyClick={() => setModalOpen(true)} />
        <ScrollSection
          onProgress={setLoadProgress}
          onLoaded={() => setLoaded(true)}
        />
        <StatsBar />
        <About />
        <Services />
        <Divisions />
        <Results />
        <JasonSection />
        <ApplyCTA onApplyClick={() => setModalOpen(true)} />
        <Testimonials />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
