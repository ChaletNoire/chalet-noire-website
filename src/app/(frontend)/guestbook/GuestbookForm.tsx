'use client'

import { useActionState } from 'react'
import { addGuestbookEntry } from './actions'

const initialState = { error: '', success: false }

export function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const result = await addGuestbookEntry(formData)
      return {
        error: result.error ?? '',
        success: result.success ?? false,
      }
    },
    initialState,
  )

  return (
    <form action={formAction} className="flex flex-col gap-3 py-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          disabled={isPending}
          className="border border-gray-300 px-3 py-2 flex-1 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-gray-500"
        />
        <input
          type="text"
          name="message"
          placeholder="Leave a message..."
          required
          disabled={isPending}
          className="border border-gray-300 px-3 py-2 flex-[2] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors underline text-sm tracking-wide italic"
        >
          {isPending ? 'Signing...' : 'Sign'}
        </button>
      </div>

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  )
}
