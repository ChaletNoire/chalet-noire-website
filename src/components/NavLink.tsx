'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
  hideIndicatorSpace?: boolean
}

export default function NavLink({
  href,
  children,
  className,
  hideIndicatorSpace,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const indicatorClass = hideIndicatorSpace
    ? isActive
      ? 'inline-block pr-1'
      : 'hidden'
    : `inline-block text-center pr-1 ${!isActive ? 'invisible' : 'visible'}`

  return (
    <Link href={href} {...props} prefetch={true} className={`relative ${className || ''}`}>
      <span className={indicatorClass}>▸</span>
      {children}
    </Link>
  )
}
