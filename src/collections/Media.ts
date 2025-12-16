import type { CollectionConfig } from 'payload'
import { MediaOrientation, DeliveryFormat } from '@/enums/Media'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Automatically set orientation based on image dimensions
        if (data?.width && data?.height) {
          if (data.width > data.height) {
            data.orientation = MediaOrientation.LANDSCAPE
          } else if (data.height > data.width) {
            data.orientation = MediaOrientation.PORTRAIT
          } else {
            data.orientation = MediaOrientation.SQUARE
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'deliveryFormat',
      type: 'select',
      options: [
        {
          label: 'Normal',
          value: DeliveryFormat.NORMAL,
        },
        {
          label: 'Adaptive Video Stream',
          value: DeliveryFormat.ADAPTIVE_VIDEO_STREAM,
        },
      ],
      required: true,
      defaultValue: DeliveryFormat.NORMAL,
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
        condition: (data) => data?.deliveryFormat === DeliveryFormat.ADAPTIVE_VIDEO_STREAM,
      },
    },
    {
      name: 'orientation',
      type: 'text',
      admin: {
        hidden: true,
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
