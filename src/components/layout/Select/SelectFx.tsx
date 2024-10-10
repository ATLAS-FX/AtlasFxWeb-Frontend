import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SelectFxProps {
  label: string
  name: string
  bgLabel?: string
  classTrigger?: string
  place: string
  items: { text: string; value: string }[]
  value: string
  setValue: (e: string) => void
}

const SelectFx: React.FC<SelectFxProps> = ({
  classTrigger,
  place,
  items,
  value,
  label,
  bgLabel = 'bg-system-neutro',
  name,
  setValue
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
      <Select value={value} onValueChange={(e) => setValue(e)}>
        <SelectTrigger
          className={cn(
            'w-full rounded-md border-2 border-system-cinza/25 px-4 py-6 text-base',
            classTrigger
          )}
        >
          <SelectValue placeholder={place} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(({ text, value }, number) => (
              <SelectItem
                key={`${number + value}`}
                value={value}
                // className="w-full rounded-md border-2 border-system-cinza/25 px-4 py-6 text-base"
              >
                {text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectFx
