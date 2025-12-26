import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BroadcastStatus } from '@/components/BroadcastStatus'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [siteInfo, landingPage, broadcast] = await Promise.all([
    payload.findGlobal({ slug: 'global-config' as any }),
    payload.findGlobal({ slug: 'landing-page' }),
    payload.findGlobal({ slug: 'broadcast' }),
  ])

  // Get logo URL from global config
  let logoUrl = '/assets/logo.svg'
  if ((siteInfo as any)?.Logo) {
    const logo =
      typeof (siteInfo as any).Logo === 'object'
        ? (siteInfo as any).Logo
        : await payload.findByID({
            collection: 'media',
            id: (siteInfo as any).Logo,
          })
    if (logo && typeof logo === 'object' && logo.url) {
      logoUrl = logo.url
    }
  }

  return (
    <div className="bg-black text-white w-full overscroll-none h-[100dvh] flex justify-center items-center flex-col gap-4 relative">
      <BroadcastStatus
        initialData={{
          live: broadcast?.Live ?? false,
          embed: broadcast?.['Live Embed'] ?? '',
        }}
        logoUrl={logoUrl}
      />
      <div className="uppercase font-bold">
        <Link href="/blog">{landingPage?.LinkToBlog}</Link>
      </div>
    </div>
  )
}
