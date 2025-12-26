'use client'

import Link from 'next/link'
import { RichText } from '@/components/media/RichText'
import PlusDivider from '@/components/PlusDivider'
import { useBroadcastPolling, BroadcastData } from '@/hooks/useBroadcastPolling'

export function Announcement({
  initialData,
  pollIntervalMs,
}: {
  initialData: BroadcastData
  /** Polling interval in milliseconds (default: 10000 = 10 seconds) */
  pollIntervalMs?: number
}) {
  const { broadcast } = useBroadcastPolling(initialData, pollIntervalMs)

  const isLive = broadcast.live
  const announcementText = broadcast.announcementText

  // If not live and no announcement, don't render anything
  if (!isLive && !announcementText) return null

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-4">
      <PlusDivider />
      {isLive ? (
        <Link href="/" className="text-center font-bold uppercase hover:underline">
          We are live now! Tune in now →
        </Link>
      ) : (
        <RichText data={announcementText} />
      )}
      <PlusDivider />
    </div>
  )
}
