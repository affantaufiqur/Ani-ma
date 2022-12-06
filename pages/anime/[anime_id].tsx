import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import LoadingIndicator from '../../components/LoadingIndicator.component'
import { getAnimeById } from '../../utils/getAnime.utils'

export default function AnimePage({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { anime_id } = params
  const { data, status, error } = useQuery({
    queryKey: ['fetch anime data'],
    queryFn: () => getAnimeById(anime_id as string),
    staleTime: 300000, // 5 minutes
  })

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-black-shaft-900">
        <LoadingIndicator />
      </div>
    )
  }

  if (status === 'error') {
    // @ts-ignore
    return <p>error: {error.message}</p>
  }

  return (
    <main className="min-h-screen bg-black-shaft-900">
      <div className="container mx-auto font-general-sans">
        <section className="flex flex-row gap-5">
          <Image
            src={data?.data?.images.webp.large_image_url}
            alt={data?.data?.title}
            width={240}
            height={340}
            priority
            className="h-auto w-auto"
          />
          <section className="flex flex-col gap-4">
            <p className="text-2xl font-semibold text-white">{data?.data?.titles[0].title}</p>
            <p className="text-md flex flex-col gap-2 font-normal text-black-shaft-400">
              {data?.data?.titles.map((titleAlt) => {
                return (
                  <p key={titleAlt.type}>
                    {titleAlt.type}: {titleAlt.title}
                  </p>
                )
              })}
            </p>
          </section>
        </section>
      </div>
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
