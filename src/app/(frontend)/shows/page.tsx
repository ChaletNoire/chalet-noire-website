import Info from '@/components/Info'
import type { Show } from '@/payload-types'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Platform } from '@/enums/Platform'

function ShowRecording({ recording }: { recording: Show['recordings'][number] }) {
  const isSelfHosted =
    recording.platform === Platform.AUDIO_SELF_HOSTED ||
    recording.platform === Platform.VIDEO_SELF_HOSTED
  const label = recording.platform === Platform.OTHER ? recording.label : recording.platform
  const url = isSelfHosted ? ((recording.media as Media)?.url ?? '') : (recording.url ?? '')

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      [{label}]
    </a>
  )
}

function ShowsTable({ shows }: { shows: Show[] }) {
  return (
    <table className="w-full table-auto [&_td]:align-top">
      <tbody>
        {shows.map((show) => (
          <tr key={show.id}>
            <td className="whitespace-nowrap">{new Date(show.date).toISOString().split('T')[0]}</td>
            <td>{show.title}</td>
            <td>{show.performers.map((performer) => performer.name).join(', ')}</td>
            <td className="w-32">
              {[...(show.recordings ?? [])]
                .sort((a, b) => {
                  const labelA = a.platform === Platform.OTHER ? a.label : a.platform
                  const labelB = b.platform === Platform.OTHER ? b.label : b.platform
                  return (labelA ?? '').localeCompare(labelB ?? '')
                })
                .map((recording) => <ShowRecording key={recording.id} recording={recording} />)
                .reduce<React.ReactNode[]>(
                  (acc, el, i) => (i === 0 ? [el] : [...acc, ' ', el]),
                  [],
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default async function Shows() {
  const payload = await getPayload({ config })
  const { docs: shows } = await payload.find({ collection: 'shows', sort: '-date', depth: 2 })

  return (
    <div>
      <Info />
      <hr className="mt-2" />
      <h1 className="bg-gray-200 px-2 uppercase">Shows</h1>
      <ShowsTable shows={shows} />
    </div>
  )
}
