type FormInputType = {
  labelFor: string
  labelClassName?: string
  labelTitle: string
  inputType: string
  inputName: string
  inputPlaceholder?: string
  inputClassName?: string
}

export default function FormInput({
  labelFor,
  labelClassName,
  labelTitle,
  inputType,
  inputName,
  inputPlaceholder,
  inputClassName,
}: FormInputType) {
  return (
    <>
      <label
        htmlFor={labelFor}
        className={labelClassName}
      >
        {labelTitle}
      </label>
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        className={inputClassName}
      />
    </>
  )
}
