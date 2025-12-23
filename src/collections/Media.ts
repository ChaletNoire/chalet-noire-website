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
      label: 'Delivery Format',
      admin: {
        description:
          'Select "Adaptive Video Stream" for HLS streams (.m3u8). The uploaded file should be the master playlist.',
      },
      options: [
        {
          label: 'Normal',
          value: DeliveryFormat.NORMAL,
        },
        {
          label: 'Adaptive Video Stream (HLS)',
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
      label: 'HLS Index File URL',
      required: false,
      admin: {
        condition: (data) => data?.deliveryFormat === DeliveryFormat.ADAPTIVE_VIDEO_STREAM,
        description:
          'Full URL to the .m3u8 master playlist file. If left empty, the uploaded file URL will be used.',
      },
      validate: (
        value: string | null | undefined,
        { data }: { data: { deliveryFormat?: string } },
      ) => {
        if (data?.deliveryFormat === DeliveryFormat.ADAPTIVE_VIDEO_STREAM) {
          // If a value is provided, it should end with .m3u8
          if (value && !value.endsWith('.m3u8')) {
            return 'HLS index file must be a .m3u8 file'
          }
        }
        return true
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
