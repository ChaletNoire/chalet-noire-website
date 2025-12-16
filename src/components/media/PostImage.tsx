import Image from 'next/image'
import type { Media } from '@/payload-types'
import MediaWrapper from './MediaWrapper'

export default function PostImage({ media }: { media: Media; resolution: number }) {
  const resolution = 500
  const isPortrait = media.orientation === 'portrait'
  console.log(media.orientation)
  const width = isPortrait ? media.height! : media.width!
  const height = isPortrait ? media.width! : media.height!
  const scaledHeight = height * (resolution / width)

  return (
    <MediaWrapper media={media}>
      <Image
        src={media.url!}
        alt={media.alt}
        width={resolution}
        height={scaledHeight}
        className={`${isPortrait ? `max-w-[250px] h-auto` : `max-h-[250px] w-auto`}`}
      />
    </MediaWrapper>
  )
}
