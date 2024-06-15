import { IconCalendar } from '@/components/icons/Calendar'
import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

interface FilterPageProps {
  state: {
    stepPage: number
    period: number
    type: string
    start: string
    end: string
  }
  setState: Dispatch<
    SetStateAction<{
      stepPage: number
      period: number
      type: string
      start: string
      end: string
    }>
  >
}

const FilterPage: React.FC<FilterPageProps> = ({ state, setState }) => {
  const periodDays: Array<number> = [7, 15, 30, 60, 90]

  const chooseMovee: Array<{ title: string; value: string }> = [
    { title: 'Entrada', value: 'entrada' },
    { title: 'Saída', value: 'saida' }
  ]

  const isDateValid = (dateString: string) => {
    return !isNaN(new Date(dateString).getTime())
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-shadow-3x text-base font-semibold">
        Selecione um período
      </h4>
      <div className="grid grid-cols-3 gap-4">
        {periodDays.map((item, number) => (
          <Button
            key={number}
            className={cn(
              'rounded-xl border-2 border-colorPrimary-500 bg-transparent p-6 text-base text-colorPrimary-500 shadow-md shadow-slate-400 drop-shadow-md transition-transform duration-300 hover:border-colorPrimary-500 hover:bg-colorPrimary-500 hover:text-white',
              state.period === item &&
                'border-primary/90 bg-primary/90 text-white shadow-none drop-shadow-none transition-transform duration-300'
            )}
            onClick={() =>
              setState((prev) => ({
                ...prev,
                period: item
              }))
            }
          >
            {item} dias
          </Button>
        ))}
      </div>
      <h4 className="text-shadow-3x text-base font-semibold">ou</h4>
      <div className="mb-2 flex justify-around">
        <Popover key="start">
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] items-center justify-between rounded-none border-0 border-b-2 border-colorPrimary-500 bg-transparent fill-colorPrimary-500 py-6 text-base font-normal text-colorPrimary-500'
              )}
            >
              {state.start ? `${state.start}` : <span>De</span>}
              <IconCalendar className="h-8 w-8" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              disabled={(date) =>
                isDateValid(state.end) && date > new Date(state.end)
              }
              selected={state?.start.length >= 1 ? new Date(state.start) : undefined}
              onSelect={(e) =>
                setState((prev) => ({
                  ...prev,
                  start: e?.toLocaleDateString() || ''
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover key="end">
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] items-center justify-between rounded-none border-0 border-b-2 border-colorPrimary-500 bg-transparent fill-colorPrimary-500 py-6 text-base font-normal text-colorPrimary-500'
              )}
            >
              {state.end ? `${state.end}` : <span>Até</span>}
              <IconCalendar className="h-8 w-8" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              disabled={(date) =>
                isDateValid(state.start) && date < new Date(state.start)
              }
              selected={state?.end.length >= 1 ? new Date(state.end) : undefined}
              onSelect={(e) =>
                setState((prev) => ({
                  ...prev,
                  end: e?.toLocaleDateString() || ''
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="mt-2 h-[2px] w-[52%] bg-colorSecondary-500" />
      </div>
      <h4 className="text-shadow-3x text-base font-semibold">
        Selecione um tipo de lançamento
      </h4>
      <div className="flex justify-evenly gap-2">
        {chooseMovee.map(({ title, value }, number) => (
          <Button
            key={`button-${number}`}
            className={cn(
              'flex w-[280px] items-center justify-evenly rounded-xl border-2 border-colorPrimary-500 bg-transparent p-6 text-base text-colorPrimary-500 shadow-md shadow-slate-400 drop-shadow-md transition-transform duration-300 hover:border-colorPrimary-500 hover:bg-colorPrimary-500 hover:text-white ',
              state.type === value &&
                'border-primary/90 bg-primary/90 text-white shadow-none drop-shadow-none transition-transform duration-300'
            )}
            onClick={() =>
              setState((prev) => ({
                ...prev,
                type: value
              }))
            }
          >
            {title}
            <IconDoubleArrow
              size={28}
              className={cn(
                title === 'Entrada'
                  ? 'fill-[#008000]'
                  : 'scale-x-[-1] transform fill-[#FF0000]'
              )}
            />
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          className="w-6/12 rounded-xl py-6 text-base"
          // onClick={() => setStep(0)}
        >
          Prosseguir
        </Button>
      </div>
    </div>
  )
}

export default FilterPage
