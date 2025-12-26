'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import LogoRotating from '@/components/graphics/LogoRotating'

interface BroadcastData {
  live: boolean
  embed: string
}

interface PollingConfig {
  /** Minutes of the hour to check (e.g., [0, 15, 30, 45] for quarter hours) */
  checkMinutes: number[]
  /** Seconds before each check minute to also poll (e.g., [30, 60] for 30s and 1min before) */
  beforeOffsetSeconds: number[]
}

const DEFAULT_POLLING_CONFIG: PollingConfig = {
  checkMinutes: [0, 15, 30, 45],
  beforeOffsetSeconds: [30, 60],
}

/**
 * Find the next target minute from the given array of minutes
 * @returns The next target minute and milliseconds until it
 */
function getNextTargetMinute(checkMinutes: number[]): { minute: number; msUntil: number } {
  const now = new Date()
  const currentMinute = now.getMinutes()
  const currentSeconds = now.getSeconds()
  const currentMs = now.getMilliseconds()

  // Sort minutes to ensure proper order
  const sortedMinutes = [...checkMinutes].sort((a, b) => a - b)

  // Find the next target minute
  let nextMinute = sortedMinutes.find((m) => m > currentMinute)

  // If no minute found this hour, wrap to first minute next hour
  const wrapsToNextHour = nextMinute === undefined
  if (wrapsToNextHour) {
    nextMinute = sortedMinutes[0]
  }

  // Calculate milliseconds until the target minute
  let minutesUntil = wrapsToNextHour
    ? 60 - currentMinute + nextMinute!
    : nextMinute! - currentMinute

  // If we're exactly on a target minute, go to the next one
  if (minutesUntil === 0 && currentSeconds === 0 && currentMs === 0) {
    const currentIndex = sortedMinutes.indexOf(nextMinute!)
    const nextIndex = (currentIndex + 1) % sortedMinutes.length
    nextMinute = sortedMinutes[nextIndex]
    minutesUntil = nextIndex === 0 ? 60 - currentMinute + nextMinute : nextMinute - currentMinute
  }

  const msUntil = minutesUntil * 60 * 1000 - currentSeconds * 1000 - currentMs

  return { minute: nextMinute!, msUntil }
}

/**
 * Calculate milliseconds until a specific offset before the next target minute
 * @param checkMinutes - Array of target minutes
 * @param offsetSeconds - Seconds before the target (0 = exact time)
 */
function getMillisUntilTargetMinus(checkMinutes: number[], offsetSeconds: number): number {
  const { msUntil } = getNextTargetMinute(checkMinutes)
  const msWithOffset = msUntil - offsetSeconds * 1000

  // If we've already passed this offset point, calculate for next cycle
  if (msWithOffset <= 0) {
    // Find the interval between check minutes to add
    const sortedMinutes = [...checkMinutes].sort((a, b) => a - b)
    const intervals: number[] = []
    for (let i = 0; i < sortedMinutes.length; i++) {
      const next = sortedMinutes[(i + 1) % sortedMinutes.length]
      const current = sortedMinutes[i]
      intervals.push(next > current ? next - current : 60 - current + next)
    }
    const minInterval = Math.min(...intervals) * 60 * 1000
    return msWithOffset + minInterval
  }

  return msWithOffset
}

/**
 * Get all fetch delays based on polling configuration
 * @returns Array of milliseconds until each fetch point, sorted ascending
 */
function getNextFetchDelays(config: PollingConfig): number[] {
  const { checkMinutes, beforeOffsetSeconds } = config

  // Include 0 (exact time) plus all configured offsets
  const allOffsets = [0, ...beforeOffsetSeconds]

  const delays = allOffsets.map((offset) => getMillisUntilTargetMinus(checkMinutes, offset))

  // Remove duplicates and sort
  return [...new Set(delays)].sort((a, b) => a - b)
}

export function BroadcastStatus({
  initialData,
  logoUrl,
  checkMinutes = DEFAULT_POLLING_CONFIG.checkMinutes,
  beforeOffsetSeconds = DEFAULT_POLLING_CONFIG.beforeOffsetSeconds,
}: {
  initialData: BroadcastData
  logoUrl: string
  /** Minutes of the hour to check (default: [0, 15, 30, 45]) */
  checkMinutes?: number[]
  /** Seconds before each check minute to also poll (default: [30, 60]) */
  beforeOffsetSeconds?: number[]
}) {
  const [broadcast, setBroadcast] = useState(initialData)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const pollingConfig = useMemo<PollingConfig>(
    () => ({ checkMinutes, beforeOffsetSeconds }),
    [checkMinutes, beforeOffsetSeconds],
  )

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

  const scheduleFetches = useCallback(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    const delays = getNextFetchDelays(pollingConfig)

    // Schedule fetches at each delay point
    delays.forEach((delay) => {
      const timeout = setTimeout(() => {
        fetchStatus()
      }, delay)
      timeoutsRef.current.push(timeout)
    })

    // After the last fetch, schedule the next cycle
    const lastDelay = Math.max(...delays)
    const rescheduleTimeout = setTimeout(() => {
      scheduleFetches()
    }, lastDelay + 100) // Small buffer after target time

    timeoutsRef.current.push(rescheduleTimeout)
  }, [fetchStatus, pollingConfig])

  useEffect(() => {
    scheduleFetches()

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [scheduleFetches])

  return (
    <>
      <div className="absolute top-10 left-10 md:left-30">
        <div className="banner-border-2 px-2">
          <div className="top-0 justify-center items-center flex h-full uppercase text-lg font-bold text-center w-full text-white">
            {broadcast.live ? 'Live Now' : 'Offline'}
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
