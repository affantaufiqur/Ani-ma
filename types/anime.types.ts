import { getAnimeByFullId } from '../constant/animeUrl.constant'
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

export type AnimeByFullIdType = {
  'data': {
    'mal_id': 0
    'url': 'string'
    'images': {
      'jpg': {
        'image_url': 'string'
        'small_image_url': 'string'
        'large_image_url': 'string'
      }
      'webp': {
        'image_url': 'string'
        'small_image_url': 'string'
        'large_image_url': 'string'
      }
    }
    'trailer': {
      'youtube_id': 'string'
      'url': 'string'
      'embed_url': 'string'
    }
    'approved': true
    'titles': [
      {
        'type': 'string'
        'title': 'string'
      },
    ]
    'title': 'string'
    'title_english': 'string'
    'title_japanese': 'string'
    'title_synonyms': ['string']
    'type': 'TV'
    'source': 'string'
    'episodes': 0
    'status': 'Finished Airing'
    'airing': true
    'aired': {
      'from': 'string'
      'to': 'string'
      'prop': {
        'from': {
          'day': 0
          'month': 0
          'year': 0
        }
        'to': {
          'day': 0
          'month': 0
          'year': 0
        }
        'string': 'string'
      }
    }
    'duration': 'string'
    'rating': 'G - All Ages'
    'score': 0
    'scored_by': 0
    'rank': 0
    'popularity': 0
    'members': 0
    'favorites': 0
    'synopsis': 'string'
    'background': 'string'
    'season': 'summer'
    'year': 0
    'broadcast': {
      'day': 'string'
      'time': 'string'
      'timezone': 'string'
      'string': 'string'
    }
    'producers': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'licensors': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'studios': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'genres': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'explicit_genres': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'themes': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'demographics': [
      {
        'mal_id': 0
        'type': 'string'
        'name': 'string'
        'url': 'string'
      },
    ]
    'relations': [
      {
        'relation': 'string'
        'entry': [
          {
            'mal_id': 0
            'type': 'string'
            'name': 'string'
            'url': 'string'
          },
        ]
      },
    ]
    'theme': {
      'openings': ['string']
      'endings': ['string']
    }
    'external': [
      {
        'name': 'string'
        'url': 'string'
      },
    ]
    'streaming': [
      {
        'name': 'string'
        'url': 'string'
      },
    ]
  }
}
