import React from 'react'
import { GlobalConfig } from '@/payload-types'
import NavLink from './NavLink'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

const Title = ({ title, subTitle }: { title?: string; subTitle?: string }) => {
  return (
    <Link className="w-full flex flex-col no-underline" href="/" prefetch={true}>
      <div className="mt-[-2px]">
        <h1 className={`text-4xl md:text-5xl mb-[-4px] font-lyon ${!title ? 'text-red-500' : ''}`}>
          {title ? title : 'No title'}
        </h1>
        <h2 className="text-[1.2rem] md:text-[1.6rem] font-arial-black mt-[-15px] mb-[-6px] uppercase">
          {subTitle ? subTitle : 'No subtitle'}
        </h2>
      </div>
    </Link>
  )
}

async function Navigation() {
  const payload = await getPayload({ config })

  const [postsResult, showsResult] = await Promise.all([
    payload.count({ collection: 'posts' }),
    payload.count({ collection: 'shows' }),
  ])

  return (
    <div className="w-full flex gap-2 md:gap-4 text-base">
      <NavLink href="/blog" hideIndicatorSpace>
        Blog({postsResult.totalDocs})
      </NavLink>
      <NavLink href="/shows" className="justify-self-center">
        Shows({showsResult.totalDocs})
      </NavLink>
    </div>
  )
}

export default async function Banner({ globalConfig }: { globalConfig: GlobalConfig }) {
  return (
    <div className="w-full px-4 py-2 banner-border-4">
      <Title
        title={globalConfig?.Title ?? undefined}
        subTitle={globalConfig?.SubTitle ?? undefined}
      />
      <Navigation />
    </div>
  )
}
