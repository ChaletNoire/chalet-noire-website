import { getPayload } from 'payload'
import config from '@/payload.config'
import Post from '@/components/Post'
import Info from '@/components/Info'

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
        <div className="w-full py-8" key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  )
}
