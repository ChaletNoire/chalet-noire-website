import Image from 'next/image'

export default function Icon() {
  return (
    <div>
      <Image src="/favicon-32x32.png" alt="Icon" width={32} height={32} />
    </div>
  )
}
