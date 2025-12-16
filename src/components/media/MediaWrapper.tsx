import type { Media } from '@/payload-types'

export default function MediaWrapper({
  media,
  children,
}: {
  media: Media
  children: React.ReactNode
}) {
  return (
    <div className="w-fit h-fit flex flex-col">
      {children}
      <div className="flex flex-row gap-1">
        <a href={media.url!} target="_blank" rel="noopener noreferrer">
          [View]
        </a>
        <div>
          <span>File: </span>
          <a href={media.url!} download={media.filename!} rel="noopener noreferrer">
            {media.filename}
          </a>
        </div>
      </div>
    </div>
  )
}
