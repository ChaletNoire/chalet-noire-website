import {
  RichText as RichTextConverter,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedAutoLinkNode, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'
import { YouTubeEmbed } from './Video'
import PostImage from './PostImage'
import { isMedia, getMediaType, MediaType, getYouTubeVideoId } from './utils'
import { PostVisualMedia } from './PostMedia'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const uploadNode = node as SerializedUploadNode

    // If value is not populated (just an ID), we can't render
    if (typeof uploadNode.value !== 'object' || !uploadNode.value) {
      return null
    }

    if (
      isMedia(uploadNode.value) &&
      (getMediaType(uploadNode.value) === MediaType.IMAGE ||
        getMediaType(uploadNode.value) === MediaType.VIDEO)
    ) {
      return <PostVisualMedia media={uploadNode.value as Media} />
    }

    return null
  },
  link: ({ node, nodesToJSX }) => {
    const linkNode = node as SerializedLinkNode
    const url = linkNode.fields.url ?? ''
    const youtubeId = getYouTubeVideoId(url)

    // If it's a YouTube link, render an embed
    if (youtubeId) {
      return <YouTubeEmbed videoId={youtubeId} />
    }

    // Otherwise render a normal link
    const children = nodesToJSX({ nodes: linkNode.children })
    const rel = linkNode.fields.newTab ? 'noopener noreferrer' : undefined
    const target = linkNode.fields.newTab ? '_blank' : undefined

    return (
      <a href={url} rel={rel} target={target}>
        {children}
      </a>
    )
  },
  autolink: ({ node, nodesToJSX }) => {
    const autolinkNode = node as SerializedAutoLinkNode
    const url = autolinkNode.fields.url ?? ''
    const youtubeId = getYouTubeVideoId(url)

    // If it's a YouTube link, render an embed
    if (youtubeId) {
      return <YouTubeEmbed videoId={youtubeId} />
    }

    // Otherwise render a normal link
    const children = nodesToJSX({ nodes: autolinkNode.children })
    const rel = autolinkNode.fields.newTab ? 'noopener noreferrer' : undefined
    const target = autolinkNode.fields.newTab ? '_blank' : undefined

    return (
      <a href={url} rel={rel} target={target}>
        {children}
      </a>
    )
  },
})

export function RichText(props: Props) {
  const { className, ...rest } = props

  return <RichTextConverter {...rest} className={className} converters={jsxConverters} />
}
