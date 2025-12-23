import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Plugin } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Gallery } from './collections/Gallery'
import { Shows } from './collections/Shows'

import { GlobalConfig } from './globals/GlobalConfig'
import { LandingPage } from './globals/LandingPage'
import { Broadcast } from './globals/Broadcast'
import { Socials } from './globals/Socials'
import { Contact } from './globals/Contact'
import { Announcement } from './globals/Announcement'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

// Only use R2 in production - in development, the R2 adapter doesn't set
// Content-Type headers properly due to a Miniflare bug, causing SVGs to fail.
// See: https://github.com/payloadcms/payload/issues/7624
// See: https://github.com/cloudflare/workers-sdk/issues/6047
const plugins: Plugin[] = isProduction
  ? [
      r2Storage({
        bucket: cloudflare.env.R2,
        collections: { media: true },
      }),
    ]
  : []

export default buildConfig({
  admin: {
    components: {
      providers: [
        {
          path: './app/styles/ForceThemeProvider',
          exportName: 'ForceThemeProvider',
        },
      ],
      graphics: {
        Logo: '/components/graphics/Logo',
        Icon: '/components/graphics/Icon',
      },
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'Chalet Noire - Admin Panel',

      description: 'Chalet Noire - Admin Panel',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
        {
          rel: 'shortcut icon',
          url: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          url: '/apple-touch-icon.png',
        },
        {
          rel: 'manifest',
          url: '/site.webmanifest',
        },
      ],
    },
  },
  collections: [Users, Media, Posts, Gallery, Shows],
  globals: [GlobalConfig, LandingPage, Broadcast, Socials, Contact, Announcement],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins,
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
