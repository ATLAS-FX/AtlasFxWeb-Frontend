import { IconCalendar, IconDoubleArrow, IconTrash } from '@/components/icons'
import { ButtonNext, SelectFx } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ExtractStateType } from '@/types/StatesType'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ChevronLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface ModalFilterProps {
  state: ExtractStateType
  setState: Dispatch<SetStateAction<ExtractStateType>>
  loading: boolean
  filter: () => void
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  state,
  setState,
  loading,
  filter
}) => {
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

  return (
    <Dialog
      open={state.filterModal}
      onOpenChange={() => setState({ ...state, filterModal: false })}
    >
      <DialogContent
        className={cn('h-fit w-[412px] gap-4 rounded-xl bg-white')}
        aria-describedby=""
      >
        <DialogHeader className="">
          <DialogTitle>{null}</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
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
              <h4 className="text-base font-semibold text-primary-default">
                Filtrar
              </h4>
            </div>
            <Button
              onClick={() => {
                setState({
                  ...state,
                  type: null,
                  startDate: new Date(
                    new Date().setDate(new Date().getDate() - 2)
                  ).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
                  endDate: new Date().toLocaleDateString('pt-BR', {
                    timeZone: 'America/Sao_Paulo'
                  }),
                  startHour: '00:00:00',
                  endHour: '23:59:59'
                })
              }}
              className="flex items-center gap-1 border-2 border-primary-default bg-transparent fill-primary-default p-0 px-2 text-primary-default shadow-none hover:bg-primary-default hover:fill-white hover:text-white"
            >
              Limpar filtros
              <IconTrash size={18} />
            </Button>
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
                    <button
                      id="start-date"
                      className={cn(
                        'flex w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-2 text-sm hover:bg-transparent',
                        state.startDate
                          ? 'items-center justify-between gap-2'
                          : 'justify-end'
                      )}
                    >
                      {state.startDate}
                      <IconCalendar className="h-8 w-8" />
                    </button>
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
                    <button
                      className={cn(
                        'flex w-36 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-2 text-sm hover:bg-transparent',
                        state.endDate
                          ? 'items-center justify-between gap-2'
                          : 'justify-end'
                      )}
                    >
                      {state.endDate}
                      <IconCalendar className="h-8 w-8" />
                    </button>
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
              loading={loading}
              func={() => {
                filter()
                setState({ ...state, filterModal: false })
              }}
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default ModalFilter
