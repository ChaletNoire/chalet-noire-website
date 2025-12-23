import type { CollectionConfig } from 'payload'
import { Platform, PlatformOptions } from '@/enums/Platform'

export const Shows: CollectionConfig = {
  slug: 'shows',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'performers',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'recordings',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: PlatformOptions,
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            condition: (_data: unknown, siblingData: { platform?: string }) =>
              siblingData?.platform === Platform.OTHER,
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_data: unknown, siblingData: { platform?: string }) =>
              siblingData?.platform !== Platform.AUDIO_SELF_HOSTED &&
              siblingData?.platform !== Platform.VIDEO_SELF_HOSTED,
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_data: unknown, siblingData: { platform?: string }) =>
              siblingData?.platform === Platform.AUDIO_SELF_HOSTED ||
              siblingData?.platform === Platform.VIDEO_SELF_HOSTED,
          },
        },
      ],
    },
  ],
}
