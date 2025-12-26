import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Announcement } from '@/components/Announcement'

async function OutsideLinks() {
  const payload = await getPayload({ config })
  const socials = await payload.findGlobal({
    slug: 'socials',
  })
  const links =
    socials?.SocialMediaLinks?.map((link) => ({
      name: link.name,
      url: link.url,
    })) || []
  return (
    <div className="w-full flex flex-row flex-wrap gap-2 pt-2">
      {links.map((link) => (
        <a
          href={link.url || ''}
          key={link.name}
          data-text={link.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}

async function Booking() {
  const payload = await getPayload({ config })
  const contact = await payload.findGlobal({
    slug: 'contact',
  })
  return (
    <div>
      Book us{' '}
      <a
        href={`mailto:${contact?.['Booking Email']}?subject=${contact?.['Booking Mail Subject Line']}`}
      >
        {contact?.['Booking Email']}
      </a>
    </div>
  )
}

export default async function Info() {
  const payload = await getPayload({ config })

  const [globalConfig, broadcast, announcement] = await Promise.all([
    payload.findGlobal({ slug: 'global-config' }),
    payload.findGlobal({ slug: 'broadcast' }),
    payload.findGlobal({ slug: 'announcement' }),
  ])

  const infoText = (globalConfig as any)?.IntroText
  const broadcastData = {
    live: broadcast?.Live ?? false,
    embed: broadcast?.['Live Embed'] ?? '',
    announcementText: announcement?.AnnouncementText ?? null,
  }

  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-justify text-justify-last-left md:max-w-[600px]">{infoText}</p>
      <Announcement initialData={broadcastData} />
      <Booking />
      <OutsideLinks />
    </div>
  )
}


