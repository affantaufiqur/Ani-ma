import { useQuery, QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import InfoList from '../../components/Details/info-list.component'
import Score from '../../components/Details/score.component'
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
    return <div className="flex h-screen items-center justify-center text-white">Too many requests</div>
  }

  function refetchData() {
    queryClient.invalidateQueries({ queryKey: ['fetch anime characters'] })
  }

  const animeData = data.data
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
                <section>
                  <h1 className="text-2xl font-semibold tracking-wide text-white">{animeData?.titles[0].title}</h1>
                  <h3 className="text-md font-normal text-black-shaft-400">
                    {animeData?.titles.map((titleAlt, index) => {
                      return <p key={index}>{titleAlt.type === 'Japanese' ? titleAlt.title : ''}</p>
                    })}
                  </h3>
                </section>
                <section className="w-3/4">
                  <p className="whitespace-normal break-words text-sm leading-loose tracking-wide text-black-shaft-100">
                    {animeData?.synopsis}
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section className="mt-4 flex flex-row gap-5">
            <section
              className="flex basis-56 flex-col"
              id="anime-info-sidebar"
            >
              <Score data={data} />
              <section className="flex flex-row py-4">
                <div className="flex flex-col gap-3 [&_p]:font-medium [&_p]:tracking-wide [&_p]:text-black-shaft-100 [&_span]:font-normal [&_span]:text-black-shaft-300">
                  <InfoList data={data} />
                </div>
              </section>
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
                  {
                    // @ts-ignore
                    AnimeCharactersData?.status === '429' ? (
                      <button
                        className="text-white"
                        onClick={refetchData}
                      >
                        too many request, reload here
                      </button>
                    ) : (
                      AnimeCharactersData?.data
                        ?.slice(0, 8)
                        .sort((a, b): number => (a.favorites < b.favorites ? 1 : -1))
                        .map((characters, index) => {
                          const { character, favorites, role, voice_actors } = characters
                          return (
                            <div
                              key={index}
                              className="flex flex-row gap-4"
                            >
                              <Image
                                src={character.images.webp.image_url}
                                width={80}
                                height={80}
                                alt={character.name}
                                className="h-auto w-auto rounded-sm "
                              />
                              <div
                                id="character-info"
                                className="flex flex-col justify-between gap-1 tracking-wide [&_p]:text-sm [&_p]:text-black-shaft-300"
                              >
                                <section>
                                  <h1 className=" text-white">{character.name}</h1>
                                  <p className=" text-black-shaft-300">{role}</p>
                                  <p className="text-black-shaft-300">{favorites.toLocaleString()} Vote</p>
                                </section>
                                <p className=" transition-all duration-150 hover:text-black-shaft-200">
                                  <Link
                                    href={`${voice_actors[0]?.person.url}`}
                                    target="_blank"
                                  >
                                    {voice_actors[0]?.person.name}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          )
                        })
                    )
                  }
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
