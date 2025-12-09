import React from 'react'
import '@/app/styles/globals.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { lyon } from '@/lib/fonts'
import ConditionalWrapper from '@/components/ConditionalWrapper'
import PageContainer from '@/components/PageContainer'
import type { GlobalConfig } from '@/payload-types'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const globalConfig = (await payload.findGlobal({
    slug: 'global-config',
  })) as GlobalConfig

  return (
    <html lang="en" className={lyon.variable}>
      <head>
        <title>{globalConfig?.Title}</title>
        <meta name="description" content={globalConfig?.IntroText ?? ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Pierre-Louis Suckrow" />
        <meta name="keywords" content="Chalet Noire, Music, Radio" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-times-new-roman h-full">
        <ConditionalWrapper
          homePageContent={children}
          otherPagesContent={
            <div className="py-2 px-4 flex flex-col items-center h-full">
              <PageContainer globalConfig={globalConfig}>{children}</PageContainer>
            </div>
          }
        />
      </body>
    </html>
  )
}
