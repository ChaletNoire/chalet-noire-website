import type { Media } from '@/payload-types'

enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  UNKNOWN = 'unknown',
}

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

function isMedia(item: number | Media): item is Media {
  return typeof item === 'object' && item !== null
}

export { MediaType, getMediaType, isMedia }
