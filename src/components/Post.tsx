import type { Media, Post } from '@/payload-types'
import { RichText } from './media/RichText'
import { MediaSource } from '@/enums/PostTypes'
import PostImage from './media/Image'

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

function DisplayMedia({
  media,
  maxHeight,
  className,
}: {
  media: Media
  maxHeight?: number
  className?: string
}) {
  const mediaType = getMediaType(media)
  if (mediaType === MediaType.IMAGE) {
    return <PostImage media={media} resolution={720} maxHeight={maxHeight} className={className} />
  }
  return null
}

function MediaGallery({
  currentMedia,
  media,
  maxHeight,
}: {
  currentMedia: Media
  media: Media[]
  maxHeight?: number
}) {
  return (
    <div>
      <DisplayMedia media={currentMedia} maxHeight={maxHeight} />
    </div>
  )
}

function PostMedia({ post }: { post: Post }) {
  const alignment = post.Alignment || 'left'

  if (post.mediaSource === MediaSource.ONLY_TEXT) {
    return <div>{post.content && <RichText data={post.content} />}</div>
  }

  const populatedMedia = (post.media ?? []).filter(isMedia)

  if (populatedMedia.length === 1) {
    const mediaElement = (
      <DisplayMedia
        media={populatedMedia[0]}
        maxHeight={post.maxMediaHeight}
        className={`${alignment === 'left' ? 'float-left mr-4' : alignment === 'right' ? 'float-right ml-4' : 'mx-auto'}`}
      />
    )
    const contentElement = post.content && <RichText data={post.content} />

    return (
      <div>
        {alignment === 'center' ? (
          <>
            {contentElement}
            {mediaElement}
          </>
        ) : (
          <>
            {mediaElement}
            {contentElement}
          </>
        )}
      </div>
    )
  }

  return (
    <div>
      {post.mediaSource === MediaSource.EMBEDDED ? (
        <div
          dangerouslySetInnerHTML={{ __html: post.embeddedMedia }}
          className="w-full flex justify-center [&>iframe]:max-w-full"
        />
      ) : (
        populatedMedia.length > 0 && (
          <MediaGallery
            currentMedia={populatedMedia[0]}
            media={populatedMedia}
            maxHeight={post.maxMediaHeight}
          />
        )
      )}
    </div>
  )
}

function PostHeader({ post }: { post: Post }) {
  if (!post.title) {
    return null
  }
  return (
    <div className="font-bold uppercase text-center">
      <h2 className="inline">{post.title} </h2>
      <span className="inline">
        {new Date(post.createdAt).toLocaleDateString('en-CA').replace(/-/g, '/')}{' '}
      </span>
    </div>
  )
}

const alignmentClasses = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const

export default function Post({ post }: { post: Post }) {
  const alignment = post.Alignment || 'left'
  return (
    <div className={`w-full flex flex-col items-center gap-2`}>
      <PostHeader post={post} />
      <div className={`w-full ${alignmentClasses[alignment]}`}>
        <PostMedia post={post} />
      </div>
    </div>
  )
}
