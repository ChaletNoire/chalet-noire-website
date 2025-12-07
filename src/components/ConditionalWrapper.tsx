'use client'

import { usePathname } from 'next/navigation'

interface ConditionalWrapperProps {
  homePageContent: React.ReactNode
  otherPagesContent: React.ReactNode
}

export default function ConditionalWrapper({
  homePageContent,
  otherPagesContent,
}: ConditionalWrapperProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    return <>{homePageContent}</>
  }

  return <>{otherPagesContent}</>
}
