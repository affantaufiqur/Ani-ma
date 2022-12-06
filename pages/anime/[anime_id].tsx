import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import LoadingIndicator from '../../components/LoadingIndicator.component'
import { AnimeByFullIdType } from '../../types/anime.types'
import { getAnimeById } from '../../utils/getAnime.utils'

export default function AnimePage({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { anime_id } = params
  const { data, status, error } = useQuery<AnimeByFullIdType, Error>({
    queryKey: ['fetch anime data'],
    queryFn: () => getAnimeById(anime_id as string),
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

  return (
    <main>
      <Head>
        <title>{data.data.titles[0].title} | Anima</title>
        <meta
          name="description"
          content="Anime details"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="min-h-screen bg-black-shaft-900">
        <div className="container mx-auto font-general-sans">
          <section className="flex flex-row gap-5">
            <Image
              src={data?.data?.images.webp.large_image_url as string}
              alt={data?.data?.title}
              width={240}
              height={340}
              priority
              className="h-auto w-auto rounded-md"
            />
            <section className="max-w-3/4 flex flex-col justify-between">
              <section className="flex flex-col gap-5">
                <section>
                  <h1 className="text-2xl font-semibold tracking-wide text-white">{data?.data?.titles[0].title}</h1>
                  <h3 className="text-md font-normal text-black-shaft-400">
                    {data?.data?.titles.map((titleAlt) => {
                      return <p key={titleAlt.type}>{titleAlt.type === 'Japanese' ? titleAlt.title : ''}</p>
                    })}
                  </h3>
                </section>
                <section className="w-3/4">
                  <p className="whitespace-normal break-words text-sm leading-loose tracking-wide text-black-shaft-100">
                    {data.data.synopsis}
                  </p>
                </section>
              </section>
              <section>
                <div className="inline-block rounded-full border-2 border-white p-4">
                  <div className="flex flex-row gap-x-3 [&_p]:font-medium [&_p]:tracking-wide [&_p]:text-black-shaft-100 [&_span]:font-normal [&_span]:text-black-shaft-300">
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
                      {data.data.episodes}
                    </p>
                    <p>
                      <span>Year: </span> {data.data.year}
                    </p>
                    <p>
                      <span>Season: </span> {data.data.season}
                    </p>
                    <p>
                      <span>Genre: </span> {data.data.genres[0].name}
                    </p>
                  </div>
                </div>
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
  return {
    props: {
      params: context.query,
      dehydrateState: dehydrate(queryClient),
    },
  }
}
