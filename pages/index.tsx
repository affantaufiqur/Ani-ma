import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { AnimeArrayDataType } from '../types/anime.types'
import { getAnimeSeasonNowUrl, topAiringAnimeTv } from '../constant/animeUrl.constant'
import Card from '../components/Card/Card.component'

export default function Home({ anime, topAiringAnime }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              className="text-[0.75rem] tracking-wide text-port-gore-600 font-semibold hover:text-port-gore-500 transition-all duration-200"
            >
              VIEW MORE
            </Link>
          </section>
          <div className="flex gap-5 flex-row overflow-x-scroll font-general-sans snap-x pb-10 sm:pb-1 sm:mx-0 no-scrollbar">
            {anime.data.map((item) => {
              return (
                <Card
                  item={item}
                  key={item.mal_id}
                />
              )
            })}
          </div>
          <section className="flex items-end justify-between py-6 text-white font-general-sans">
            <h1 className="text-lg sm:text-2xl font-semibold text-white font-general-sans tracking-wide">Top airing</h1>
            <Link
              href={`/anime/season/${encodeURIComponent(anime.data[0].season)}`}
              className="text-[0.75rem] tracking-wide text-port-gore-600 font-semibold hover:text-port-gore-500 transition-all duration-200"
            >
              VIEW MORE
            </Link>
          </section>
          <div className="flex gap-5 flex-row overflow-x-scroll font-general-sans snap-x pb-10 sm:pb-1 sm:mx-0 no-scrollbar">
            {topAiringAnime.data.map((item) => {
              return (
                <Card
                  item={item}
                  key={item.mal_id}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  anime: AnimeArrayDataType
  topAiringAnime: AnimeArrayDataType
}> = async () => {
  const req = await fetch(getAnimeSeasonNowUrl)
  const getTopAiringAnimeReq = await fetch(topAiringAnimeTv)

  const getTopAiringAnimeData: AnimeArrayDataType = await getTopAiringAnimeReq.json()
  const getAnimeSeasonNow: AnimeArrayDataType = await req.json()

  console.log(getTopAiringAnimeData)

  return {
    props: {
      anime: getAnimeSeasonNow,
      topAiringAnime: getTopAiringAnimeData,
    },
  }
}
