import React from 'react'
import LogoRotating from '@/components/graphics/LogoRotating'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'

const BroadCastStatus = ({ live }: { live: boolean }) => {
  return (
    <div className="banner-border-2 px-2">
      <div className="top-0 justify-center items-center flex h-full uppercase text-lg font-bold text-center w-full text-white">
        {live ? 'Live Now' : 'Offline'}
      </div>
    </div>
  )
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const siteInfo = (await payload.findGlobal({
    slug: 'global-config' as any,
  })) as any

  const landingPage = await payload.findGlobal({
    slug: 'landing-page',
  })

  const broadcast = await payload.findGlobal({
    slug: 'broadcast',
  })

  // Get logo URL from global config
  let logoUrl = '/assets/logo.svg'
  if (siteInfo?.Logo) {
    const logo =
      typeof siteInfo.Logo === 'object'
        ? siteInfo.Logo
        : await payload.findByID({
            collection: 'media',
            id: siteInfo.Logo,
          })
    if (logo && typeof logo === 'object' && logo.url) {
      logoUrl = logo.url
    }
  }

  return (
    <div className="bg-black text-white w-full overscroll-none h-[100dvh] flex justify-center items-center flex-col gap-4 relative">
      <div className="absolute top-10 left-10 md:left-30">
        <BroadCastStatus live={broadcast?.Live ?? false} />
      </div>
      {!broadcast?.Live ? (
        <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] blur-[1px] m-10">
          <LogoRotating svgPath={logoUrl} />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: broadcast?.['Live Embed'] ?? '' }} />
      )}
      <div className="uppercase font-bold">
        <Link href="/blog">{landingPage?.LinkToBlog}</Link>
      </div>
    </div>
  )
}
