'use client'

import { useEffect, useRef, useCallback } from 'react'

const TOTAL_FRAMES = 121

interface ScrollSectionProps {
  onProgress: (progress: number) => void
  onLoaded: () => void
}

interface DrawParams {
  x: number
  y: number
  w: number
  h: number
  cw: number
  ch: number
}

const ANNOTATIONS = [
  { id: 'card-1', showAt: 0.18, hideAt: 0.38 },
  { id: 'card-2', showAt: 0.42, hideAt: 0.62 },
  { id: 'card-3', showAt: 0.65, hideAt: 0.83 },
  { id: 'card-4', showAt: 0.86, hideAt: 0.98 },
]

export default function ScrollSection({ onProgress, onLoaded }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    new Array(TOTAL_FRAMES).fill(null)
  )
  const loadedCountRef = useRef(0)
  const lastFrameIndexRef = useRef(-1)
  const dpRef = useRef<DrawParams>({ x: 0, y: 0, w: 0, h: 0, cw: 0, ch: 0 })
  const siteStartedRef = useRef(false)
  const rafRef = useRef<number>(0)
  const cachedSectionTopRef = useRef(0)
  const cachedScrollableHRef = useRef(0)
  const prevScrollYRef = useRef(-1)
  const annotStateRef = useRef<Record<string, boolean>>({})
  const lastProgressReportRef = useRef(0)

  const computeDrawLayout = useCallback((srcW: number, srcH: number) => {
    const cw = window.innerWidth
    const ch = window.innerHeight
    const isMobile = cw < 768
    const scale = isMobile
      ? Math.min(cw / srcW, ch / srcH) * 1.12
      : Math.max(cw / srcW, ch / srcH)
    dpRef.current = {
      x: (cw - srcW * scale) / 2,
      y: (ch - srcH * scale) / 2,
      w: srcW * scale,
      h: srcH * scale,
      cw,
      ch,
    }
  }, [])

  const drawBitmap = useCallback(
    (index: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return
      const img = imagesRef.current[index]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const dp = dpRef.current
      if (dp.cw !== window.innerWidth) {
        computeDrawLayout(img.naturalWidth || 1920, img.naturalHeight || 1076)
      }

      const d = dpRef.current
      ctx.fillStyle = '#060606'
      ctx.fillRect(0, 0, d.cw, d.ch)
      ctx.drawImage(img, d.x, d.y, d.w, d.h)
      lastFrameIndexRef.current = index
    },
    [computeDrawLayout]
  )

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    dpRef.current.cw = 0 // force layout recompute
    if (lastFrameIndexRef.current >= 0) drawBitmap(lastFrameIndexRef.current)
  }, [drawBitmap])

  const cacheLayout = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    cachedSectionTopRef.current = section.offsetTop
    cachedScrollableHRef.current = section.offsetHeight - window.innerHeight
  }, [])

  const updateAnnotations = useCallback((progress: number) => {
    for (const a of ANNOTATIONS) {
      const visible = progress >= a.showAt && progress <= a.hideAt
      if (annotStateRef.current[a.id] !== visible) {
        annotStateRef.current[a.id] = visible
        const el = document.getElementById(a.id)
        if (el) el.classList.toggle('visible', visible)
      }
    }
  }, [])

  const startRAFLoop = useCallback(() => {
    cacheLayout()

    drawBitmap(0)

    function tick() {
      const sy = window.scrollY
      if (sy !== prevScrollYRef.current) {
        prevScrollYRef.current = sy

        const scrolled = Math.max(0, sy - cachedSectionTopRef.current)
        const progress = Math.min(1, scrolled / Math.max(1, cachedScrollableHRef.current))
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)))
        if (frameIndex !== lastFrameIndexRef.current) drawBitmap(frameIndex)

        updateAnnotations(progress)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [cacheLayout, drawBitmap, updateAnnotations])

  const onFrameDecoded = useCallback(() => {
    loadedCountRef.current++
    const count = loadedCountRef.current

    // Throttle progress updates: every 4 frames or on completion.
    // Avoids 121 parent re-renders during the initial load burst.
    if (count === TOTAL_FRAMES || count - lastProgressReportRef.current >= 4) {
      lastProgressReportRef.current = count
      onProgress((count / TOTAL_FRAMES) * 100)
    }

    // Unlock site after first frame — don't block on all 121
    if (count === 1 && !siteStartedRef.current) {
      siteStartedRef.current = true
      setTimeout(() => {
        onLoaded()
        startRAFLoop()
      }, 400)
    }
  }, [onProgress, onLoaded, startRAFLoop])

  useEffect(() => {
    setupCanvas()
    window.addEventListener('resize', setupCanvas)
    window.addEventListener('resize', cacheLayout, { passive: true })

    let cancelled = false
    const localImages: HTMLImageElement[] = []

    // Load frames sequentially in small concurrent batches to avoid
    // (a) saturating the network and (b) holding 121 fully-decoded
    // bitmaps in memory simultaneously, which crashed the tab.
    const CONCURRENCY = 6
    let nextIndex = 0

    const loadOne = (idx: number): Promise<void> =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        const num = String(idx + 1).padStart(4, '0')
        localImages.push(img)

        img.onload = () => {
          if (cancelled) return resolve()
          imagesRef.current[idx] = img
          onFrameDecoded()
          resolve()
        }
        img.onerror = () => {
          if (cancelled) return resolve()
          imagesRef.current[idx] = null
          onFrameDecoded()
          resolve()
        }

        img.src = `/frames-webp/frame_${num}.webp`
      })

    async function worker() {
      while (!cancelled) {
        const idx = nextIndex++
        if (idx >= TOTAL_FRAMES) return
        await loadOne(idx)
      }
    }

    for (let i = 0; i < CONCURRENCY; i++) worker()

    return () => {
      cancelled = true
      window.removeEventListener('resize', setupCanvas)
      window.removeEventListener('resize', cacheLayout)
      cancelAnimationFrame(rafRef.current)
      // Detach handlers and drop refs so the browser can release decoded data.
      localImages.forEach((img) => {
        img.onload = null
        img.onerror = null
        img.src = ''
      })
      imagesRef.current.fill(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="scroll-section" id="scroll-section" ref={sectionRef}>
      <div className="scroll-sticky">
        <canvas id="main-canvas" ref={canvasRef} />
        <div className="canvas-vignette" />

        {/* Annotation Card 1 */}
        <div className="annotation-card" id="card-1">
          <div className="annotation-card-inner">
            <div className="card-number">01 &mdash; FMT TOKEN</div>
            <div className="card-title">FollowMe Token</div>
            <div className="card-desc">
              The world&rsquo;s first patented cryptocurrency exclusively for services, materials,
              and supplies in the home improvement industry.
            </div>
            <div className="card-stat">PATENTED &middot; 1 OF 1</div>
          </div>
        </div>

        {/* Annotation Card 2 */}
        <div className="annotation-card" id="card-2">
          <div className="annotation-card-inner">
            <div className="card-number">02 &mdash; TECHNOLOGY</div>
            <div className="card-title">Blockchain Secured</div>
            <div className="card-desc">
              Every transaction is immutable, transparent, and encrypted on distributed ledger
              infrastructure built for institutional-grade commerce.
            </div>
            <div className="card-stat">100% ENCRYPTED &middot; IMMUTABLE</div>
          </div>
        </div>

        {/* Annotation Card 3 */}
        <div className="annotation-card" id="card-3">
          <div className="annotation-card-inner">
            <div className="card-number">03 &mdash; MARKET</div>
            <div className="card-title">$500B+ Industry</div>
            <div className="card-desc">
              Transforming the entire supply chain &mdash; contractors, suppliers, distributors
              &mdash; through a single unified digital currency ecosystem.
            </div>
            <div className="card-stat">HOME IMPROVEMENT &middot; SECTOR</div>
          </div>
        </div>

        {/* Annotation Card 4 */}
        <div className="annotation-card" id="card-4">
          <div className="annotation-card-inner">
            <div className="card-number">04 &mdash; OWNERSHIP</div>
            <div className="card-title">Patent Protected</div>
            <div className="card-desc">
              Exclusively issued and managed by FollowMe Global Business Solutions. The only
              digital currency of its class &mdash; protected and defensible.
            </div>
            <div className="card-stat">FMT &middot; EXCLUSIVELY ISSUED</div>
          </div>
        </div>
      </div>
    </section>
  )
}
