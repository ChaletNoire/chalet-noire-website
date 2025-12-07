export const Broadcast = {
  slug: 'broadcast',
  fields: [
    {
      name: 'Live',
      type: 'checkbox',
      defaultValue: false,
    },
    {
        name: 'Live Embed',
        type: 'code',
        language: 'html',
        required: true,
    }
  ],
}