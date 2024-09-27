import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SelectsProps {
  classTrigger?: string
  place: string
  items: { text: string; value: string }[]
  value: string
  setValue: (e: string) => void
}

export const Selects: React.FC<SelectsProps> = ({
  classTrigger,
  place,
  items,
  value,
  setValue
}) => {
  return (
    <Select value={value} onValueChange={(e) => setValue(e)}>
      <SelectTrigger
        className={cn(
          'rounded-xl border-[1px] bg-white px-2 text-base shadow-sm data-[placeholder]:text-slate-400',
          classTrigger
        )}
      >
        <SelectValue placeholder={place} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(({ text, value }, number) => (
            <SelectItem key={`${number + value}`} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
