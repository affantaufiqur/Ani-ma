export type AnimeArrayDataType = {
  'data': AnimeDataType[]
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

export type AnimeDataType = {
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
  'trailer': {
    'youtube_id': string | null
    'url': string | null
    'embed_url': string | null
  }
  'approved': true
  'titles': [
    {
      'type': string
      'title': string
    },
  ]
  'title': string
  'title_english': string
  'title_japanese': string
  'title_synonyms': [string]
  'type': string | null
  'source': string | null
  'episodes': number | null
  'status': string | null
  'airing': boolean
  'aired': {
    'from': string | null
    'to': string
    'prop': {
      'from': {
        'day': number
        'month': number
        'year': number
      }
      'to': {
        'day': number | null
        'month': number | null
        'year': number | null
      }
      string: string
    }
  }
  'duration': string | null
  'rating': string | null
  'score': number | null
  'scored_by': number | null
  'rank': number | null
  'popularity': number | null
  'members': number | null
  'favorites': number | null
  'synopsis': string | null
  'background': string | null
  'season': string | null
  'year': number | null
  'broadcast': {
    'day': string | null
    'time': string | null
    'timezone': string | null
    'string': string | null
  }
  'producers': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'licensors': [
    {
      'mal_id': number
      'type': string
      'name': string
      'url': string
    },
  ]
  'studios': [
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
