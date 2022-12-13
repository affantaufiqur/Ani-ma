import type { AnimeByFullIdType } from '../../types/anime.types'

type AnimeData = {
  animeData: AnimeByFullIdType['data']
}
export default function Title({ animeData }: AnimeData) {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-wide text-white">{animeData?.titles[0].title}</h1>
      <h3 className="text-md font-normal text-black-shaft-400">
        {animeData?.titles.map((titleAlt, index) => {
          return <p key={index}>{titleAlt.type === 'Japanese' ? titleAlt.title : ''}</p>
        })}
      </h3>
    </section>
  )
}
