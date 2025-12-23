import type { Post } from '@/payload-types'
import { RichText } from './media/RichText'

function PostHeader({ post }: { post: Post }) {
  if (!post.title) {
    return null
  }
  return (
    <div className="font-bold uppercase">
      <h2 className="inline">{post.title} </h2>
      <span className="inline">
        {new Date(post.createdAt).toLocaleDateString('en-CA').replace(/-/g, '/')}{' '}
      </span>
    </div>
  )
}

export default function Post({ post }: { post: Post }) {
  return (
    <div className={`w-full flex flex-col gap-4`}>
      <PostHeader post={post} />
      <div className={`w-full`}>
        <RichText data={post.content} />
      </div>
    </div>
  )
}
