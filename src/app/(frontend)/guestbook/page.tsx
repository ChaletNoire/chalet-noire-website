import { getPayload } from 'payload'
import config from '@/payload.config'
import Info from '@/components/Info'
import { GuestbookForm } from './GuestbookForm'
import Flagcounter from '@/components/Flagcounter'

interface GuestbookEntry {
  name?: string | null
  message?: string | null
  id?: string | null
}

interface GuestbookData {
  GuestbookEntries?: GuestbookEntry[] | null
}

function GuestBookEntry({ entry }: { entry: GuestbookEntry }) {
  return (
    <tr>
      <td className="w-24 max-w-24 truncate font-semibold" title={entry.name ?? ''}>
        {entry.name}
      </td>
      <td className="italic">{entry.message}</td>
    </tr>
  )
}

function GuestBook({ entries }: { entries: GuestbookEntry[] }) {
  if (!entries || entries.length === 0) {
    return <p className="text-gray-500 italic px-2 py-2">No entries yet. Be the first to sign!</p>
  }

  return (
    <table className="w-full table-auto [&_td]:align-top">
      <tbody>
        {entries.map((entry) => (
          <GuestBookEntry key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  )
}

export default async function GuestbookPage() {
  const payload = await getPayload({ config })
  const guestbook = (await payload.findGlobal({ slug: 'guestbook' })) as GuestbookData

  return (
    <div>
      <Info />
      <hr className="mt-2 mb-2" />
      <Flagcounter />
      <h1 className="bg-gray-200 px-2 uppercase">Guestbook</h1>
      <GuestbookForm />
      <GuestBook entries={guestbook?.GuestbookEntries ?? []} />
    </div>
  )
}
