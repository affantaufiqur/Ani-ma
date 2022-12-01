import Image from 'next/image'
import Link from 'next/link'
import type { AnimeDataType, getAnimeSeasonNowTypes } from '../../types/anime.types'

type itemType = {
  item: AnimeDataType
}

export default function Card({ item }: itemType) {
  return (
    <Link
      href={`/anime/${encodeURIComponent(item.mal_id)}`}
      className="flex flex-col gap-y-3 basis-48 shrink-0 group cursor-pointer"
      key={item.mal_id}
    >
      <Image
        src={item.images.webp.image_url}
        alt={item.title}
        width={192}
        height={256}
        className="h-64 w-auto snap-start hover:brightness-75 transition-all duration-100"
        priority
      />
      <p className="text-black-shaft-200 font-medium group-hover:text-port-gore-700 transition-all duration-100 text-sm tracking-wider leading-tight group-hover:block break-words">
        {item.titles[0].title}
      </p>
    </Link>
  )
}
