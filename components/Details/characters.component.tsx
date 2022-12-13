import Image from 'next/image'
import Link from 'next/link'
import type { AnimeCharacterType } from '../../types/anime.types'
type CharacterType = {
  AnimeCharactersData: AnimeCharacterType | undefined
  refetchData?: () => void
}
export default function Characters({ AnimeCharactersData, refetchData }: CharacterType) {
  return (
    <>
      {
        // @ts-ignore
        AnimeCharactersData?.status === '429' ? (
          <button
            className="text-white"
            onClick={refetchData}
          >
            too many request, reload here
          </button>
        ) : (
          AnimeCharactersData?.data
            ?.slice(0, 8)
            .sort((a, b): number => (a.favorites < b.favorites ? 1 : -1))
            .map((characters, index) => {
              const { character, favorites, role, voice_actors } = characters
              return (
                <div
                  key={index}
                  className="flex flex-row gap-4"
                >
                  <Image
                    src={character.images.webp.image_url}
                    width={80}
                    height={80}
                    alt={character.name}
                    className="h-auto w-auto rounded-sm "
                  />
                  <div
                    id="character-info"
                    className="flex flex-col justify-between gap-1 tracking-wide [&_p]:text-sm [&_p]:text-black-shaft-300"
                  >
                    <section>
                      <h1 className=" text-white">{character.name}</h1>
                      <p className=" text-black-shaft-300">{role}</p>
                      <p className="text-black-shaft-300">{favorites.toLocaleString()} Vote</p>
                    </section>
                    <p className=" transition-all duration-150 hover:text-black-shaft-200">
                      <Link
                        href={`${voice_actors[0]?.person.url}`}
                        target="_blank"
                      >
                        {voice_actors[0]?.person.name}
                      </Link>
                    </p>
                  </div>
                </div>
              )
            })
        )
      }
    </>
  )
}
