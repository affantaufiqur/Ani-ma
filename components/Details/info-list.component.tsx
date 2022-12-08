import { AnimeByFullIdType } from '../../types/anime.types'

type InfoListType = {
  data: AnimeByFullIdType
}

export default function InfoList({ data }: InfoListType) {
  const { type, status, rating, episodes, duration, year, season, genres, source } = data.data
  return (
    <>
      <p>
        <span>Type: </span> {type}
      </p>
      <p>
        <span>Status: </span> {status}
      </p>
      <p>
        <span>Rating: </span> {rating}
      </p>
      <p>
        <span>Episodes: </span>
        {episodes === null ? '-' : episodes}
      </p>
      <p>
        <span>Duration: </span>
        {duration === null ? '-' : duration}
      </p>
      <p>
        <span>Year: </span> {year === null ? '-' : year}
      </p>
      <p>
        <span>Season: </span> {season === null ? '-' : season}
      </p>
      <p>
        <span>Genre: </span> {genres[0].name}
      </p>
      <p>
        <span>Source: </span> {source === null ? '-' : source}
      </p>
    </>
  )
}
