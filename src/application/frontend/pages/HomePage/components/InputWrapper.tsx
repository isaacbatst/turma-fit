import React from 'react'

interface Props {
  id: string,
  label: string
}

const InputWrapper: React.FC<Props> = ({
  children,
  id,
  label
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 text-sm">
        {label}
      </label>
      {children}
    </div>  )
}

export default InputWrapper