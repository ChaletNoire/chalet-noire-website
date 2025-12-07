import React from 'react'
import '@/app/styles/globals.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { lyon } from '@/lib/fonts'
import ConditionalWrapper from '@/components/ConditionalWrapper'
import PageContainer from '@/components/PageContainer'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const siteInfo = (await payload.findGlobal({
    slug: 'global-config' as any,
  })) as any

  return (
    <html lang="en" className={lyon.variable}>
      <head>
        <title>{siteInfo?.HeadTitle}</title>
      </head>
      <body className="font-times-new-roman">
        <ConditionalWrapper
          homePageContent={children}
          otherPagesContent={
            <div className="py-2 px-4 flex flex-col items-center">
              <PageContainer siteInfo={siteInfo}>{children}</PageContainer>
            </div>
          }
        />
      </body>
    </html>
  )
}
