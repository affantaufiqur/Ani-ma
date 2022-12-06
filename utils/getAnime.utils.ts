import { getAnimeByFullId, getAnimeSeasonNowUrl, topAiringAnimeTv } from '../constant/animeUrl.constant'
import { AnimeArrayDataType, AnimeByFullIdType } from '../types/anime.types'

export const getAnimeFromSeason = async (): Promise<AnimeArrayDataType> => {
  const getAnimeFromSeasonReq = await fetch(getAnimeSeasonNowUrl)
  return await getAnimeFromSeasonReq.json()
}

export const getTopAiringAnime = async (): Promise<AnimeArrayDataType> => {
  const getTopAiringAnimeReq = await fetch(topAiringAnimeTv)
  return await getTopAiringAnimeReq.json()
}

export const getAnimeById = async (id: string): Promise<AnimeByFullIdType> => {
  const getAnimeInfoReq = await fetch(getAnimeByFullId(id))
  return await getAnimeInfoReq.json()
}
