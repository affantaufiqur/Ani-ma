import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { AnimeArrayDataType } from '../types/anime.types'
import { getAnimeSeasonNowUrl, topAiringAnimeTv } from '../constant/animeUrl.constant'
import Card from '../components/Card/Card.component'
import CardHomeListHeaderText from '../components/Card/Card-home-list-header.component'

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
          <CardHomeListHeaderText
            title="Fall 2022 Anime"
            href={`/anime/season/${encodeURIComponent(anime.data[0].season)}`}
          />
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
          <CardHomeListHeaderText
            title="Top airing"
            href="/anime/top-airing"
          />
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

  return {
    props: {
      anime: getAnimeSeasonNow,
      topAiringAnime: getTopAiringAnimeData,
    },
  }
}
