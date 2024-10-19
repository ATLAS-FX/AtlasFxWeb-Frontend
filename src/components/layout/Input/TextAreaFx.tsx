import { cn } from '@/lib/utils'
import { ChangeEvent } from 'react'

interface TextAreaFXProps {
  name: string
  rows?: number
  label: string
  bgLabel?: string
  value: string
  placeholder?: string
  maxLength?: number
  change: (e: string) => void
}

const TextAreaFX: React.FC<TextAreaFXProps> = ({
  name,
  label,
  value,
  bgLabel = 'bg-system-neutro',
  rows = 3,
  maxLength,
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
      <textarea
        id={name}
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => change(e.target.value)}
        className="w-full rounded-md border-2 border-system-cinza/25 bg-transparent px-4 py-6 text-lg hover:border-system-cinza/25 focus:ring-2 focus:ring-system-cinza/50 focus-visible:border-none focus-visible:outline-none"
      />
    </div>
  )
}

export default TextAreaFX
