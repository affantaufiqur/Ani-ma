export type CharacterType = {
  'character': {
    'mal_id': number
    'url': string
    'images': {
      'jpg': {
        'image_url': string
        'small_image_url': string
      }
      'webp': {
        'image_url': string
        'small_image_url': string
      }
    }
    'name': string
  }
  'role': string
  'favorites': number
}

export type ErrorFetchingType = {
  status?: string
  type?: string
  message?: string
  error?: null | string | undefined
}
