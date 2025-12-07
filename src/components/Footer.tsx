import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full flex flex-row gap-4 pb-4">
      <Link href="/legal">Legal</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/info">Site Info</Link>
    </div>
  )
}
