import React, { ReactNode } from 'react'

type WrapperProps = { children?: ReactNode }

export default function FormWrapper({ children }: WrapperProps) {
  return <div className="flex flex-col gap-y-2">{children}</div>
}
