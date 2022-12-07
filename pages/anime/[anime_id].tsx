import { useQuery, QueryClient, dehydrate, useIsFetching } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import LoadingIndicator from '../../components/LoadingIndicator.component'
import { AnimeByFullIdType, AnimeCharacterType, VoiceActorType } from '../../types/anime.types'
import { CharacterType } from '../../types/global.types'
import { getAnimeById, getAnimeCharacters } from '../../utils/getAnime.utils'

export default function AnimePage({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isFetching = useIsFetching()
  const { anime_id } = params
  const { data, status, error, isSuccess } = useQuery<AnimeByFullIdType, Error>({
    queryKey: ['fetch anime data'],
    queryFn: () => getAnimeById(anime_id as string),
    cacheTime: 0,
    staleTime: 300000,
  })
  const { data: AnimeCharactersData } = useQuery<AnimeCharacterType, Error>({
    queryKey: ['fetch anime characters'],
    queryFn: () => getAnimeCharacters(anime_id as string),
    cacheTime: 0,
    staleTime: 30000,
    retry: 2,
    enabled: isSuccess,
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

  return (
    <main>
      <Head>
        <title>{data?.data?.titles[0]?.title} | Anima</title>
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
              src={data?.data?.images.webp.large_image_url as string}
              alt={data?.data?.title}
              width={256}
              height={340}
              priority
              className="h-80 w-auto rounded-md"
            />
            <section className="max-w-3/4 flex flex-col gap-5">
              <section className="flex flex-col gap-5">
                <section>
                  <h1 className="text-2xl font-semibold tracking-wide text-white">{data?.data?.titles[0].title}</h1>
                  <h3 className="text-md font-normal text-black-shaft-400">
                    {data?.data?.titles.map((titleAlt, index) => {
                      return <p key={index}>{titleAlt.type === 'Japanese' ? titleAlt.title : ''}</p>
                    })}
                  </h3>
                </section>
                <section className="w-3/4">
                  <p className="whitespace-normal break-words text-sm leading-loose tracking-wide text-black-shaft-100">
                    {data.data.synopsis}
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
              <section
                className={`rounded-md [&_h6]:tracking-wide ${
                  data.data.score
                    ? data.data.score >= 8
                      ? 'bg-[#5F8D4E] text-white [&_h6]:text-black-shaft-50'
                      : 'bg-[#FFE9B1] text-black-shaft-700 [&_h6]:text-black-shaft-600'
                    : ''
                } `}
              >
                <div className="flex flex-col items-center justify-center gap-y-3 p-8">
                  <h6>Score:</h6>
                  <h1 className="text-4xl font-semibold">{data.data.score?.toFixed(1)}</h1>
                  <h6>{data.data.scored_by} voted</h6>
                </div>
              </section>
              <section className="flex flex-row py-4">
                <div className="flex flex-col gap-3 [&_p]:font-medium [&_p]:tracking-wide [&_p]:text-black-shaft-100 [&_span]:font-normal [&_span]:text-black-shaft-300">
                  <p>
                    <span>Type: </span> {data.data.type}
                  </p>
                  <p>
                    <span>Status: </span> {data.data.status}
                  </p>
                  <p>
                    <span>Rating: </span> {data.data.rating}
                  </p>
                  <p>
                    <span>Episodes: </span>
                    {data.data.episodes === null ? '-' : data.data.episodes}
                  </p>
                  <p>
                    <span>Duration: </span>
                    {data.data.duration === null ? '-' : data.data.duration}
                  </p>
                  <p>
                    <span>Year: </span> {data.data.year === null ? '-' : data.data.year}
                  </p>
                  <p>
                    <span>Season: </span> {data.data.season === null ? '-' : data.data.season}
                  </p>
                  <p>
                    <span>Genre: </span> {data.data.genres[0].name}
                  </p>
                  <p>
                    <span>Source: </span> {data.data.source === null ? '-' : data.data.source}
                  </p>
                </div>
              </section>
            </section>
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
                {AnimeCharactersData?.data
                  ?.slice(0, 8)
                  .sort((a, b): number => (a.favorites < b.favorites ? 1 : -1))
                  .map((characters, index) => {
                    const { character, favorites, role, voice_actors } = characters as unknown as CharacterType &
                      VoiceActorType
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
                  })}
              </section>
            </section>
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
