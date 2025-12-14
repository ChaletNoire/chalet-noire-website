import type { CollectionConfig } from 'payload'
import { MediaType } from '../enums/MediaType'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'deliveryFormat',
      type: 'select',
      options: [
        {
          label: 'Normal',
          value: MediaType.NORMAL,
        },
        {
          label: 'Adaptive Video Stream',
          value: MediaType.ADAPTIVE_VIDEO_STREAM,
        },
      ],
      required: true,
      defaultValue: MediaType.NORMAL,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'adaptiveVideoStreamIndexFile',
      type: 'text',
      required: false,
      admin: {
        condition: (data) => data?.type === MediaType.ADAPTIVE_VIDEO_STREAM,
      },
    },
  ],
  upload: {
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
    // Fix Content-Type headers in development mode
    // The R2 storage adapter doesn't set headers in dev due to Miniflare bug
    // See: https://github.com/payloadcms/payload/issues/7624
    modifyResponseHeaders({ headers }) {
      // Fix SVG served as application/xml
      if (headers.get('content-type') === 'application/xml') {
        headers.set('content-type', 'image/svg+xml; charset=utf-8')
      }
      return headers
    },
  },
}
