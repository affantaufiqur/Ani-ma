export const getAnimeSeasonNowUrl = 'https://api.jikan.moe/v4/seasons/now'
export const topAiringAnimeTv = 'https://api.jikan.moe/v4/top/anime?filter=airing&limit=10'
export const topPublishingManga = 'https://api.jikan.moe/v4/top/manga?filter=publishing&limit=10'
export const getAnimeByFullId = (id: string) => `https://api.jikan.moe/v4/anime/${id}/full`
export const getAnimeCharactersUrl = (id: string) => `https://api.jikan.moe/v4/anime/${id}/characters`
