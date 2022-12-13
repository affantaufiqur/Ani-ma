import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import type { RelatedType } from '../../types/global.types'
import LoadingIndicator from '../LoadingIndicator.component'
import Button from '../UI/button.component'

type RelationType = {
  fetching: boolean
  relatedAnimeData: RelatedType | undefined
}
export default function Relation({ fetching, relatedAnimeData }: RelationType) {
  const queryClient = useQueryClient()
  function handleRefetch(): void {
    queryClient.invalidateQueries({ queryKey: ['fetch anime relations'] })
  }
  return (
    <>
      <section className="mt-4">
        <h1 className="text-xl tracking-wide text-black-shaft-200">Related</h1>
        {
          // @ts-ignore
          relatedAnimeData?.status === '429' ? (
            <section className="mt-8">
              <Button
                button_type="rounded-md bg-black-shaft-800/40 px-4 py-1 text-white transition-all duration-200 hover:bg-black-shaft-800/60"
                button_text="too many requests, click here to reload"
                handleClick={handleRefetch}
              />
            </section>
          ) : fetching ? (
            <LoadingIndicator />
          ) : (
            <section className="mt-4 flex flex-col">
              {relatedAnimeData?.data?.map((relation) => {
                return (
                  <section
                    className="flex flex-row gap-2"
                    key={relation.relation}
                  >
                    <p className="text-black-shaft-100">{relation.relation}: </p>
                    {relation.entry.map((item) => {
                      return (
                        <>
                          <Link
                            href={item.url}
                            className="text-blue-300 underline transition-all duration-200 hover:text-blue-400"
                            target="_blank"
                            key={item.mal_id}
                          >
                            {item.name}
                          </Link>
                        </>
                      )
                    })}
                  </section>
                )
              })}
              <section className="text-white"></section>
            </section>
          )
        }
      </section>
    </>
  )
}
