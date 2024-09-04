import Robo from '@/assets/robo.png'
import { IconDoubleArrow } from '@/components/icons'
import CardHome from '@/components/layout/Card/CardHome'
import { ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { useAtlas } from '@/contexts/AtlasContext'
import { RegisterPixType } from '@/types/userType'
import { formattedDate } from '@/utils/FormattedDate'
import { formatedPrice } from '@/utils/FormattedPrice'
import Chart from './Chart'

const Home: React.FC = () => {
  const { user } = useAtlas()

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

  const calcTotalSendAmount = (
    releases: RegisterPixType[],
    number: number
  ): number => {
    return releases
      .filter((item: { send: number }) => item.send === number)
      .reduce(
        (acc: { amount: number }, item: { amount: number }) => ({
          amount: acc.amount + item.amount
        }),
        { amount: 0 }
      ).amount
  }

  const calcTotalProfitAmount = (releases: RegisterPixType[]): number => {
    return releases.reduce(
      (acc: { amount: number }, item: { amount: number }) => ({
        amount: acc.amount + item.amount
      }),
      { amount: 0 }
    ).amount
  }

  return (
    <div className="flex h-[calc(100vh-10%)] flex-col justify-between gap-4 text-xs">
      <div className="flex flex-col gap-2">
        <h4 className="pt-5 text-2xl text-colorPrimary-500">
          Olá, <span className="font-semibold">{user.name}</span>!
        </h4>
        <p className="text-base text-[#7F828C]">
          Gerencie e monitore as finanças da sua empresa aqui. Tudo em um lugar.
        </p>
      </div>
      <Separator className="my-3 w-full bg-[#7F828C33]" />
      <CardHome
        classes="bg-colorSecondary-500 z-10 mb-10"
        children={
          <div className="relative flex">
            <p className="w-5/12 text-3xl font-semibold text-colorPrimary-500 xl:text-2xl">
              {'O jeito fácil de gerenciar a sua empresa ;)'}
            </p>
            <img
              className="absolute right-10 z-0 size-48 object-contain"
              src={Robo}
              alt="Robo_svg"
            />
          </div>
        }
      />
      <CardHome
        title="Lucro mensal da sua empresa:"
        classes="border-[1px] border-[#7F828C33]"
        children={
          <>
            <p className="absolute right-4 top-4 font-semibold text-[#7F828C]">
              {formattedDate(new Date().toString())}
            </p>
            <h3 className="text-xl">
              R${' '}
              <strong>
                {formatedPrice(calcTotalProfitAmount(user.releases).toString())}
              </strong>
            </h3>
            <div className="flex items-center justify-center">
              <Chart
                classes="h-60 w-full p-2"
                data={user.releases}
                options={chartConfig}
                dataKeyAxis={'created'}
                dataKeyBarOne={'amount'}
                dataKeyBarTwo={'amount'}
                colorOne={'#C8D753'}
                colorTwo={'#405CA5'}
              />
            </div>
          </>
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
                  {formatedPrice(calcTotalSendAmount(user.releases, 1).toString())}
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
                  {formatedPrice(calcTotalSendAmount(user.releases, 0).toString())}
                </strong>
              </h3>
            </>
          }
        />
      </div>
    </div>
  )
}

export default Home
