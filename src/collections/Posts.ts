import type { CollectionConfig } from 'payload'
import { MediaSource } from '@/enums/PostTypes'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
    {
      name: 'mediaSource',
      type: 'select',
      options: [
        {
          label: 'Self Hosted',
          value: MediaSource.SELF_HOSTED,
        },
        {
          label: 'Embedded',
          value: MediaSource.EMBEDDED,
        },
        {
          label: 'Only Text',
          value: MediaSource.ONLY_TEXT,
        },
      ],
      required: false,
      defaultValue: MediaSource.SELF_HOSTED,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: false,
      admin: {
        condition: (data) => data?.mediaSource === MediaSource.SELF_HOSTED,
      },
    },
    {
      name: 'embeddedMedia',
      type: 'code',
      required: false,
      admin: {
        condition: (data) => data?.mediaSource === MediaSource.EMBEDDED,
      },
    },
    {
      name: 'Alignment',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Center',
          value: 'center',
        },
      ],
      required: false,
      defaultValue: 'left',
      admin: {
        condition: (data) =>
          data?.mediaSource !== MediaSource.SELF_HOSTED ||
          (data?.mediaSource === MediaSource.SELF_HOSTED && data?.media?.length <= 1),
      },
    },
    {
      name: 'maxMediaHeight',
      type: 'number',
      required: false,
      defaultValue: 300,
    },
  ],
}
