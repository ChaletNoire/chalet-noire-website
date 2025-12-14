import React from 'react'
import Banner from '@/components/Banner'
import type { GlobalConfig } from '@/payload-types'
import Footer from '@/components/Footer'

interface PageContainerProps {
  children: React.ReactNode
  globalConfig: GlobalConfig | null
}

export default function PageContainer({ children, globalConfig }: PageContainerProps) {
  return (
    <div className="max-w-2xl w-full h-full min-h-[calc(100dvh+80px)] flex flex-col">
      {globalConfig && <Banner globalConfig={globalConfig} />}
      <div className="w-full pt-6 flex-1">{children}</div>
      <div className="h-full flex justify-end items-end">
        <Footer />
      </div>
    </div>
  )
}
