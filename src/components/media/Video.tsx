'use client'
import type { Media } from '@/payload-types'
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { DeliveryFormat } from '@/enums/Media'

const VideoPlayerClasses = 'block max-h-[200px] w-auto border-2 border-black bg-black'

type VideoPlayerProps = {
  media: Media
  className?: string
} & React.VideoHTMLAttributes<HTMLVideoElement>

export function VideoPlayer({ media, className, ...props }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    if (!media.url || !videoRef.current) return

    // Clean up any existing HLS instance first
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    const isAdaptiveStream = media.deliveryFormat === DeliveryFormat.ADAPTIVE_VIDEO_STREAM
    // Use adaptiveVideoStreamIndexFile if set, otherwise fall back to the media URL
    const hlsUrl = media.adaptiveVideoStreamIndexFile || media.url

    // ---- CASE 1: ADAPTIVE VIDEO STREAM (HLS) ----
    if (isAdaptiveStream) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hlsRef.current = hls
        hls.loadSource(hlsUrl)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.ERROR, (_event, data) => {
          // Only log fatal errors - non-fatal errors are often recoverable
          if (data.fatal) {
            console.error('HLS fatal error:', data.type, data.details)
          }
        })
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS (Safari)
        videoRef.current.src = hlsUrl
      }
    } else {
      // ---- CASE 2: NORMAL VIDEO (MP4, WEBM, MOV...) ----
      videoRef.current.src = media.url
    }

    // Cleanup function - runs on unmount or before next effect
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [media])

  return (
    <div className={`h-fit leading-[0] ${className ?? ''}`}>
      <video ref={videoRef} controls preload="none" className={VideoPlayerClasses} {...props} />
    </div>
  )
}

// ---- YouTube Embed ----

type YouTubeEmbedProps = {
  videoId: string
  className?: string
}

export function YouTubeEmbed({ videoId, className }: YouTubeEmbedProps) {
  // For 16:9 aspect ratio with max-height 200px, max-width = 200 * 16/9 ≈ 355px
  // Using span with block display to avoid hydration error when nested inside <p> tags in rich text
  return (
    <span
      className={`block aspect-video relative max-h-[200px] border-2 border-black ${className ?? ''}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </span>
  )
}
