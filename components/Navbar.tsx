import Link from 'next/link'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

type childrenProps = {
  children: ReactNode
}

type linkType = {
  href: string
  pathname?: string
}

export default function Navbar({ children }: childrenProps) {
  const router = useRouter()
  console.log(router)
  const links: linkType[] = [
    { href: 'anime', pathname: '/anime' },
    { href: 'manga', pathname: '/manga' },
  ]
  return (
    <main>
      <header className="bg-black-shaft-900">
        <section className="mx-auto container text-white py-8 flex flex-row justify-between items-center">
          <Link
            href="/"
            className="font-chillax text-2xl tracking-wide font-semibold text-transparent bg-clip-text bg-gradient-to-r from-port-gore-400 via-port-gore-400 to-port-gore-800 hover:cursor-pointer hover:to-port-gore-900 hover:from-port-gore-500 hover:via-port-gore-600 duration-100 transition-all"
          >
            Ani-ma
          </Link>
          <section className="flex flex-row gap-x-5 font-general-sans tracking-wide">
            {links.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={
                  router.pathname === link.pathname
                    ? 'text-port-gore-400 font-semibold hover:text-white'
                    : 'hover:text-port-gore-300 transition-all duration-150 text-black-shaft-300'
                }
              >
                {link.href}
              </Link>
            ))}
          </section>
        </section>
      </header>
      <main>{children}</main>
    </main>
  )
}
