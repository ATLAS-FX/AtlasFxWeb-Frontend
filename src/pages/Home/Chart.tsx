import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

interface ChartProps {
  classes?: string
  data: any[]
  options: ChartConfig
  dataKeyAxis: string
  dataKeyBarOne: string
  colorOne: string
  dataKeyBarTwo?: string
  colorTwo?: string
}

const Chart: React.FC<ChartProps> = ({
  classes,
  data,
  options,
  dataKeyAxis,
  dataKeyBarOne,
  colorOne,
  dataKeyBarTwo,
  colorTwo
}) => {
  return (
    <>
      <ChartContainer config={options} className={cn(classes)}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            stroke="red"
            dataKey={dataKeyAxis}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => new Date(value).getUTCDay().toString()}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey={dataKeyBarOne} fill={colorOne} radius={4} />
          {dataKeyBarTwo && (
            <Bar dataKey={dataKeyBarTwo} fill={colorTwo} radius={4} />
          )}
        </BarChart>
      </ChartContainer>
    </>
  )
}

export default Chart
