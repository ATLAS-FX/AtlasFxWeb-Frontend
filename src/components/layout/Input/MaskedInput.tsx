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
}) => (
  <InputMask
    className="h-11 rounded-md border-[1px] border-system-cinza/25 bg-transparent px-4 text-base font-medium"
    mask={mask}
    value={value}
    onChange={onChange}
    {...props}
  />
)

export default MaskedInput
