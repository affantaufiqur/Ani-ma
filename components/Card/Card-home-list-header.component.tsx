import Link from 'next/link'

type CardHeaderPropsType = {
  title: string
  href: string
}

export default function CardHomeListHeaderText({ title, href }: CardHeaderPropsType) {
  return (
    <section className="flex items-end justify-between py-6 text-white font-general-sans">
      <h1 className="text-lg sm:text-2xl font-semibold text-white font-general-sans tracking-wide">{title}</h1>
      <Link
        href={href}
        className="text-[0.75rem] tracking-wide text-port-gore-600 font-semibold hover:text-port-gore-500 transition-all duration-200"
      >
        VIEW MORE
      </Link>
    </section>
  )
}
