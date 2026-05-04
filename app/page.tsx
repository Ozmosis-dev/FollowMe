'use client'

import { useState } from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import ApplyModal from '@/components/ApplyModal'
import Loader from '@/components/Loader'
import ProgressBar from '@/components/ProgressBar'
import Starscape from '@/components/Starscape'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ScrollSection from '@/components/ScrollSection'
import StatsBar from '@/components/StatsBar'
import About from '@/components/About'
import Services from '@/components/Services'
import Divisions from '@/components/Divisions'
import Results from '@/components/Results'
import JasonSection from '@/components/JasonSection'
import ApplyCTA from '@/components/ApplyCTA'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

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
