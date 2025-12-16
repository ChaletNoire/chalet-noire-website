import type { Media } from '@/payload-types'
import { getMediaType, getPreviewSize, MediaType } from './utils'
import MediaWrapper from './MediaWrapper'
import Image from 'next/image'

const PREVIEW_SIZE = 200

export const PostVisualMedia = ({ media }: { media: Media }) => {
  const isImage = getMediaType(media) === MediaType.IMAGE
  const isVideo = getMediaType(media) === MediaType.VIDEO

  if (!isImage && !isVideo) {
    return null
  }
  const { width, height } = getPreviewSize(media, PREVIEW_SIZE)

  if (isImage) {
    return (
      <MediaWrapper media={media}>
        <Image src={media.url!} alt={media.alt} width={width} height={height} />
      </MediaWrapper>
    )
  }

  return <div></div>
}
