import type { GlobalConfig as GlobalConfigType } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const GlobalConfig: GlobalConfigType = {
  access: {
    read: () => true,
    update: isAdmin,
  },

  slug: 'global-config',
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'SubTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'BannerImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Herald',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'IntroText',
      type: 'text',
    },
  ],
}
