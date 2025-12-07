import React from 'react'
// TODO: Update to GlobalConfig after regenerating types
// import { GlobalConfig } from '@/payload-types'
type GlobalConfig = any
import NavLink from './NavLink'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import Image from 'next/image'

const Title = ({ title, subTitle }: { title?: string; subTitle?: string }) => {
  return (
    <Link className="w-full flex flex-col no-underline text-right" href="/">
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

function Navigation() {
  return (
    <div className="w-full flex justify-end gap-2 md:gap-4 text-base">
      <NavLink href="/blog">Blog(40)</NavLink>
      <NavLink href="/about" className="justify-self-center">
        Shows(10)
      </NavLink>
    </div>
  )
}

function Herald({ image }: { image: (number | null) | Media | undefined }) {
  if (!image || typeof image === 'number' || !image.url) return null
  return (
    <div className="flex md:w-[70px] md:h-[70px] w-[60px] h-[60px] z-10 self-end pr-1 md:pr-0">
      <Image src={image.url} alt="herald" width={70} height={70} className="object-cover" />
    </div>
  )
}

function BannerImage({ image }: { image: (number | null) | Media | undefined }) {
  if (!image || typeof image === 'number' || !image.url) return null
  return (
    <div className="h-full overflow-hidden w-full">
      <img
        src={image.url}
        alt="banner-image"
        className="h-full w-full object-cover md:object-contain md:object-left"
      />
    </div>
  )
}

export default function Banner({ globalConfig }: { globalConfig: GlobalConfig }) {
  return (
    <div className="w-full pr-2 pl-1 md:pl-2 md:px-4 py-2 banner-border-4">
      <div className="grid grid-cols-[auto_1fr]">
        <Herald image={globalConfig?.Herald} />
        <div className="w-full grid grid-cols-[auto_1fr] gap-x-2 md:h-[100px]">
          <BannerImage image={globalConfig?.BannerImage} />
          <Title
            title={globalConfig?.Title ?? undefined}
            subTitle={globalConfig?.SubTitle ?? undefined}
          />
          <div className="col-span-2 mb-[-6px] md:mb-[-6px] align-self-end w-full flex justify-end">
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  )
}
