import Image from 'next/image'
import Link from 'next/link'
import type { AnimeDataType } from '../../types/anime.types'
import type { MangaDataType } from '../../types/manga.types'

type itemType = {
  item: AnimeDataType | MangaDataType
}

export default function Card({ item }: itemType) {
  function truncateTitle(title: string, limit = 45) {
    if (title.length <= limit) {
      return title
    }
    return `${title.slice(0, limit)}...`
  }

  return (
    <Link
      href={`/${item?.genres[0]?.type}/${encodeURIComponent(item?.mal_id)}`}
      className="group flex shrink-0 basis-48 cursor-pointer flex-col gap-y-3"
      key={item.mal_id}
      prefetch={false}
    >
      <Image
        src={item?.images?.webp?.image_url}
        alt={item?.titles[0]?.title}
        width={192}
        height={256}
        className="h-64 w-auto snap-start transition-all duration-100 hover:brightness-75"
        priority
      />
      <p className="break-words text-sm font-medium leading-tight tracking-wider text-black-shaft-200 transition-all duration-100 group-hover:block group-hover:text-port-gore-700">
        {truncateTitle(item?.titles[0]?.title)}
      </p>
    </Link>
  )
}
