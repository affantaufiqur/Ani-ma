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
  'favorites': number | null
}
