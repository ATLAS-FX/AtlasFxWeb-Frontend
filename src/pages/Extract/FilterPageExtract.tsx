import { IconCalendar, IconDoubleArrow } from '@/components/icons'
import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useExtractInfo } from '@/services/ExtractApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface FilterPageExtractProps {
  state: {
    stepPage: number
    period: number
    type: string
    start: string
    end: string
    controlIn: number
    controlOut: number
  }
  setState: Dispatch<
    SetStateAction<{
      stepPage: number
      period: number
      type: string
      start: string
      end: string
      controlIn: number
      controlOut: number
      firstDate: string
      lastDate: string
    }>
  >
}

const FilterPageExtract: React.FC<FilterPageExtractProps> = ({
  state,
  setState
}) => {
  const { mutate: getExtractInfo, isLoading, isError } = useExtractInfo()

  const periodDays: Array<number> = [7, 15, 30, 60, 90]

  const chooseMovee: Array<{ title: string; value: string }> = [
    { title: 'Entrada', value: 'in' },
    { title: 'Saída', value: 'out' }
  ]

  const handleDateRangeChange = (days: number) => {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() - days)
    setState((prev) => ({
      ...prev,
      period: days,
      start: startDate.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      }),
      end: endDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    }))
  }

  const handleFilterPage = async () => {
    getExtractInfo(
      {
        start: state?.start || '',
        end: state?.end || '',
        type: state?.type || ''
      },
      {
        onSuccess: () => {
          setState((prev) => ({
            ...prev,
            stepPage: 0
          }))
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  const isDateValid = (dateString: string) => {
    return !isNaN(new Date(dateString).getTime())
  }

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-base font-semibold text-shadow-3x">
        Selecione um período
      </h4>
      <div className="grid grid-cols-3 gap-4">
        {periodDays.map((item, number) => (
          <Button
            key={number}
            className={cn(
              'rounded-xl border-2 border-primary-default bg-transparent p-6 text-base text-primary-default shadow-md shadow-slate-400 drop-shadow-md transition-transform duration-300 hover:border-primary-default hover:bg-primary-default hover:text-white',
              state.period === item &&
                'border-primary/90 bg-primary/90 text-white shadow-none drop-shadow-none transition-transform duration-300'
            )}
            onClick={() => handleDateRangeChange(item)}
          >
            {item} dias
          </Button>
        ))}
      </div>
      <h4 className="text-base font-semibold text-shadow-3x">ou</h4>
      <div className="mb-2 flex justify-around">
        <Popover key="start">
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] items-center justify-between rounded-none border-0 border-b-2 border-primary-default bg-transparent fill-primary-default py-6 text-base font-normal text-primary-default'
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
                'w-[280px] items-center justify-between rounded-none border-0 border-b-2 border-primary-default bg-transparent fill-primary-default py-6 text-base font-normal text-primary-default'
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
        <Separator className="mt-2 h-[2px] w-[52%] bg-secondary-default" />
      </div>
      <h4 className="text-base font-semibold text-shadow-3x">
        Selecione um tipo de lançamento
      </h4>
      <div className="flex justify-evenly gap-2">
        {chooseMovee.map(({ title, value }, number) => (
          <Button
            key={`button-${number}`}
            className={cn(
              'flex w-[280px] items-center justify-evenly rounded-xl border-2 border-primary-default bg-transparent p-6 text-base text-primary-default shadow-md shadow-slate-400 drop-shadow-md transition-transform duration-300 hover:border-primary-default hover:bg-primary-default hover:text-white ',
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
        <ButtonNext title="Prosseguir" loading={isLoading} func={handleFilterPage} />
      </div>
    </div>
  )
}

export default FilterPageExtract
