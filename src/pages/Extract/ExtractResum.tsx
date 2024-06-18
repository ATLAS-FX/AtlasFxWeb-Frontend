import { IconCalendar } from '@/components/icons/Calendar'
import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { DateFormat } from '@/utils/FormattedDate'
import { formatedPrice } from '@/utils/FormattedPrice'
import { Dispatch, SetStateAction } from 'react'

interface ExtractResumProps {
  setAction: Dispatch<
    SetStateAction<{
      stepPage: number
      period: number
      type: string
      start: string
      end: string
    }>
  >
  data: Record<string, App.RegisterPixProps[]>
}

const ExtractResum: React.FC<ExtractResumProps> = ({ setAction, data }) => {
  const ButtonsOptions = [
    {
      title: 'Exportar PDF',
      func: () => {}
    },
    {
      title: 'Filtrar por data',
      func: () =>
        setAction((prev) => ({
          ...prev,
          stepPage: 1
        }))
    }
  ]

  const sortedEntries = Object.entries(data).sort(
    ([dateA], [dateB]) => Date.parse(dateB) - Date.parse(dateA)
  )

  return (
    <>
      <div className="flex justify-end gap-8">
        {ButtonsOptions.map((buton, number) => (
          <button
            key={number}
            className="text-base font-semibold uppercase text-shadow-3x"
            onClick={buton.func}
          >
            {buton.title}
          </button>
        ))}
      </div>

      {sortedEntries.map(([date, extracts], index) => (
        <div className="flex flex-col items-center gap-2" key={index}>
          <div className="mb-2 flex w-full items-center gap-4 rounded-lg border-2 border-colorPrimary-500 fill-colorPrimary-500 px-6 py-3 text-lg font-medium text-colorPrimary-500 shadow-md shadow-slate-400 transition-transform duration-300">
            <IconCalendar className="w-8" />
            {new Date(date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: '2-digit'
            })}
          </div>
          {extracts.map((extract, i) => (
            <div
              className="flex w-11/12 items-center justify-between font-medium"
              key={i}
            >
              <div className="flex w-7/12 flex-col items-start justify-center gap-1">
                {extract.send > 0 ? (
                  <h2 className="flex items-center justify-between gap-1 font-semibold capitalize">
                    <IconDoubleArrow
                      size={12}
                      className="scale-x-[-1] transform fill-red-500"
                    />
                    {extract.method} Enviado
                  </h2>
                ) : (
                  <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
                    <IconDoubleArrow className="fill-colorSecondary-500" size={12} />
                    {extract.method} Recebido
                  </h2>
                )}
                <h4 className="flex items-center justify-start gap-1 font-semibold">
                  <IconDoubleArrow size={12} className="fill-transparent" />
                  {extract.name}
                </h4>
              </div>
              <div className="flex flex-col gap-1 text-end text-xs">
                <p>{DateFormat(extract.created)}</p>
                <label className="font-semibold">
                  R$ {extract.send > 0 ? '-' : ''}{' '}
                  {formatedPrice(extract.amount.toString())}
                </label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                  // onClick={() => setOpenModalPrint(!openModalPrint)}
                  >
                    <IconPDFDownload size={32} className="fill-colorPrimary-500" />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
                    Baixar extrato em PDF
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}

          <Separator className="bg-colorPrimary-500/85" />
        </div>
      ))}
    </>
  )
}

export default ExtractResum
