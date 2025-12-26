'use client'

import { useState, useEffect, useCallback } from 'react'
import LogoRotating from '@/components/graphics/LogoRotating'

interface BroadcastData {
  live: boolean
  embed: string
}

const DEFAULT_POLL_INTERVAL_MS = 10 * 1000 // 1 minute

export function BroadcastStatus({
  initialData,
  logoUrl,
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
}: {
  initialData: BroadcastData
  logoUrl: string
  /** Polling interval in milliseconds (default: 60000 = 1 minute) */
  pollIntervalMs?: number
}) {
  const [broadcast, setBroadcast] = useState(initialData)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/broadcast-status', {
        cache: 'no-store',
      })
      if (res.ok) {
        setBroadcast(await res.json())
      }
    } catch (e) {
      console.error('Failed to fetch broadcast status:', e)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchStatus, pollIntervalMs)
    return () => clearInterval(interval)
  }, [fetchStatus, pollIntervalMs])

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
