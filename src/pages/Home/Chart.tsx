'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 }
// ]

// const chartConfig = {
//   desktop: {
//     label: 'Desktop',
//     color: 'hsl(var(--chart-1))'
//   },
//   mobile: {
//     label: 'Mobile',
//     color: 'hsl(var(--chart-2))'
//   }
// } satisfies ChartConfig

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
