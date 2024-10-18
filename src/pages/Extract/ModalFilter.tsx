import { IconDoubleArrow, IconTrash } from '@/components/icons'
import { ButtonNext, SelectFx } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ExtractStateType } from '@/types/StatesType'
import { formattedDateMachine } from '@/utils/GenerateFormatted'
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

  const handleDateRangeChange = (days: number) => {
    setState((prev) => ({
      ...prev,
      period: days,
      startDate: formattedDateMachine(
        new Date(new Date().setDate(new Date().getDate() - days)).toLocaleDateString(
          'pt-BR',
          {
            timeZone: 'America/Sao_Paulo',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        )
      ),
      endDate: formattedDateMachine(
        new Date().toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      )
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
                  ).toLocaleDateString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }),
                  endDate: new Date().toLocaleDateString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
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
          <div className="flex max-w-[372px] items-center gap-2">
            <div className="relative flex w-6/12">
              <label
                htmlFor="start-date"
                className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
              >
                Data inicio:
              </label>
              <input
                className={cn(
                  'w-11/12 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-3 text-sm hover:bg-transparent',
                  state.startDate
                    ? 'items-center justify-between gap-2'
                    : 'justify-end'
                )}
                type="datetime-local"
                id="start-date"
                value={state.startDate}
                onChange={(e) => setState({ ...state, startDate: e.target.value })}
              />
            </div>
            <div className="relative flex w-6/12">
              <label
                htmlFor="end-date"
                className="absolute -top-3 left-4 z-10 bg-white px-4 py-1 text-sm font-medium text-system-cinza/75"
              >
                Data Final:
              </label>
              <input
                className={cn(
                  'w-11/12 rounded-md border-2 border-system-cinza/25 bg-transparent fill-primary-default p-3 text-sm hover:bg-transparent',
                  state.endDate
                    ? 'items-center justify-between gap-2'
                    : 'justify-end'
                )}
                type="datetime-local"
                id="end-date"
                value={state.endDate}
                onChange={(e) => setState({ ...state, endDate: e.target.value })}
              />
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
