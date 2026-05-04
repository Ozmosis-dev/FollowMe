'use client'

import Image from 'next/image'

interface LoaderProps {
  progress: number
  hidden: boolean
}

export default function Loader({ progress, hidden }: LoaderProps) {
  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-logo">
        <Image src="/fmt-logo.svg" alt="FMT" width={56} height={56} />
      </div>
      <div className="loader-track">
        <div className="loader-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-label">
        {progress < 100 ? `${Math.round(progress)}%` : 'Ready'}
      </div>
    </div>
  )
}
