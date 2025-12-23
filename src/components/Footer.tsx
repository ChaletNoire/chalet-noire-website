import Link from 'next/link'

/*
      <Link href="/legal">Legal</Link>
      <Link href="/contact">Contact</Link>
*/

export default function Footer() {
  return (
    <div className="w-full flex flex-row gap-4 pb-4">
      <Link href="/guestbook" prefetch={true}>
        Guestbook
      </Link>
      <Link href="/info" prefetch={true}>
        Site Info
      </Link>
    </div>
  )
}
