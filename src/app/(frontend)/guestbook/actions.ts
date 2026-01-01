'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'

interface GuestbookEntry {
  name?: string | null
  message?: string | null
  id?: string | null
}

interface GuestbookData {
  GuestbookEntries?: GuestbookEntry[] | null
}

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get('name') as string
  const message = formData.get('message') as string

  if (!name?.trim() || !message?.trim()) {
    return { error: 'Name and message are required' }
  }

  try {
    const payload = await getPayload({ config })
    const guestbook = (await payload.findGlobal({ slug: 'guestbook' })) as GuestbookData

    const existingEntries = guestbook?.GuestbookEntries ?? []

    await payload.updateGlobal({
      slug: 'guestbook',
      data: {
        GuestbookEntries: [
          ...existingEntries,
          {
            name: name.trim(),
            message: message.trim(),
          },
        ],
      },
    })

    revalidatePath('/guestbook')
    return { success: true }
  } catch (error) {
    console.error('Failed to add guestbook entry:', error)
    return { error: 'Failed to add entry. Please try again.' }
  }
}

