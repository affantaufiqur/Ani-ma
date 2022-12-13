import { useQuery, QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import Characters from '../../components/Details/characters.component'
import InfoList from '../../components/Details/info-list.component'
import Score from '../../components/Details/score.component'
import Synopsis from '../../components/Details/synopsis.component'
import Title from '../../components/Details/title.component'
import LoadingIndicator from '../../components/LoadingIndicator.component'
import { AnimeByFullIdType, AnimeCharacterType } from '../../types/anime.types'
import { getAnimeById, getAnimeCharacters } from '../../utils/getAnime.utils'

export default function AnimePage({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient()
  const { anime_id } = params

  const { data, status, error } = useQuery<AnimeByFullIdType, Error>({
    queryKey: ['fetch anime data'],
    queryFn: () => getAnimeById(anime_id as string),
    cacheTime: 3000,
    staleTime: 3000,
  })
  const { data: AnimeCharactersData, isFetching } = useQuery<AnimeCharacterType, Error>({
    queryKey: ['fetch anime characters'],
    queryFn: () => getAnimeCharacters(anime_id as string),
    cacheTime: 3000,
    staleTime: 3000,
  })

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-black-shaft-900">
        <LoadingIndicator />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex h-screen items-center justify-center bg-black-shaft-900">
        <p className="text-white">Error: {error.message}</p>
      </div>
    )
  }

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-black-shaft-900">
        <LoadingIndicator />
      </div>
    )
  }

  // @ts-ignore
  if (data.status === '429') {
    queryClient.invalidateQueries({ queryKey: ['fetch anime data'] })
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 text-white">
        <p>Too many request</p>
        <p>Due to limited API calls, please wait before reload the page</p>
      </div>
    )
  }

  const animeData = data.data
  function refetchData(): void {
    queryClient.invalidateQueries({ queryKey: ['fetch anime characters'] })
  }

  return (
    <main>
      <Head>
        <title>{animeData?.titles[0]?.title} | Anima</title>
        <meta
          name="description"
          content="Anime details"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="h-auto bg-black-shaft-900">
        <div className="container mx-auto font-general-sans">
          <section className="flex flex-row gap-5">
            <Image
              src={animeData?.images?.webp?.large_image_url as string}
              alt={animeData?.title}
              width={256}
              height={340}
              priority
              className="h-80 w-auto rounded-md"
            />
            <section className="max-w-3/4 flex flex-col gap-5">
              <section className="flex flex-col gap-5">
                <Title animeData={animeData} />
                <section className="w-3/4">
                  <Synopsis animeData={animeData} />
                </section>
              </section>
            </section>
          </section>
          <section className="mt-4 flex flex-row gap-5">
            <section
              className="sticky flex basis-56 flex-col pb-12"
              id="anime-info-sidebar"
            >
              <Score data={data} />
              <section className="flex flex-row py-4">
                <div className="flex flex-col gap-3 [&_p]:font-medium [&_p]:tracking-wide [&_p]:text-black-shaft-100 [&_span]:font-normal [&_span]:text-black-shaft-300">
                  <InfoList data={data} />
                </div>
              </section>
              <button className="rounded-md bg-port-gore-400 p-4 font-medium text-black-shaft-900 transition-all duration-200 hover:bg-port-gore-300">
                <Link
                  href={animeData.url}
                  target="_blank"
                >
                  view in MAL
                </Link>
              </button>
            </section>
            {isFetching ? (
              <LoadingIndicator />
            ) : (
              <section
                id="anime-info-content"
                className=""
              >
                <section
                  id="anime-characters"
                  className="mb-4"
                >
                  <h1 className="text-xl tracking-wide text-black-shaft-200">Characters</h1>
                </section>
                <section className="grid grid-cols-4 gap-8">
                  <Characters
                    AnimeCharactersData={AnimeCharactersData}
                    refetchData={refetchData}
                  />
                </section>
              </section>
            )}
          </section>
        </div>
      </main>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<{ params: ParsedUrlQuery }> = async (
  context: GetServerSidePropsContext,
) => {
  const { anime_id } = context.query
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ['fetch anime data'], queryFn: () => getAnimeById(anime_id as string) })
  await queryClient.prefetchQuery({
    queryKey: ['fetch anime characters'],
    queryFn: () => getAnimeCharacters(anime_id as string),
  })

  return {
    props: {
      params: context.query,
      dehydrateState: dehydrate(queryClient),
    },
  }
}
