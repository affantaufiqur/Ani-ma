import { topPublishingManga } from '../constant/animeUrl.constant'
import { MangaArrayDataType } from '../types/manga.types'

export const getTopPusblishingManga = async (): Promise<MangaArrayDataType> => {
  const getTopPublisingMangaReq = await fetch(topPublishingManga)
  return await getTopPublisingMangaReq.json()
}
