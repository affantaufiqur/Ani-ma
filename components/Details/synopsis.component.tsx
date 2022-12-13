import type { AnimeByFullIdType } from '../../types/anime.types'

type AnimeData = {
  animeData: AnimeByFullIdType['data']
}
export default function Synopsis({ animeData }: AnimeData) {
  return (
    <>
      <p className="whitespace-normal break-words text-sm leading-loose tracking-wide text-black-shaft-100">
        {animeData?.synopsis}
      </p>
    </>
  )
}
