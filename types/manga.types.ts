export type MangaArrayDataType = {
  'data': MangaDataType[]
  'pagination': {
    'last_visible_page': number
    'has_next_page': boolean
    'items': {
      'count': number
      'total': number
      'per_page': number
    }
  }
}

export type MangaDataType = {
  'mal_id': number
  'url': string
  'images': {
    'jpg': {
      'image_url': string
      'small_image_url': string
      'large_image_url': string
    }
    'webp': {
      'image_url': string
      'small_image_url': string
      'large_image_url': string
    }
  }
  'approved': boolean
  'titles': [
    {
      'type': string
      'title': string
    },
  ]
  'title': string
  'title_english': string
  'title_japanese': string
  'type': 'Manga'
  'chapters': number | null
  'volumes': number | null
  'status': 'Finished'
  'publishing': boolean
  'published': {
    'from': string | null
    'to': string | null
    'prop': {
      'from': {
        'day': number | null
        'month': number | null
        'year': number | null
      }
      'to': {
        'day': number | null
        'month': number | null
        'year': number | null
      }
      string: string | null
    }
  }
  'score': number | null
  'scored_by': number | null
  'rank': number | null
  'popularity': number | null
  'members': number | null
  'favorites': number | null
  'synopsis': string | null
  'background': string | null
  'authors': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'serializations': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'genres': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'explicit_genres': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'themes': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'demographics': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
}
