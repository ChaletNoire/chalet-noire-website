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

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/shorts\/([^&\s?]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }

  return null
}

export { MediaType, getMediaType, isMedia, getPreviewSize, getYouTubeVideoId }
