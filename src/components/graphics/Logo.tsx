import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { GlobalConfig, Media } from '@/payload-types'

export default async function Logo() {
  const payload = await getPayload({ config })
  const siteInfo = (await payload.findGlobal({
    slug: 'global-config',
  })) as GlobalConfig

  const logo = siteInfo.Logo as Media

  if (!logo?.url) {
    return null
  }

  return (
    <Image
      src={logo.url}
      alt={logo.alt || 'Logo'}
      className="h-100 w-auto"
      width={logo.width || 100}
      height={logo.height || 100}
    />
  )
}
