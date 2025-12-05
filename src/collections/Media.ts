import type { CollectionConfig } from 'payload'
import { MediaType } from '../enums/MediaType'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
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
  },
}
