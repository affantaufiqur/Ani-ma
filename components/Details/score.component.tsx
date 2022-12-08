import { AnimeByFullIdType } from '../../types/anime.types'

type ScoreType = {
  data: AnimeByFullIdType
}
export default function Score({ data }: ScoreType) {
  const { score, scored_by } = data.data
  return (
    <>
      <section
        className={`rounded-md [&_h6]:tracking-wide ${
          score
            ? score >= 8
              ? 'bg-[#5F8D4E] text-white [&_h6]:text-black-shaft-50'
              : 'bg-[#FFE9B1] text-black-shaft-700 [&_h6]:text-black-shaft-600'
            : ''
        } `}
      >
        <div className="flex flex-col items-center justify-center gap-y-3 p-8">
          <h6>Score:</h6>
          <h1 className="text-4xl font-semibold">{score?.toFixed(1)}</h1>
          <h6>{scored_by} voted</h6>
        </div>
      </section>
    </>
  )
}
