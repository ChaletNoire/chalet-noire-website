'use client'

import { useState, useEffect, useCallback } from 'react'

export interface BroadcastData {
  live: boolean
  embed: string
  announcementText: any // Rich text data from Payload
}

const DEFAULT_POLL_INTERVAL_MS = 10 * 1000 // 10 seconds

export function useBroadcastPolling(
  initialData: BroadcastData,
  pollIntervalMs: number = DEFAULT_POLL_INTERVAL_MS
) {
  const [broadcast, setBroadcast] = useState<BroadcastData>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  const fetchStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/broadcast-status', {
        cache: 'no-store',
      })
      if (res.ok) {
        setBroadcast(await res.json())
      }
    } catch (e) {
      console.error('Failed to fetch broadcast status:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchStatus, pollIntervalMs)
    return () => clearInterval(interval)
  }, [fetchStatus, pollIntervalMs])

  return { broadcast, isLoading, refetch: fetchStatus }
}

