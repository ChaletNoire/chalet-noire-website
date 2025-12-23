import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@/components/media/RichText'
import PlusDivider from '@/components/PlusDivider'

export default async function Announcement() {
  const payload = await getPayload({ config })
  const announcement = await payload.findGlobal({
    slug: 'announcement',
  })
  const data = announcement?.AnnouncementText
  if (!data) return null

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-4">
      <PlusDivider />
      <RichText data={data} />
      <PlusDivider />
    </div>
  )
}
