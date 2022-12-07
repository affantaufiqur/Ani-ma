import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Card from '../components/Card/Card.component'
import CardHomeListHeaderText from '../components/Card/Card-home-list-header.component'
import { QueryClient, dehydrate, useQuery, useIsFetching } from '@tanstack/react-query'
import { getTopAiringAnime, getAnimeFromSeason } from '../utils/getAnime.utils'
import { getTopPusblishingManga } from '../utils/getManga.utils'
import LoadingIndicator from '../components/LoadingIndicator.component'

export default function Home() {
  const isFetching = useIsFetching()
  const { data: SeasonalAnimeData } = useQuery({
    queryKey: ['fetch anime season'],
    queryFn: getAnimeFromSeason,
    staleTime: 300000, // 5 minutes
  })

  const { data: TopAiringAnimeData } = useQuery({
    queryKey: ['fetch top airing anime'],
    queryFn: getTopAiringAnime,
    staleTime: 300000, // 5 minutes
  })
  const { data: TopPublishMangaData } = useQuery({
    queryKey: ['fetch top publishing manga'],
    queryFn: getTopPusblishingManga,
    staleTime: 300000, // 5 minutes
  })

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
      <main className="min-h-screen bg-black-shaft-900">
        <div className="mx-4 sm:container sm:mx-auto">
          <CardHomeListHeaderText
            title="Fall 2022 Anime"
            href={`/anime/season/${encodeURIComponent(`${SeasonalAnimeData?.data[0]?.season}`)}`}
          />
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <div className="no-scrollbar flex snap-x flex-row gap-5 overflow-x-scroll pb-10 font-general-sans sm:mx-0 sm:pb-1">
              {SeasonalAnimeData?.data?.map((item) => {
                return (
                  <Card
                    item={item}
                    key={item.mal_id}
                  />
                )
              })}
            </div>
          )}
          <CardHomeListHeaderText
            title="Top airing"
            href="/anime/top-airing"
          />
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <div className="no-scrollbar flex snap-x flex-row gap-5 overflow-x-scroll pb-10 font-general-sans sm:mx-0 sm:pb-1">
              {TopAiringAnimeData?.data?.map((item) => {
                return (
                  <Card
                    item={item}
                    key={item.mal_id}
                  />
                )
              })}
            </div>
          )}
          <CardHomeListHeaderText
            title="Top manga"
            href="/manga/top-manga"
          />
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <div className="no-scrollbar flex snap-x flex-row gap-5 overflow-x-scroll pb-10 font-general-sans sm:mx-0 sm:pb-1">
              {TopPublishMangaData?.data?.map((item) => {
                return (
                  <Card
                    item={item}
                    key={item.mal_id}
                  />
                )
              })}
            </div>
          )}
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
