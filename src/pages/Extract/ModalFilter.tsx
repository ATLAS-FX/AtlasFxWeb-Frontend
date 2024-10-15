import { IconCalendar, IconDoubleArrow } from '@/components/icons'
import { ButtonNext, SelectFx } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useExtractInfo } from '@/services/ExtractApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { ExtractStateType } from '@/types/StatesType'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface ModalFilterProps {
  state: ExtractStateType
  setState: Dispatch<SetStateAction<ExtractStateType>>
}

const ModalFilter: React.FC<ModalFilterProps> = ({ state, setState }) => {
  const { mutate: getExtractInfo, isLoading } = useExtractInfo()

  const chooseMovee: Array<{ title: string; value: string }> = [
    { title: 'Entrada', value: 'in' },
    { title: 'Saída', value: 'out' }
  ]

  const periodDays = [
    { text: '7', value: '7' },
    { text: '15', value: '15' },
    { text: '30', value: '30' },
    { text: '60', value: '60' },
    { text: '90', value: '90' }
  ]

  const isDateValid = (dateString: Date) => {
    return !isNaN(new Date(dateString).getTime())
  }

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
        start:
          `${
            format(
              new Date(state.startDate).setDate(new Date().getDate() - 15),
              'dd-MM-yyyy',
              {
                locale: ptBR
              }
            ) +
            '' +
            state?.startHour
          }` || '',
        end:
          `${
            format(
              new Date(state?.endDate).setDate(new Date().getDate() - 15),
              'dd-MM-yyyy',
              {
                locale: ptBR
              }
            ) +
            '' +
            state?.endHour
          }` || '',
        type: state?.type || ''
      },
      {
        onSuccess: () => {
          setState((prev) => ({
            ...prev,
            stepPage: 0,
            filterModal: false
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

  return (
    <Dialog
      open={state.filterModal}
      onOpenChange={() => setState({ ...state, filterModal: false })}
    >
      {/* h-[536px] */}
      <DialogContent className={cn('h-fit w-[412px] gap-4 rounded-xl bg-white')}>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button
              className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
              variant="ghost"
              onClick={() =>
                setState({
                  ...state,
                  stepPage: state.stepPage >= 1 ? state.stepPage - 1 : 0
                })
              }
            >
              <ChevronLeft size={18} />
            </Button>
            <h4 className="text-base font-semibold text-primary-default">Filtrar</h4>
          </div>
          <div className="flex justify-between">
            {chooseMovee.map(({ title, value }, number) => (
              <Button
                key={`button-${number}`}
                className={cn(
                  'flex w-5/12 items-center justify-evenly rounded-md border-2 border-system-cinza/25 bg-transparent p-4 py-6 text-base text-primary-default transition-transform duration-300 hover:border-primary-default hover:bg-primary-default hover:text-white ',
                  state.type === value &&
                    'border-primary-default transition-transform duration-300'
                )}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    type: value
                  }))
                }
              >
                <IconDoubleArrow
                  size={14}
                  className={cn(
                    title === 'Entrada'
                      ? 'fill-[#008000]'
                      : 'scale-x-[-1] transform fill-[#FF0000]'
                  )}
                />
                {title}
              </Button>
            ))}
          </div>
          <SelectFx
            name={'select-period'}
            label={'Selecione um período'}
            bgLabel="bg-white"
            place={''}
            items={periodDays}
            value={state.period.toString()}
            setValue={(e) => {
              setState({ ...state, period: Number(e) })
              handleDateRangeChange(Number(e))
            }}
          />
          <div className="relative flex items-center justify-center gap-2 py-1">
            <h4 className="absolute left-[42%] right-[40%] w-12 bg-white text-center text-sm text-system-cinza">
              ou
            </h4>
            <Separator className="w-full bg-system-cinza/25" />
          </div>
          <div className="mb-2 flex justify-between">
            <div className="flex flex-col gap-4">
              <Popover key="start">
                <PopoverTrigger asChild disabled={true}>
                  <div className="relative flex">
                    <label
                      htmlFor={'start-date'}
                      className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
                    >
                      De:
                    </label>
                    <Button
                      variant={'outline'}
                      id="start-date"
                      className={cn(
                        'w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default px-4 py-6 text-sm hover:bg-transparent',
                        state.startDate
                          ? 'items-center justify-between gap-2'
                          : 'justify-end'
                      )}
                    >
                      {state.startDate ? `${state.startDate}` : ''}
                      <IconCalendar className="h-8 w-8" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    disabled={(date) =>
                      (isDateValid(date) && date > new Date()) ||
                      date > new Date(state.startDate)
                    }
                    selected={
                      state?.startDate.length >= 1
                        ? new Date(state.startDate)
                        : undefined
                    }
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
              <div className="relative flex">
                <label
                  htmlFor={'start-date'}
                  className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
                >
                  Hora inicio:
                </label>
                <input
                  className={cn(
                    'w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-3 text-sm hover:bg-transparent',
                    state.startHour
                      ? 'items-center justify-between gap-2'
                      : 'justify-end'
                  )}
                  type="time"
                  value={state.startHour}
                  onChange={(e) => setState({ ...state, startHour: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Popover key="end">
                <PopoverTrigger asChild disabled={true}>
                  <div className="relative flex">
                    <label
                      htmlFor={'start-date'}
                      className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
                    >
                      Até:
                    </label>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default px-4 py-6 text-sm hover:bg-transparent',
                        state.endDate
                          ? 'items-center justify-between gap-2'
                          : 'justify-end'
                      )}
                    >
                      {state.endDate ? `${state.endDate}` : ''}
                      <IconCalendar className="h-8 w-8" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" aria-disabled="true">
                  <Calendar
                    mode="single"
                    disabled={(date) =>
                      (isDateValid(date) && date > new Date()) ||
                      date < new Date(state.endDate)
                    }
                    selected={
                      state?.endDate.length >= 1
                        ? new Date(state.endDate)
                        : undefined
                    }
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
              <div className="relative flex">
                <label
                  htmlFor={'start-date'}
                  className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
                >
                  Hora final:
                </label>
                <input
                  className={cn(
                    'w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-3 text-sm hover:bg-transparent',
                    state.endHour
                      ? 'items-center justify-between gap-2'
                      : 'justify-end'
                  )}
                  type="time"
                  value={state.endHour}
                  onChange={(e) => setState({ ...state, endHour: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <ButtonNext
              title="Prosseguir"
              loading={isLoading}
              func={handleFilterPage}
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default ModalFilter
