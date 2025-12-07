import React from 'react'
import Banner from '@/components/Banner'
import type { GlobalConfig } from '@/payload-types'
import Footer from '@/components/Footer'

interface PageContainerProps {
  children: React.ReactNode
  siteInfo: GlobalConfig | null
}

export default function PageContainer({ children, siteInfo }: PageContainerProps) {
  return (
    <div className="max-w-4xl w-full">
      {siteInfo && <Banner siteInfo={siteInfo} />}
      <div className="w-full pt-6">{children}</div>
      <Footer />
    </div>
  )
}
