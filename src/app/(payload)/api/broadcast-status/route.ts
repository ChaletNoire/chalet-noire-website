import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

// Use Node.js runtime as Payload CMS requires it
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const broadcast = await payload.findGlobal({
    slug: 'broadcast',
  })

  return NextResponse.json({
    live: broadcast?.Live ?? false,
    embed: broadcast?.['Live Embed'] ?? '',
  })
}
