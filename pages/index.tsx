import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { getAnimeSeasonNowTypes } from '../types/anime.types'

export default function Home({ anime }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Ani-ma | Homepage</title>
        <meta
          name="description"
          content="Ani-ma homepage"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="bg-black-shaft-900">
        <div className="sm:mx-auto mx-4 sm:container">
          <section className="flex items-end justify-between py-6 text-white font-general-sans">
            <h1 className="text-lg sm:text-2xl font-semibold text-white font-general-sans tracking-wide">
              Fall 2022 Anime
            </h1>
            <Link
              href={`/anime/season/${encodeURIComponent(anime.data[0].season)}`}
              className="text-sm text-port-gore-600 font-semibold hover:text-port-gore-500 transition-all duration-200"
            >
              View more
            </Link>
          </section>
          <div className="flex gap-5 flex-row overflow-x-scroll font-general-sans snap-x pb-10 sm:pb-1 sm:mx-0 no-scrollbar">
            {anime.data.map((item) => {
              return (
                <Link
                  href={`/anime/${encodeURIComponent(item.mal_id)}`}
                  className="flex flex-col gap-y-3 basis-48 shrink-0 group cursor-pointer"
                  key={item.mal_id}
                >
                  <Image
                    src={item.images.webp.image_url}
                    alt={item.title}
                    width={192}
                    height={256}
                    className="h-64 w-auto snap-start hover:brightness-75 transition-all duration-100"
                    priority
                  />
                  <p className="text-black-shaft-200 font-medium group-hover:text-port-gore-700 transition-all duration-100 text-sm tracking-wider leading-tight group-hover:block break-words">
                    {item.title}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ anime: getAnimeSeasonNowTypes }> = async () => {
  const req = await fetch('https://api.jikan.moe/v4/seasons/now')
  const getAnimeSeasonNow: getAnimeSeasonNowTypes = await req.json()
  return {
    props: {
      anime: getAnimeSeasonNow,
    },
  }
}
