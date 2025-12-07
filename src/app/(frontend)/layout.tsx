import React from 'react'
import '@/app/styles/globals.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { lyon } from '@/lib/fonts'
import Image from 'next/image'
import type { GlobalConfig, Media } from '@/payload-types'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const siteInfo = (await payload.findGlobal({
    slug: 'global-config',
  })) as GlobalConfig

  const logo = siteInfo.Logo as Media

  return (
    <html lang="en" className={lyon.variable}>
      <head>
        <title>{siteInfo?.Title}</title>
      </head>
      <body className="font-times-new-roman">
        Hello World
        {logo?.url && (
          <Image
            src={logo.url}
            alt={logo.alt || 'Logo'}
            className="h-100 w-auto"
            width={logo.width || 100}
            height={logo.height || 100}
          />
        )}
      </body>
    </html>
  )
}
