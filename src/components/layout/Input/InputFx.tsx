import { cn } from '@/lib/utils'
import { ChangeEvent } from 'react'

interface InputFXProps {
  name: string
  type?: string
  label: string
  bgLabel?: string
  value: string
  placeholder?: string
  change: (e: string) => void
}

const InputFX: React.FC<InputFXProps> = ({
  name,
  label,
  value,
  bgLabel = 'bg-system-neutro',
  type = 'text',
  placeholder,
  change
}) => {
  return (
    <div className="relative flex">
      <label
        htmlFor={name}
        className={cn(
          'absolute -top-3 left-4 px-4 py-1 text-sm font-medium text-system-cinza/75',
          bgLabel
        )}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDown={(e: any) => {
          e.key === '13' && change(e.target.value)
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => change(e.target.value)}
        className="h-14 w-full rounded-md border-2 border-system-cinza/25 bg-transparent px-4 py-6 text-base focus:ring-2 focus:ring-system-cinza/50 focus-visible:border-none focus-visible:outline-none"
      />
    </div>
  )
}

export default InputFX
