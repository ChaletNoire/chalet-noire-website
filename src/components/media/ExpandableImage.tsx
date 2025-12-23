'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  width: number
  height: number
}

export function ExpandableImage({ src, alt, width, height }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVertical, setIsVertical] = useState<boolean | null>(null)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    // Use naturalWidth/naturalHeight to get actual image dimensions (respects EXIF orientation)
    setIsVertical(img.naturalHeight > img.naturalWidth)
  }

  // Determine class based on detected orientation
  const sizeClass =
    isVertical === null
      ? 'max-h-[150px] w-auto' // Default while loading
      : isVertical
        ? 'max-w-[150px] h-auto'
        : 'max-h-[150px] w-auto'

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`cursor-pointer transition-transform hover:scale-105 ${sizeClass}`}
        onClick={() => setIsExpanded(true)}
        onLoad={handleLoad}
      />

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
          onClick={() => setIsExpanded(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}



