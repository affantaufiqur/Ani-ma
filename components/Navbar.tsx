import Link from 'next/link'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

type childrenProps = {
  children: ReactNode
}

type linkType = {
  href: string
  pathname?: string
  showName: string
}

export default function Navbar({ children }: childrenProps) {
  const router = useRouter()
  const links: linkType[] = [
    { href: '/anime', pathname: '/anime', showName: 'anime' },
    { href: '/manga', pathname: '/manga', showName: 'manga' },
  ]

  return (
    <main>
      <header className="bg-black-shaft-900">
        <section className="container mx-auto flex flex-row items-center justify-between py-8 text-white">
          <Link
            href="/"
            className="bg-gradient-to-r from-port-gore-400 via-port-gore-400 to-port-gore-800 bg-clip-text font-chillax text-2xl font-semibold tracking-wide text-transparent transition-all duration-100 hover:cursor-pointer hover:from-port-gore-500 hover:via-port-gore-600 hover:to-port-gore-900"
          >
            Ani-ma
          </Link>
          <section className="flex flex-row gap-x-5 font-general-sans tracking-wide">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.pathname}
                className={
                  router.pathname === link.pathname
                    ? 'font-semibold text-port-gore-400'
                    : 'text-black-shaft-300 transition-all duration-150 hover:text-port-gore-300'
                }
              >
                {link.showName}
              </Link>
            ))}
          </section>
        </section>
      </header>
      <main>{children}</main>
    </main>
  )
}
