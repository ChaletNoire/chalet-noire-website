'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
}

export default function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} {...props} prefetch={true} className={`relative ${className || ''}`}>
      <span className={`inline-block text-center pr-1 ${!isActive ? 'invisible' : 'visible'}`}>
        ▸
      </span>
      {children}
    </Link>
  )
}
