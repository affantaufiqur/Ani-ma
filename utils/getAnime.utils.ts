import { getAnimeSeasonNowUrl, topAiringAnimeTv } from '../constant/animeUrl.constant'
import { AnimeArrayDataType } from '../types/anime.types'

export const getAnimeFromSeason = async (): Promise<AnimeArrayDataType> => {
  const getAnimeFromSeasonReq = await fetch(getAnimeSeasonNowUrl)
  return await getAnimeFromSeasonReq.json()
}

export const getTopAiringAnime = async (): Promise<AnimeArrayDataType> => {
  const getTopAiringAnimeReq = await fetch(topAiringAnimeTv)
  return await getTopAiringAnimeReq.json()
}
