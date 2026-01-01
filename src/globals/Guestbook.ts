export const Guestbook = {
  slug: 'guestbook',
  fields: [
    {
      name: 'GuestbookEntries',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'message',
          type: 'text',
        },
      ],
    },
  ],
}
