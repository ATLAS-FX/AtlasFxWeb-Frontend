import React from 'react'
import InputMask from 'react-input-mask'

interface MaskedInputProps extends React.ComponentPropsWithoutRef<'input'> {
  mask: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  ...props
}) => <InputMask mask={mask} value={value} onChange={onChange} {...props} />

export default MaskedInput
