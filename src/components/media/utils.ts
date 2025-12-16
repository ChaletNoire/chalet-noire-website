import type { Media } from '@/payload-types'
import { MediaOrientation, MediaType } from '@/enums/Media'

function getMediaType(media: Media): MediaType {
  const mimeType = media.mimeType
  if (!mimeType) {
    return MediaType.UNKNOWN
  }

  if (mimeType.startsWith('image/')) {
    return MediaType.IMAGE
  }
  if (mimeType.startsWith('video/')) {
    return MediaType.VIDEO
  }
  if (mimeType.startsWith('audio/')) {
    return MediaType.AUDIO
  }

  return MediaType.UNKNOWN
}

function isMedia(item: unknown): item is Media {
  return typeof item === 'object' && item !== null && 'mimeType' in item
}

function getOrientation(media: Media): MediaOrientation {
  return media.orientation as MediaOrientation
}

function getPreviewSize(media: Media, previewSize: number) {
  const isPortrait = getOrientation(media) === MediaOrientation.PORTRAIT
  const origWidth = isPortrait ? media.height! : media.width!
  const origHeight = isPortrait ? media.width! : media.height!

  let displayWidth: number
  let displayHeight: number

  if (isPortrait) {
    displayWidth = Math.min(origWidth, previewSize)
    displayHeight = origHeight * (displayWidth / origWidth)
  } else {
    displayHeight = Math.min(origHeight, previewSize)
    displayWidth = origWidth * (displayHeight / origHeight)
  }
  return { width: displayWidth, height: displayHeight }
}

export { MediaType, getMediaType, isMedia, getPreviewSize }
