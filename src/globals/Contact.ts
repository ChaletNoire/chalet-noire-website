import { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Contact: GlobalConfig = {
  access: {
    read: () => true,
    update: isAdmin,
  },
  slug: 'contact',
  fields: [
    {
      name: 'Booking Email',
      type: 'text',
      required: true,
    },
    {
      name: 'Booking Mail Subject Line',
      type: 'text',
      required: false,
      defaultValue: 'Booking Inquiry',
    },
    {
      name: 'Contact Email',
      type: 'text',
      required: true,
    },
  ],
}
