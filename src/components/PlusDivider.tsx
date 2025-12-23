'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import PlusSVG from '@/assets/plus.svg'

const PLUS_HEIGHT = 10
const PLUS_GAP = 4 // gap-1 = 0.25rem = 4px

export default function PlusDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [plusCount, setPlusCount] = useState(0)

  // SVG aspect ratio from viewBox: 191.4455 / 132.08907 ≈ 1.45
  const aspectRatio = 191.4455 / 132.08907
  const plusWidth = PLUS_HEIGHT * aspectRatio

  useEffect(() => {
    const calculateCount = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      // Calculate how many plus elements fit: (containerWidth + gap) / (plusWidth + gap)
      const count = Math.floor((containerWidth + PLUS_GAP) / (plusWidth + PLUS_GAP))
      setPlusCount(count)
    }

    calculateCount()
    window.addEventListener('resize', calculateCount)
    return () => window.removeEventListener('resize', calculateCount)
  }, [plusWidth])

  return (
    <div ref={containerRef} className="w-full overflow-hidden px-8 py-1">
      <div
        className="flex justify-center items-center gap-1"
        style={{ height: `${PLUS_HEIGHT}px` }}
      >
        {Array.from({ length: plusCount }).map((_, i) => (
          <Image
            key={i}
            src={PlusSVG}
            alt=""
            className="h-full w-auto flex-shrink-0"
            style={{ height: `${PLUS_HEIGHT}px`, width: 'auto' }}
          />
        ))}
      </div>
    </div>
  )
}

