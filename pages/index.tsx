import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Card from '../components/Card/Card.component'
import CardHomeListHeaderText from '../components/Card/Card-home-list-header.component'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { getTopAiringAnime, getAnimeFromSeason } from '../utils/getAnime.utils'

export default function Home() {
  const { data: SeasonalAnimeData } = useQuery({
    queryKey: ['fetch anime season'],
    queryFn: getAnimeFromSeason,
  })

  const { data: TopAiringAnimeData } = useQuery({ queryKey: ['fetch top airing anime'], queryFn: getTopAiringAnime })
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
            href={`/anime/season/${encodeURIComponent(`${SeasonalAnimeData?.data[0].season}`)}`}
          />
          <div className="flex gap-5 flex-row overflow-x-scroll font-general-sans snap-x pb-10 sm:pb-1 sm:mx-0 no-scrollbar">
            {SeasonalAnimeData?.data.map((item) => {
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
            {TopAiringAnimeData?.data.map((item) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['fetch anime season'], getAnimeFromSeason)
  await queryClient.prefetchQuery(['fetch top airing anime'], getTopAiringAnime)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
