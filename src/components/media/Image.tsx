import Image from 'next/image'
import type { Media } from '@/payload-types'

export default function PostImage({
  media,
  resolution,
  className,
  maxHeight,
}: {
  media: Media
  resolution: number
  className?: string
  maxHeight?: number
}) {
  const aspectRatio = media.width / media.height
  const scaledHeight = media.height * (resolution / media.width)

  // If maxHeight is set and would constrain the image, calculate actual dimensions
  const actualHeight = maxHeight && scaledHeight > maxHeight ? maxHeight : scaledHeight
  const actualWidth = maxHeight && scaledHeight > maxHeight ? maxHeight * aspectRatio : resolution

  return (
    <div className={`w-fit ${className ?? ''}`}>
      <Image src={media.url} alt={media.alt} width={actualWidth} height={actualHeight} />
    </div>
  )
}
