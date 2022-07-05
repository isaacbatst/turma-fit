import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react'
import InputWrapper from './InputWrapper'

interface Props {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
  id: string,
  label: string,
  name: string,
  type?: HTMLInputTypeAttribute
}

const Input: React.FC<Props> = ({
  id,
  label,
  setValue,
  value,
  name,
  type = "text"
}) => {
  return (
    <InputWrapper
      id={id}
      label={label} 
    >
      <input type={type} name={name} id={id} 
        className="bg-transparent border-white border-2 p-2 text-sm font-medium rounded
      focus:outline-none focus:bg-white focus:text-stone-800"
        value={value} onChange={(e) => setValue(e.target.value)}
      />
    </InputWrapper>
  )
}

export default Input