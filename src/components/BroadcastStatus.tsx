'use client'

import LogoRotating from '@/components/graphics/LogoRotating'
import { useBroadcastPolling, BroadcastData } from '@/hooks/useBroadcastPolling'

export function BroadcastStatus({
  initialData,
  logoUrl,
  pollIntervalMs,
}: {
  initialData: BroadcastData
  logoUrl: string
  /** Polling interval in milliseconds (default: 10000 = 10 seconds) */
  pollIntervalMs?: number
}) {
  const { broadcast } = useBroadcastPolling(initialData, pollIntervalMs)

  return (
    <>
      <div className="absolute top-10 left-10 md:left-30">
        <div className="banner-border-2 px-2">
          <div className="top-0 justify-center items-center flex h-full text-lg font-bold text-center w-full text-white">
            {broadcast.live ? 'LIVE NOW - From the Chalet' : 'OFFLINE'}
          </div>
        </div>
      </div>

      {!broadcast.live ? (
        <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] blur-[1px] m-10">
          <LogoRotating svgPath={logoUrl} />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: broadcast.embed }} />
      )}
    </>
  )
}
