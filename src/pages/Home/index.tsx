import Robo from '@/assets/robo.png'
import { IconDoubleArrow } from '@/components/icons'
import { CardHome, Container } from '@/components/layout'
import { ChartConfig } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { useDashboard } from '@/services/DashApi'
import { DashBoardType } from '@/types/DashType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { format, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import Chart from './Chart'

const Home: React.FC = () => {
  const { user } = useAtlas()
  const { mutate: dashboard, isLoading: loadDash } = useDashboard()
  const [dash, setDash] = useState<DashBoardType | null>(null)
  const [date, _] = useState<{ start: Date; end: Date }>({
    end: new Date(),
    start: subDays(new Date(), 30)
  })

  const StyleBot = {
    backgroundImage: `url('${Robo}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '85% 24px',
    backgroundSize: '172px'
  }

  const chartConfig = {
    desktop: {
      label: 'amount',
      color: 'hsl(var(--chart-1))'
    },
    mobile: {
      label: 'amount',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig

  const handleDashboard = async () => {
    dashboard(
      {
        end: format(date.end, 'yyyy-MM-dd'),
        start: format(date.start, 'yyyy-MM-dd')
      },
      {
        onSuccess: (res: any) => {
          setDash(res)
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e?.message || '',
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  useEffect(() => {
    handleDashboard()
  }, [])

  return (
    <Container>
      <div className="flex flex-col gap-2">
        <h4 className="pt-5 text-xl text-primary-default">
          Olá, <span className="font-semibold">{user.name}</span>!
        </h4>
        <p className="text-sm text-[#7F828C]">
          Gerencie e monitore as finanças da sua empresa aqui. Tudo em um lugar.
        </p>
      </div>
      {loadDash ? (
        <>
          <div className="flex flex-col gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-48 max-w-[1330px] rounded-md" />
            ))}
          </div>
        </>
      ) : (
        <>
          <CardHome
            classes="bg-secondary-default"
            imgBG={StyleBot}
            children={
              <p className="h-32 w-6/12 text-2xl font-semibold text-primary-default xl:text-2xl">
                {'O jeito fácil de gerenciar a sua empresa ;)'}
              </p>
            }
          />
          <div className="flex items-center gap-4">
            <CardHome
              classes="bg-[#DDE2F0] w-6/12"
              children={
                <>
                  <h3 className="flex items-center gap-2 text-sm">
                    <IconDoubleArrow className="fill-[#008000]" size={12} />
                    Entradas
                  </h3>
                  <h3 className="text-xl">
                    R${' '}
                    <strong>
                      {formattedPrice(dash?.money_in?.toString() || '0')}
                    </strong>
                  </h3>
                </>
              }
            />
            <CardHome
              classes="bg-[#DDE2F0] w-6/12"
              children={
                <>
                  <h3 className="flex items-center gap-2 text-sm">
                    <IconDoubleArrow
                      className="scale-x-[-1] transform fill-[#EF4444]"
                      size={12}
                    />
                    Saídas
                  </h3>
                  <h3 className="text-xl">
                    R${' '}
                    <strong>
                      {formattedPrice(dash?.money_out?.toString() || '0')}
                    </strong>
                  </h3>
                </>
              }
            />
          </div>
          <CardHome
            title="Lucro mensal da sua empresa:"
            classes="border-[1px] border-[#7F828C33]"
            children={
              <>
                <p className="absolute right-4 top-8 text-xs font-semibold text-[#7F828C]">
                  {`${format(date.start, 'dd/MM/yyyy')} - ${format(date.end, 'dd/MM/yyyy')}`}
                </p>
                <h3 className="text-xl">
                  R${' '}
                  <strong>
                    {formattedPrice(dash?.money_in?.toString() || '0')}
                  </strong>
                </h3>
                {dash && dash?.dashboard.length >= 1 ? (
                  <div className="flex items-center justify-center">
                    <Chart
                      classes="h-56 w-full p-2"
                      data={dash.dashboard}
                      options={chartConfig}
                      dataKeyAxis={'date'}
                      dataKeyBarOne={'in'}
                      dataKeyBarTwo={'out'}
                      colorOne={'#C8D753'}
                      colorTwo={'#405CA5'}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4">
                    <h3 className="text-base italic text-system-cinza">
                      Sem dados para grafico
                    </h3>
                  </div>
                )}
              </>
            }
          />
        </>
      )}
    </Container>
  )
}

export default Home
