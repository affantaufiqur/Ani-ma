import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import type { AnimeCharacterType } from '../../types/anime.types'
import Button from '../UI/button.component'

type CharacterType = {
  AnimeCharactersData: AnimeCharacterType | undefined
}

export default function Characters({ AnimeCharactersData }: CharacterType) {
  const queryClient = useQueryClient()
  function refetchData(): void {
    queryClient.invalidateQueries({ queryKey: ['fetch anime characters'] })
  }

  return (
    <>
      {
        // @ts-ignore
        AnimeCharactersData?.status === '429' ? (
          <Button
            button_type="rounded-md bg-black-shaft-800/40 px-4 py-1 text-white transition-all duration-200 hover:bg-black-shaft-800/60"
            button_text="too many requests, click here to reload"
            handleClick={refetchData}
          />
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
