type ButtonType = {
  classNames?: string
  button_text: string
  button_type: BUTTON_REFETCH
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void
}

type BUTTON_REFETCH =
  'rounded-md bg-black-shaft-800/40 px-4 py-1 text-white transition-all duration-200 hover:bg-black-shaft-800/60'

export default function Button({ button_text, button_type, handleClick }: ButtonType) {
  return (
    <>
      <button
        className={button_type}
        onClick={handleClick}
      >
        {button_text}
      </button>
    </>
  )
}
