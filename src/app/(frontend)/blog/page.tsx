import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Post from '@/components/Post'

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
    <div className="w-full flex flex-row flex-wrap gap-2 justify-end">
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

async function Info() {
  const payload = await getPayload({ config })
  const globalConfig = await payload.findGlobal({
    slug: 'global-config',
  })
  const infoText = (globalConfig as any)?.IntroText
  return (
    <div className="w-full h-full flex flex-col text-base">
      <p className="text-justify text-justify-last-left md:max-w-[600px]">{infoText}</p>
      <Booking />
      <div className="w-full pt-4">
        <OutsideLinks />
      </div>
    </div>
  )
}

async function getPosts() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    depth: 2, // Populate relationships including images in rich text
  })
  return posts
}

export default async function Blog() {
  const posts = await getPosts()
  return (
    <div>
      <Info />
      <hr className="mt-2" />
      {posts.docs.map((post) => (
        <>
          <div className="w-full py-8" key={post.id}>
            <Post key={post.id} post={post} />
          </div>
        </>
      ))}
    </div>
  )
}
